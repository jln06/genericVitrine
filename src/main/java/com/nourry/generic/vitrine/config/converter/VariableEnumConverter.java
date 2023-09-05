package com.nourry.generic.vitrine.config.converter;

import com.nourry.generic.vitrine.enums.VariableComponentEnum;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class VariableEnumConverter implements Converter<String, VariableComponentEnum> {

    @Override
    public VariableComponentEnum convert(String value) {
        return VariableComponentEnum.valueOf(value.toUpperCase());
    }
}
