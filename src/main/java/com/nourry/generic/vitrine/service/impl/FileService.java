package com.nourry.generic.vitrine.service.impl;

import com.nourry.generic.vitrine.config.FileStorageProperties;
import com.nourry.generic.vitrine.domain.Image;
import com.nourry.generic.vitrine.domain.ImageCategorie;
import com.nourry.generic.vitrine.enums.ImageCategorieEnum;
import com.nourry.generic.vitrine.repository.ImageCategorieRepository;
import com.nourry.generic.vitrine.repository.ImageRepository;
import com.nourry.generic.vitrine.service.IFileService;
import com.nourry.generic.vitrine.service.dto.FileDto;
import com.nourry.generic.vitrine.service.dto.ImageInfoDto;
import com.nourry.generic.vitrine.web.rest.errors.FileStorageException;
import com.nourry.generic.vitrine.web.rest.errors.MyFileNotFoundException;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import javax.annotation.PostConstruct;
import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
public class FileService implements IFileService {

    private Path fileStorageLocation;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ImageCategorieRepository imageCategorieRepository;

    @Autowired
    FileStorageProperties fileStorageProperties;

    @PostConstruct
    public void FileServiceConfig() {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public void storeFile(MultipartFile file, Long idImage, ImageCategorieEnum categorie, String description, String prix) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Optional<ImageCategorie> imageCategorie = imageCategorieRepository.findByCode(categorie);
        imageCategorie
            .map(ImageCategorie::getChemin)
            .map(this.fileStorageLocation::resolve)
            .map(pathV -> pathV.resolve(fileName))
            .map(path -> {
                ImageInfoDto imageInfoDto = new ImageInfoDto();
                imageInfoDto.setId(idImage);
                imageInfoDto.setNomImage(fileName);
                imageInfoDto.setImageCategorie(imageCategorie.get());
                imageInfoDto.setFile(file);
                imageInfoDto.setDescription(description);
                imageInfoDto.setPrix(prix);
                imageInfoDto.setTargetLocation(path);
                return imageInfoDto;
            })
            .ifPresent(this::storeAndPersit);
    }

    private void storeAndPersit(ImageInfoDto imageInfoDto) {
        try {
            Optional.ofNullable(imageInfoDto.getId()).ifPresent(id -> log.debug("Mise à jour image id : {}", id));
            log.debug("Enregistrement physique image {}", imageInfoDto.getNomImage());
            compressFile2(imageInfoDto);
            Image image = Optional
                .ofNullable(imageInfoDto.getId())
                .flatMap(imageRepository::findById)
                .stream()
                .findFirst()
                .orElseGet(Image::new);
            image.setNom(imageInfoDto.getNomImage());
            image.setType(imageInfoDto.getFile().getContentType());
            image.setImageCategorie(imageInfoDto.getImageCategorie());
            image.setDescription(imageInfoDto.getDescription());
            image.setPrix(imageInfoDto.getPrix());
            log.debug("Enregistrement en BDD image {}", imageInfoDto.getNomImage());
            imageRepository.save(image);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + imageInfoDto.getFile().getName() + ". Please try again!", ex);
        }
    }

    private void compressFile(ImageInfoDto imageInfoDto) throws IOException {
        BufferedImage inputImage = ImageIO.read(imageInfoDto.getFile().getInputStream());
        Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName(imageInfoDto.getFile().getContentType());
        ImageWriter writer = writers.next();
        ImageOutputStream outputStream = ImageIO.createImageOutputStream(imageInfoDto.getTargetLocation());
        writer.setOutput(outputStream);
        ImageWriteParam params = writer.getDefaultWriteParam();
        params.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
        params.setCompressionQuality(0.5f);

        writer.write(null, new IIOImage(inputImage, null, null), params);

        outputStream.close();
        writer.dispose();
    }

    private void compressFile2(ImageInfoDto imageInfoDto) throws IOException {
        log.debug("Compression de l'image");
        try {
            MultipartFile file = imageInfoDto.getFile();
            BufferedImage inputImage = ImageIO.read(file.getInputStream());
            Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName(FilenameUtils.getExtension(file.getOriginalFilename()));
            ImageWriter writer = writers.next();
            ImageWriteParam params = writer.getDefaultWriteParam();
            params.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            params.setCompressionQuality(0.5f);
            File targetLocation = imageInfoDto.getTargetLocation().toFile();
            Path tempLocation = Paths.get(targetLocation.toString() + ".temp");
            try (ImageOutputStream outputStream = ImageIO.createImageOutputStream(tempLocation.toFile())) {
                writer.setOutput(outputStream);
                writer.write(null, new IIOImage(inputImage, null, null), params);
            } finally {
                writer.dispose();
            }
            Files.copy(tempLocation, targetLocation.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            log.debug("Erreur lors de la compression de l'image", e);
            Files.copy(imageInfoDto.getFile().getInputStream(), imageInfoDto.getTargetLocation(), StandardCopyOption.REPLACE_EXISTING);
        }
    }

    public Resource loadFileAsResource(String directory, String fileName) {
        Path subDirectory = this.fileStorageLocation.resolve(directory);
        if (Files.exists(subDirectory) && Files.isDirectory(subDirectory)) {
            try {
                Path filePath = subDirectory.resolve(fileName).normalize();
                Resource resource = new UrlResource(filePath.toUri());
                if (resource.exists()) {
                    return resource;
                } else {
                    throw new MyFileNotFoundException("File not found " + fileName);
                }
            } catch (MalformedURLException ex) {
                throw new MyFileNotFoundException("File not found " + fileName, ex);
            }
        } else {
            throw new MyFileNotFoundException("Répertoire non trouvé " + subDirectory);
        }
    }

    public List<FileDto> loadFileAsResource(ImageCategorieEnum categorie) {
        log.debug("Verification existence repertoire {}", categorie);
        return imageCategorieRepository
            .findByCode(categorie)
            .map(ImageCategorie::getChemin)
            .map(this.fileStorageLocation::resolve)
            .map(e -> this.getFiles(e, categorie))
            .orElseGet(ArrayList::new);
    }

    public Page<FileDto> loadFileAsResourcePageable(ImageCategorieEnum categorie, Pageable pageable) {
        log.debug("Verification existence repertoire {}", categorie);
        return imageCategorieRepository
            .findByCode(categorie)
            .map(ImageCategorie::getChemin)
            .map(this.fileStorageLocation::resolve)
            .map(e -> this.getFilesPageable(e, categorie, pageable))
            .orElseGet(Page::empty);
    }

    private Page<FileDto> getFilesPageable(Path directory, ImageCategorieEnum categorie, Pageable pageable) {
        log.debug("Recuperation des photos {}", categorie);
        List<FileDto> filesDto = new ArrayList<>();
        Page<Image> images = imageRepository.findAll(pageable);
        images
            .map(imageInfo -> {
                String fileName = imageInfo.getNom();
                Path filePath = directory.resolve(fileName).normalize();
                return getFileDto(filePath, imageInfo);
            })
            .forEach(fileDto -> fileDto.ifPresent(filesDto::add));
        return new PageImpl<>(filesDto, images.getPageable(), images.getTotalElements());
    }

    private List<FileDto> getFiles(Path directory, ImageCategorieEnum categorie) {
        log.debug("Recuperation des photos {}", categorie);
        List<FileDto> filesDto = new ArrayList<>();
        List<Image> imagesInfo = categorie.isRecupToute()
            ? imageRepository.findByImageCategorieCodeOrderByCreatedDateDesc(categorie)
            : imageRepository.findFirstByImageCategorieCodeOrderByCreatedDateDesc(categorie);
        imagesInfo.forEach(imageInfo -> {
            String fileName = imageInfo.getNom();
            Path filePath = directory.resolve(fileName).normalize();
            getFileDto(filePath, imageInfo).ifPresent(filesDto::add);
        });
        log.debug("Chargement de {} photos {}", filesDto.size(), categorie);
        return filesDto;
    }

    private Optional<FileDto> getFileDto(Path path, Image imageInfo) {
        if (Files.isRegularFile(path)) {
            FileDto fileDto = new FileDto();
            fileDto.setId(imageInfo.getId());
            fileDto.setType(imageInfo.getType());
            fileDto.setName(imageInfo.getNom());
            fileDto.setDescription(imageInfo.getDescription());
            fileDto.setPrix(imageInfo.getPrix());
            try {
                fileDto.setImageByte(Files.readAllBytes(path));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return Optional.of(fileDto);
        }
        return Optional.empty();
    }

    /**
     * supprimes de maniere logique
     * les images (restent quand même sur le serveur
     * en physique)
     *
     * @param ids
     */
    public void deleteFilesById(List<Long> ids) {
        log.debug("Suppression d'images en BDD : {}", ids.size());
        imageRepository.deleteAllById(ids);
    }
}
