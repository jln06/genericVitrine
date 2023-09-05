package com.nourry.generic.vitrine.service.dto;

import com.nourry.generic.vitrine.domain.ImageCategorie;
import com.nourry.generic.vitrine.enums.ImageCategorieEnum;
import java.nio.file.Path;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ImageInfoDto {

    private Long id;
    private ImageCategorie imageCategorie;
    private String description;
    private String prix;
    private MultipartFile file;
    private String nomImage;
    private Path targetLocation;
}
