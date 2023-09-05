package com.nourry.generic.vitrine.service.mapper;

import com.nourry.generic.vitrine.domain.Authority;
import com.nourry.generic.vitrine.domain.Inscription;
import com.nourry.generic.vitrine.service.dto.AdminUserDTO;
import com.nourry.generic.vitrine.service.dto.InscriptionDto;
import com.nourry.generic.vitrine.service.dto.UserDTO;
import java.util.*;
import java.util.stream.Collectors;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.stereotype.Service;

/**
 * Mapper for the entity {@link com.nourry.generic.vitrine.domain.Inscription} and its DTO called {@link com.nourry.generic.vitrine.service.dto.InscriptionDto}.
 * <p>
 * Normal mappers are generated using MapStruct, this one is hand-coded as MapStruct
 * support is still in beta, and requires a manual step with an IDE.
 */
@Service
public class InscriptionMapper {

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
            inscription.setPrenom(inscriptionDto.getPrenom());
            inscription.setEmail(inscriptionDto.getEmail());
            inscription.setDateNaissance(inscriptionDto.getDateNaissance());
            inscription.setTelephone(inscriptionDto.getTelephone());
            inscription.setPaye(BooleanUtils.isTrue(inscriptionDto.getPaye()));
            return inscription;
        }
    }
}
