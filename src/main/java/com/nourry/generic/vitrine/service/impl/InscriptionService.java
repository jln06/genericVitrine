package com.nourry.generic.vitrine.service.impl;

import com.nourry.generic.vitrine.Utils;
import com.nourry.generic.vitrine.domain.Inscription;
import com.nourry.generic.vitrine.domain.Saison;
import com.nourry.generic.vitrine.repository.InscriptionRespository;
import com.nourry.generic.vitrine.repository.SaisonRepository;
import com.nourry.generic.vitrine.service.IInscriptionService;
import com.nourry.generic.vitrine.service.dto.InscriptionDto;
import com.nourry.generic.vitrine.service.dto.SaisonDto;
import com.nourry.generic.vitrine.service.mapper.InscriptionMapper;
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
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
public class InscriptionService implements IInscriptionService {

    @Autowired
    private InscriptionMapper inscriptionMapper;

    @Autowired
    private InscriptionRespository inscriptionRespository;

    @Autowired
    private SaisonRepository saisonRepository;

    @Override
    @Transactional
    public void inscrire(InscriptionDto inscriptionDto) {
        Optional
            .of(inscriptionMapper.InscriptionDtoToUser(inscriptionDto))
            .ifPresent(inscr -> {
                inscr.setSaison(getOrInstanciateSaison());
                inscr.setCreatedBy("systeme");
                inscriptionRespository.save(inscr);
            });
    }

    @Override
    @Transactional(readOnly = true)
    public List<InscriptionDto> recupererInscriptions(String saison) {
        List<Inscription> inscriptions = inscriptionRespository.findBySaisonAnnees(saison);
        return inscriptionMapper.usersToInscriptionDtos(inscriptions);
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
                row.createCell(2).setCellValue(inscription.getEmail());
                row.createCell(3).setCellValue(inscription.getTelephone());
                row.createCell(4).setCellValue(Utils.localDateToString(inscription.getDateNaissance()));
                row.createCell(5).setCellValue(Utils.localDateTimeToString(inscription.getDateCreation()));
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
        rowHeader.createCell(2).setCellValue("email");
        rowHeader.createCell(3).setCellValue("Téléphone");
        rowHeader.createCell(4).setCellValue("Date de naissance");
        rowHeader.createCell(5).setCellValue("Date création");
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
                return saisonRepository.save(saison);
            });
    }

    private void desactiverCurrentSaison() {
        saisonRepository
            .findByActiveTrue()
            .ifPresent(saison -> {
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
