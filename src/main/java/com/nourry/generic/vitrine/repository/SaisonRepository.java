package com.nourry.generic.vitrine.repository;

import com.nourry.generic.vitrine.domain.Inscription;
import com.nourry.generic.vitrine.domain.Saison;
import com.nourry.generic.vitrine.domain.User;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link Saison} entity.
 */
@Repository
public interface SaisonRepository extends JpaRepository<Saison, Long> {
    Optional<Saison> findByAnnees(String anneeLibelle);
    Optional<Saison> findByActiveTrue();
}
