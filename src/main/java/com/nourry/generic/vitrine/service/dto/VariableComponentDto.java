package com.nourry.generic.vitrine.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VariableComponentDto {

    private Long id;
    private String code;
    private String valeur;
}
