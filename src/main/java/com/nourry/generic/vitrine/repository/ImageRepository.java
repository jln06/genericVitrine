package com.nourry.generic.vitrine.repository;

import com.nourry.generic.vitrine.domain.Image;
import com.nourry.generic.vitrine.enums.ImageCategorieEnum;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the {@link Image} entity.
 */
@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByImageCategorieCodeOrderByCreatedDateDesc(ImageCategorieEnum imageCategorieEnum);
    List<Image> findFirstByImageCategorieCodeOrderByCreatedDateDesc(ImageCategorieEnum imageCategorieEnum);
}
