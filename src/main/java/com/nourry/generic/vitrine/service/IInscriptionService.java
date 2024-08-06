package com.nourry.generic.vitrine.service;

import com.nourry.generic.vitrine.service.dto.InscriptionDto;
import com.nourry.generic.vitrine.service.dto.SaisonDto;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface IInscriptionService {
    void inscrire(InscriptionDto inscriptionDto, MultipartFile assurance, MultipartFile certificatMedical);

    List<InscriptionDto> recupererInscriptions(String saison);

    List<SaisonDto> recupererSaisons();

    void payerInscription(Long idInscription);

    byte[] creerExcelSaison(String saison);
}
