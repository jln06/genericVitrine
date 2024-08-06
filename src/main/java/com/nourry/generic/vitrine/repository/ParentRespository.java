package com.nourry.generic.vitrine.repository;

import com.nourry.generic.vitrine.domain.Inscription;
import com.nourry.generic.vitrine.domain.Parent;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Spring Data JPA repository for the {@link Inscription} entity.
 */
@Repository
public interface ParentRespository extends JpaRepository<Parent, Long> {
    List<Parent> findByInscriptionId(@PathVariable Long idInscription);
}
