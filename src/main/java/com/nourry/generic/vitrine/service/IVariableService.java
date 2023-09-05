package com.nourry.generic.vitrine.service;

import com.nourry.generic.vitrine.enums.VariableComponentEnum;
import com.nourry.generic.vitrine.service.dto.VariableComponentDto;

public interface IVariableService {
    VariableComponentDto getVariableComponentDto(VariableComponentEnum variableComponentEnum);

    void majVariable(VariableComponentDto variableComponentDto);
}
