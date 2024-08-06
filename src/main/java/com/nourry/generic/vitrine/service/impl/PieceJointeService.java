package com.nourry.generic.vitrine.service.impl;

import static com.nourry.generic.vitrine.enums.PieceJointeTypeEnum.ASSURANCE;
import static com.nourry.generic.vitrine.enums.PieceJointeTypeEnum.CERTIFICAT_MEDICAL;

import com.nourry.generic.vitrine.domain.Blob;
import com.nourry.generic.vitrine.domain.Inscription;
import com.nourry.generic.vitrine.domain.PieceJointe;
import com.nourry.generic.vitrine.enums.PieceJointeTypeEnum;
import com.nourry.generic.vitrine.repository.BlobRepository;
import com.nourry.generic.vitrine.repository.PieceJointeRepository;
import com.nourry.generic.vitrine.repository.TypePieceJointeRepository;
import com.nourry.generic.vitrine.service.IPieceJointeService;
import com.nourry.generic.vitrine.utils.PdfUtils;
import java.io.IOException;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
public class PieceJointeService implements IPieceJointeService {

    @Autowired
    private BlobRepository blobRepository;

    @Autowired
    private PieceJointeRepository pieceJointeRepository;

    @Autowired
    private TypePieceJointeRepository typePieceJointeRepository;

    @Override
    public void savePiecesJointes(Inscription inscription, MultipartFile assurance, MultipartFile certificatMedical) {
        log.debug("Sauvegarde des pièces jointes");
        createAndSavePiecesJointes(ASSURANCE, inscription, assurance);
        createAndSavePiecesJointes(CERTIFICAT_MEDICAL, inscription, certificatMedical);
    }

    @Override
    public PieceJointe getPieceJointeById(Long idPieceJointe) {
        return pieceJointeRepository.findById(idPieceJointe).orElseThrow(() -> new RuntimeException("Piece jointe non trouvée"));
    }

    @Override
    public Optional<Long> findByTypeAndInscriptionId(PieceJointeTypeEnum pieceJointeTypeEnum, Long idInscription) {
        return pieceJointeRepository.findByTypeAndInscriptionId(pieceJointeTypeEnum, idInscription);
    }

    private void createAndSavePiecesJointes(PieceJointeTypeEnum pieceJointeTypeEnum, Inscription inscription, MultipartFile file) {
        PieceJointe pieceJointe = createPieceJointe(pieceJointeTypeEnum, inscription, file);
        pieceJointeRepository.save(pieceJointe);
    }

    private PieceJointe createPieceJointe(PieceJointeTypeEnum pieceJointeTypeEnum, Inscription inscription, MultipartFile file) {
        PieceJointe pieceJointe = new PieceJointe();
        typePieceJointeRepository.findById(pieceJointeTypeEnum).ifPresent(pieceJointe::setTypePieceJointe);
        pieceJointe.setNom(file.getName().concat("-").concat(inscription.getNom()).concat("-").concat(inscription.getPrenom()));
        pieceJointe.setFormat(file.getContentType());
        pieceJointe.setTaille(String.valueOf(file.getSize()));
        pieceJointe.setFichier(createBlob(file));
        pieceJointe.setInscription(inscription);
        return pieceJointe;
    }

    private Blob createBlob(MultipartFile file) {
        Blob blob = new Blob();
        try {
            blob.setImage(file.getBytes());
        } catch (IOException e) {
            log.debug("Erreur lors de la recuperation du fichier {}, ", file.getName());
            throw new RuntimeException(e);
        }
        return blobRepository.save(blob);
    }
}
