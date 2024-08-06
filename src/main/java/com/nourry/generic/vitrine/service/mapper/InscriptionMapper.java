package com.nourry.generic.vitrine.service.mapper;

import com.nourry.generic.vitrine.domain.Inscription;
import com.nourry.generic.vitrine.domain.Parent;
import com.nourry.generic.vitrine.repository.SituationFamilialeRepository;
import com.nourry.generic.vitrine.service.dto.InscriptionDto;
import com.nourry.generic.vitrine.service.dto.ParentDto;
import java.util.*;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

/**
 * Mapper for the entity {@link com.nourry.generic.vitrine.domain.Inscription} and its DTO called {@link com.nourry.generic.vitrine.service.dto.InscriptionDto}.
 * <p>
 * Normal mappers are generated using MapStruct, this one is hand-coded as MapStruct
 * support is still in beta, and requires a manual step with an IDE.
 */
@Service
@RequiredArgsConstructor
public class InscriptionMapper {

    private final SituationFamilialeRepository situationFamilialeRepository;

    public List<InscriptionDto> usersToInscriptionDtos(List<Inscription> Inscriptions) {
        return Inscriptions.stream().filter(Objects::nonNull).map(this::userToInscriptionDto).collect(Collectors.toList());
    }

    public InscriptionDto userToInscriptionDto(Inscription Inscription) {
        return new InscriptionDto(Inscription);
    }

    public Inscription InscriptionDtoToUser(InscriptionDto inscriptionDto) {
        if (inscriptionDto == null) {
            return null;
        } else {
            Inscription inscription = new Inscription();
            inscription.setId(inscriptionDto.getId());
            inscription.setNom(StringUtils.upperCase(inscriptionDto.getNom()));
            inscription.setPrenom(StringUtils.upperCase(inscriptionDto.getPrenom()));
            inscription.setAdresse(StringUtils.upperCase(inscriptionDto.getAdresse()));
            inscription.setCodePostal(inscriptionDto.getCodePostal());
            inscription.setVille(StringUtils.upperCase(inscriptionDto.getVille()));
            inscription.setEmail(StringUtils.lowerCase(inscriptionDto.getEmail()));
            inscription.setDateNaissance(inscriptionDto.getDateNaissance());
            inscription.setTelephone(inscriptionDto.getTelephone());
            inscription.setPaye(BooleanUtils.isTrue(inscriptionDto.getPaye()));
            inscription.setMineur(BooleanUtils.isTrue(inscriptionDto.getMineur()));
            inscription.setNumeroUrgence(inscriptionDto.getNumeroUrgence());
            inscription.setPortLunette(BooleanUtils.isTrue(inscriptionDto.getPortLunette()));
            inscription.setAllergie(BooleanUtils.isTrue(inscriptionDto.getAllergie()));
            inscription.setContactUrgence(BooleanUtils.isTrue(inscriptionDto.getContactUrgence()));
            inscription.setSanteAutre(inscriptionDto.getSanteAutre());
            inscription.setTypeAllergie(inscriptionDto.getAllergieType());
            return inscription;
        }
    }

    public Parent toParent(ParentDto parentDto) {
        if (parentDto == null) {
            return null;
        }
        Parent parent = new Parent();
        parent.setNom(StringUtils.upperCase(parentDto.getNom()));
        parent.setPrenom(StringUtils.upperCase(parentDto.getPrenom()));
        parent.setAdresse(StringUtils.upperCase(parentDto.getAdresse()));
        parent.setCodePostal(parentDto.getCodePostal());
        parent.setVille(StringUtils.upperCase(parentDto.getVille()));
        parent.setEmail(StringUtils.lowerCase(parentDto.getEmail()));
        parent.setTelephone(parentDto.getTelephone());
        Optional
            .ofNullable(parentDto.getSituationFamiliale())
            .flatMap(situationFamilialeRepository::findById)
            .ifPresent(parent::setSituationFamiliale);
        return parent;
    }

    public static ParentDto toParentDto(Parent parent) {
        if (parent == null) {
            return null;
        }
        ParentDto parentDto = new ParentDto();
        parentDto.setNom(parent.getNom());
        parentDto.setPrenom(parent.getPrenom());
        parentDto.setAdresse(parent.getAdresse());
        parentDto.setCodePostal(parent.getCodePostal());
        parentDto.setVille(parent.getVille());
        parentDto.setEmail(parent.getEmail());
        parentDto.setTelephone(parent.getTelephone());
        parentDto.setSituationFamiliale(parent.getSituationFamiliale().getCode());
        return parentDto;
    }
}
