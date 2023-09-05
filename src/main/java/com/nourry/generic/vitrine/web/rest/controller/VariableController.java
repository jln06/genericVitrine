package com.nourry.generic.vitrine.web.rest.controller;

import com.nourry.generic.vitrine.enums.VariableComponentEnum;
import com.nourry.generic.vitrine.service.IVariableService;
import com.nourry.generic.vitrine.service.dto.VariableComponentDto;
import javax.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/public")
public class VariableController {

    private IVariableService variableService;

    @GetMapping("/variable")
    public VariableComponentDto recupererVariable(@RequestParam(value = "codeVariable") VariableComponentEnum variableComponentEnum) {
        return variableService.getVariableComponentDto(variableComponentEnum);
    }

    @PostMapping("/variable")
    @ResponseStatus(HttpStatus.OK)
    public void majVariable(@RequestBody VariableComponentDto variableComponentDto, HttpServletRequest httpServletRequest) {
        log.debug(httpServletRequest.getRequestURL().toString());
        variableService.majVariable(variableComponentDto);
    }
}
