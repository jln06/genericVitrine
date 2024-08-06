package com.nourry.generic.vitrine.repository;

import com.nourry.generic.vitrine.domain.Saison;
import com.nourry.generic.vitrine.domain.SituationFamiliale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link Saison} entity.
 */
@Repository
public interface SituationFamilialeRepository extends JpaRepository<SituationFamiliale, String> {}
