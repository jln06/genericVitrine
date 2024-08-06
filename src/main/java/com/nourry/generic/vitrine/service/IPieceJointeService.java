package com.nourry.generic.vitrine.service;

import com.nourry.generic.vitrine.domain.Inscription;
import com.nourry.generic.vitrine.domain.PieceJointe;
import com.nourry.generic.vitrine.enums.PieceJointeTypeEnum;
import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;

public interface IPieceJointeService {
    void savePiecesJointes(Inscription inscription, MultipartFile assurance, MultipartFile certificatMedical);

    PieceJointe getPieceJointeById(Long idPieceJointe);

    Optional<Long> findByTypeAndInscriptionId(PieceJointeTypeEnum pieceJointeTypeEnum, Long idInscription);
}
