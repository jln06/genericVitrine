package com.nourry.generic.vitrine.web.rest.controller;

import com.nourry.generic.vitrine.service.IReferentielService;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/public")
public class ReferentielController {

    private IReferentielService referentielService;

    @GetMapping("/situation-familiale")
    public List<Pair<String, String>> recupererSituationsFamiliale() {
        return referentielService.getSituationsFamiliale();
    }
}
