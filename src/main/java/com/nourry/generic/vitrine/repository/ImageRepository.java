package com.nourry.generic.vitrine.repository;

import com.nourry.generic.vitrine.domain.Image;
import com.nourry.generic.vitrine.domain.Saison;
import com.nourry.generic.vitrine.domain.VariableComponent;
import com.nourry.generic.vitrine.enums.ImageCategorieEnum;
import com.nourry.generic.vitrine.enums.VariableComponentEnum;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link Image} entity.
 */
@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByImageCategorieCodeOrderByCreatedDateAsc(ImageCategorieEnum imageCategorieEnum);
    List<Image> findFirstByImageCategorieCodeOrderByCreatedDateDesc(ImageCategorieEnum imageCategorieEnum);
}
