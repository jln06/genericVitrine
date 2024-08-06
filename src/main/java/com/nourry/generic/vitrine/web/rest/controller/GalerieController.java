package com.nourry.generic.vitrine.web.rest.controller;

import com.nourry.generic.vitrine.enums.ImageCategorieEnum;
import com.nourry.generic.vitrine.service.dto.FileDto;
import com.nourry.generic.vitrine.service.impl.FileService;
import java.io.IOException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api/public")
public class GalerieController {

    private final Logger logger = LoggerFactory.getLogger(GalerieController.class);

    @Autowired
    private FileService fileStorageService;

    @GetMapping("/galerie/downloadFile/{directory}/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(
        @PathVariable String fileName,
        @PathVariable String directory,
        HttpServletRequest request
    ) {
        Resource resource = fileStorageService.loadFileAsResource(directory, fileName);
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }
        if (contentType == null) {
            contentType = "application/octet-stream";
        }
        return ResponseEntity
            .ok()
            .contentType(MediaType.parseMediaType(contentType))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
            .body(resource);
    }

    @GetMapping("/galerie")
    public ResponseEntity<List<FileDto>> getFileDescription(@RequestParam(value = "codeImage") ImageCategorieEnum imageCategorieEnum) {
        List<FileDto> resources = fileStorageService.loadFileAsResource(imageCategorieEnum);
        return ResponseEntity.ok(resources);
    }

    @PostMapping("/galerie")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<List<FileDto>> getFffileDescription(
        @RequestParam("file") MultipartFile file,
        @RequestParam(value = "codeImage") ImageCategorieEnum imageCategorieEnum,
        @RequestParam(value = "id", required = false) Long idImage,
        @RequestParam(value = "description", required = false) String description,
        @RequestParam(value = "prix", required = false) String prix
    ) {
        fileStorageService.storeFile(file, idImage, imageCategorieEnum, description, prix);
        return this.getFileDescription(imageCategorieEnum);
    }

    @DeleteMapping("/galerie/{ids}")
    @ResponseStatus(HttpStatus.OK)
    public void getFileDescription(@PathVariable(value = "ids") List<Long> ids) {
        fileStorageService.deleteFilesById(ids);
    }

    @GetMapping("/galerie/pageable")
    public ResponseEntity<Page<FileDto>> getFilePageable(
        @RequestParam(value = "page", defaultValue = "0") int page,
        @RequestParam(value = "size", defaultValue = "5") int size,
        @RequestParam(value = "codeImage") ImageCategorieEnum imageCategorieEnum
    ) {
        Page<FileDto> resources = fileStorageService.loadFileAsResourcePageable(imageCategorieEnum, Pageable.ofSize(size).withPage(page));
        return ResponseEntity.ok(resources);
    }
}
