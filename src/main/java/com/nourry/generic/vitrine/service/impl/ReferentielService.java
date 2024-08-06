package com.nourry.generic.vitrine.service.impl;

import com.nourry.generic.vitrine.repository.SituationFamilialeRepository;
import com.nourry.generic.vitrine.service.IReferentielService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for managing users.
 */
@Service
@AllArgsConstructor
@Transactional
@Slf4j
public class ReferentielService implements IReferentielService {

    private final SituationFamilialeRepository situationFamilialeRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Pair<String, String>> getSituationsFamiliale() {
        return situationFamilialeRepository
            .findAll()
            .stream()
            .map(situationFamiliale1 -> Pair.of(situationFamiliale1.getCode(), situationFamiliale1.getLibelle()))
            .collect(Collectors.toList());
    }
}
