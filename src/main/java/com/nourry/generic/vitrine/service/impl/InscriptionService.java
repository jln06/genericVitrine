package com.nourry.generic.vitrine.service.impl;

import com.nourry.generic.vitrine.domain.Inscription;
import com.nourry.generic.vitrine.domain.Parent;
import com.nourry.generic.vitrine.domain.Saison;
import com.nourry.generic.vitrine.enums.PieceJointeTypeEnum;
import com.nourry.generic.vitrine.repository.InscriptionRespository;
import com.nourry.generic.vitrine.repository.ParentRespository;
import com.nourry.generic.vitrine.repository.SaisonRepository;
import com.nourry.generic.vitrine.service.IInscriptionService;
import com.nourry.generic.vitrine.service.IMailService;
import com.nourry.generic.vitrine.service.IPieceJointeService;
import com.nourry.generic.vitrine.service.dto.ContactDto;
import com.nourry.generic.vitrine.service.dto.InscriptionDto;
import com.nourry.generic.vitrine.service.dto.ParentDto;
import com.nourry.generic.vitrine.service.dto.SaisonDto;
import com.nourry.generic.vitrine.service.mapper.InscriptionMapper;
import com.nourry.generic.vitrine.utils.Utils;
import com.nourry.generic.vitrine.web.rest.errors.InscriptionEmptyException;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
public class InscriptionService implements IInscriptionService {

    @Autowired
    private InscriptionMapper inscriptionMapper;

    @Autowired
    private InscriptionRespository inscriptionRespository;

    @Autowired
    private ParentRespository parentRespository;

    @Autowired
    private SaisonRepository saisonRepository;

    @Autowired
    private IPieceJointeService pieceJointeService;

    @Autowired
    private IMailService mailService;

    @Override
    @Transactional
    public void inscrire(InscriptionDto inscriptionDto, MultipartFile assurance, MultipartFile certificatMedical) {
        Optional
            .of(inscriptionMapper.InscriptionDtoToUser(inscriptionDto))
            .ifPresent(inscr -> {
                inscr.setSaison(getOrInstanciateSaison());
                inscr.setCreatedBy("systeme");
                log.debug("Inscription de {} {}", inscr.getNom(), inscr.getPrenom());
                Inscription inscription = inscriptionRespository.save(inscr);
                saveParent(inscriptionDto.getParent1(), inscription);
                saveParent(inscriptionDto.getParent2(), inscription);
                this.pieceJointeService.savePiecesJointes(inscription, assurance, certificatMedical);
                sendMailInscription(inscriptionDto);
                sendMailInscriptionAlert(inscriptionDto);
            });
    }

    private void saveParent(ParentDto parentDto, Inscription inscription) {
        log.debug("Sauvegarde des parents");
        Optional
            .ofNullable(parentDto)
            .map(parentDTO -> {
                Parent parent = inscriptionMapper.toParent(parentDTO);
                parent.setInscription(inscription);
                return parent;
            })
            .ifPresent(parentRespository::save);
    }

    private void sendMailInscription(InscriptionDto inscriptionDto) {
        ContactDto contactDto = new ContactDto();
        contactDto.setNom(inscriptionDto.getNom());
        contactDto.setPrenom(inscriptionDto.getPrenom());
        Optional
            .ofNullable(inscriptionDto.getEmail())
            .filter(StringUtils::isNotEmpty)
            .ifPresentOrElse(
                contactDto::setTo,
                () -> Optional.ofNullable(inscriptionDto.getParent1()).map(ParentDto::getEmail).ifPresent(contactDto::setTo)
            );
        mailService.sendInscriptionMail(contactDto);
    }

    private void sendMailInscriptionAlert(InscriptionDto inscriptionDto) {
        ContactDto contactDto = new ContactDto();
        contactDto.setNom(inscriptionDto.getNom());
        contactDto.setPrenom(inscriptionDto.getPrenom());
        mailService.sendInscriptionAlertMail(contactDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InscriptionDto> recupererInscriptions(String saison) {
        List<Inscription> inscriptions = inscriptionRespository.findBySaisonAnneesOrderByCreatedDateDesc(saison);
        List<InscriptionDto> inscriptionDtos = inscriptionMapper.usersToInscriptionDtos(inscriptions);
        inscriptionDtos.forEach(inscription -> {
            addParentIfExists(inscription);
            addPiecesJointes(inscription);
        });
        return inscriptionDtos;
    }

    private void addParentIfExists(InscriptionDto inscriptionDto) {
        parentRespository
            .findByInscriptionId(inscriptionDto.getId())
            .stream()
            .map(InscriptionMapper::toParentDto)
            .limit(2)
            .forEach(parentDto -> {
                if (inscriptionDto.getParent1() == null) {
                    inscriptionDto.setParent1(parentDto);
                } else if (inscriptionDto.getParent2() == null) {
                    inscriptionDto.setParent2(parentDto);
                }
            });
    }

    private void addPiecesJointes(InscriptionDto inscription) {
        Long idInscription = inscription.getId();
        pieceJointeService
            .findByTypeAndInscriptionId(PieceJointeTypeEnum.CERTIFICAT_MEDICAL, idInscription)
            .ifPresent(inscription::setIdCertificatMedical);
        pieceJointeService.findByTypeAndInscriptionId(PieceJointeTypeEnum.ASSURANCE, idInscription).ifPresent(inscription::setIdAssurance);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SaisonDto> recupererSaisons() {
        return saisonRepository
            .findAll()
            .stream()
            .map(saison -> {
                SaisonDto saisonDto = new SaisonDto();
                saisonDto.setAnnees(saison.getAnnees());
                saisonDto.setActive(BooleanUtils.isTrue(saison.getActive()));
                return saisonDto;
            })
            .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void payerInscription(Long idInscription) {
        inscriptionRespository
            .findById(idInscription)
            .ifPresentOrElse(
                inscription -> {
                    boolean newStatutPaye = !BooleanUtils.toBoolean(inscription.getPaye());
                    log.debug("Statut payé de la demande {} passe à {}", idInscription, newStatutPaye);
                    inscription.setPaye(newStatutPaye);
                    inscriptionRespository.save(inscription);
                },
                () -> {
                    log.debug("Erreur lors du paiment de l'inscription {}", idInscription);
                    throw new RuntimeException();
                }
            );
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] creerExcelSaison(String saison) {
        List<InscriptionDto> inscriptionDtos = this.recupererInscriptions(saison);
        if (inscriptionDtos.isEmpty()) {
            throw new InscriptionEmptyException(saison);
        }
        try (Workbook workbook = new HSSFWorkbook(); ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Inscriptions - " + saison);
            Row rowHeader = initHeaderExportXls(sheet);
            boldRow(rowHeader, workbook);
            int rowNum = 1;
            for (InscriptionDto inscription : inscriptionDtos) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(inscription.getNom());
                row.createCell(1).setCellValue(inscription.getPrenom());
                row.createCell(2).setCellValue(inscription.getAdresse());
                row.createCell(3).setCellValue(inscription.getCodePostal());
                row.createCell(4).setCellValue(inscription.getVille());
                row.createCell(5).setCellValue(inscription.getEmail());
                row.createCell(6).setCellValue(inscription.getTelephone());
                row.createCell(7).setCellValue(Utils.localDateToString(inscription.getDateNaissance()));
                row.createCell(8).setCellValue(inscription.getNumeroUrgence());
                if (inscription.getParent1() != null) {
                    row.createCell(9).setCellValue(inscription.getParent1().getEmail());
                    row.createCell(10).setCellValue(inscription.getParent1().getTelephone());
                }
                if (inscription.getParent2() != null) {
                    row.createCell(11).setCellValue(inscription.getParent2().getEmail());
                    row.createCell(12).setCellValue(inscription.getParent2().getTelephone());
                }
                row.createCell(13).setCellValue(Utils.localDateTimeToString(inscription.getDateCreation()));
            }
            IntStream.range(0, rowHeader.getPhysicalNumberOfCells()).forEach(sheet::autoSizeColumn);
            workbook.write(outputStream);
            return outputStream.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de la génération export des inscriptions");
        }
    }

    private void boldRow(Row row, Workbook workbook) {
        Font boldFont = workbook.createFont();
        boldFont.setBold(true);
        CellStyle boldStyle = workbook.createCellStyle();
        boldStyle.setFont(boldFont);
        row.cellIterator().forEachRemaining(cell -> cell.setCellStyle(boldStyle));
    }

    private Row initHeaderExportXls(Sheet sheet) {
        Row rowHeader = sheet.createRow(0);
        rowHeader.createCell(0).setCellValue("nom");
        rowHeader.createCell(1).setCellValue("prénom");
        rowHeader.createCell(2).setCellValue("adresse");
        rowHeader.createCell(3).setCellValue("code postal");
        rowHeader.createCell(4).setCellValue("ville");
        rowHeader.createCell(5).setCellValue("email");
        rowHeader.createCell(6).setCellValue("Téléphone");
        rowHeader.createCell(7).setCellValue("Date de naissance");
        rowHeader.createCell(8).setCellValue("Numero contact urgence");
        rowHeader.createCell(9).setCellValue("Email Parent 1");
        rowHeader.createCell(10).setCellValue("Téléphone Parent 1");
        rowHeader.createCell(11).setCellValue("Email Parent 2");
        rowHeader.createCell(12).setCellValue("Téléphone Parent 2");
        rowHeader.createCell(13).setCellValue("Date création");
        return rowHeader;
    }

    private Saison getOrInstanciateSaison() {
        String saisonLibelle = getSaisonLibelle();
        return saisonRepository
            .findByAnnees(saisonLibelle)
            .orElseGet(() -> {
                desactiverCurrentSaison();
                Saison saison = new Saison();
                saison.setAnnees(saisonLibelle);
                saison.setActive(true);
                log.debug("Création saison {}", saison.getAnnees());
                return saisonRepository.save(saison);
            });
    }

    private void desactiverCurrentSaison() {
        saisonRepository
            .findByActiveTrue()
            .ifPresent(saison -> {
                log.debug("Désactivation saison {}", saison.getAnnees());
                saison.setActive(false);
                saisonRepository.save(saison);
            });
    }

    /**
     * determine le libellé
     * de la saison en cours
     *
     * @return libelle saison
     */
    private String getSaisonLibelle() {
        LocalDate now = LocalDate.now();
        return Optional
            .of(now)
            .filter(dateNow -> dateNow.getMonthValue() > 6)
            .map(dateNow -> dateNow.getYear() + "-" + (dateNow.getYear() + 1))
            .orElseGet(() -> (now.getYear() - 1) + "-" + now.getYear());
    }
}
