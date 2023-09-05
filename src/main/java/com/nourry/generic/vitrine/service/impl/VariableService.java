package com.nourry.generic.vitrine.service.impl;

import com.nourry.generic.vitrine.domain.VariableComponent;
import com.nourry.generic.vitrine.enums.VariableComponentEnum;
import com.nourry.generic.vitrine.repository.VariableRepository;
import com.nourry.generic.vitrine.service.IVariableService;
import com.nourry.generic.vitrine.service.dto.VariableComponentDto;
import com.nourry.generic.vitrine.service.exception.NoVariableComponentException;
import com.nourry.generic.vitrine.service.mapper.VariableComponentMapper;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for managing users.
 */
@Service
@AllArgsConstructor
@Transactional
public class VariableService implements IVariableService {

    private final Logger log = LoggerFactory.getLogger(VariableService.class);

    private VariableRepository variableRepository;
    private VariableComponentMapper variableComponentMapper;

    /**
     * permet de recuperer les valeurs
     * qui seront affichées dans la vue
     *
     * @param variableComponentEnum
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public VariableComponentDto getVariableComponentDto(VariableComponentEnum variableComponentEnum) {
        return variableRepository
            .findByCode(variableComponentEnum)
            .map(variableComponent -> variableComponentMapper.toDto(variableComponent))
            .orElseThrow(NoVariableComponentException::new);
    }

    /**
     * mise à jour des variables
     *
     * @param variableComponentDto
     */
    @Override
    @Transactional
    public void majVariable(VariableComponentDto variableComponentDto) {
        log.debug("upload de : {} avec valeur : {}", variableComponentDto.getCode(), variableComponentDto.getValeur());
        VariableComponentEnum variableComponentEnum = VariableComponentEnum.valueOf(variableComponentDto.getCode());
        VariableComponent variable = variableRepository
            .findByCode(variableComponentEnum)
            .orElseGet(() -> new VariableComponent(variableComponentEnum));
        variable.setValeur(variableComponentDto.getValeur());
        variableRepository.save(variable);
    }
}
