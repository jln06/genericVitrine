package com.nourry.generic.vitrine.service.mapper;

import com.nourry.generic.vitrine.domain.Inscription;
import com.nourry.generic.vitrine.domain.VariableComponent;
import com.nourry.generic.vitrine.service.dto.InscriptionDto;
import com.nourry.generic.vitrine.service.dto.VariableComponentDto;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.apache.commons.lang3.BooleanUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Service;

/**
 * Mapper for the entity {@link com.nourry.generic.vitrine.domain.VariableComponent} and its DTO called {@link VariableComponentDto}.
 * <p>
 * Normal mappers are generated using MapStruct, this one is hand-coded as MapStruct
 * support is still in beta, and requires a manual step with an IDE.
 */
@Mapper(componentModel = "spring")
public interface VariableComponentMapper {
    VariableComponentDto toDto(VariableComponent variableComponent);

    VariableComponent toEntity(VariableComponentDto variableComponentDto);
}
