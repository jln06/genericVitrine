package com.nourry.generic.vitrine.service;

import java.util.List;
import org.springframework.data.util.Pair;
import org.springframework.transaction.annotation.Transactional;

public interface IReferentielService {
    @Transactional(readOnly = true)
    List<Pair<String, String>> getSituationsFamiliale();
}
