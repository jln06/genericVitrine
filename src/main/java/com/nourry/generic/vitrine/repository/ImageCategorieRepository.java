package com.nourry.generic.vitrine.repository;

import com.nourry.generic.vitrine.domain.Image;
import com.nourry.generic.vitrine.domain.ImageCategorie;
import com.nourry.generic.vitrine.enums.ImageCategorieEnum;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link Image} entity.
 */
@Repository
public interface ImageCategorieRepository extends JpaRepository<ImageCategorie, Long> {
    Optional<ImageCategorie> findByCode(ImageCategorieEnum imageCategorieEnum);
}
