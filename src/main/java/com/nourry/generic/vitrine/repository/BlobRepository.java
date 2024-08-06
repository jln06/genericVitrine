package com.nourry.generic.vitrine.repository;

import com.nourry.generic.vitrine.domain.Blob;
import com.nourry.generic.vitrine.domain.Saison;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link Saison} entity.
 */
@Repository
public interface BlobRepository extends JpaRepository<Blob, Long> {}
