package com.nourry.generic.vitrine.repository;

import com.nourry.generic.vitrine.domain.Inscription;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link Inscription} entity.
 */
@Repository
public interface InscriptionRespository extends JpaRepository<Inscription, Long> {
    List<Inscription> findBySaisonAnneesOrderByCreatedDateDesc(String anneeLibelle);
}
