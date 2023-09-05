package com.nourry.generic.vitrine.service.dto;

/**
 * A DTO representing a user, with only the public attributes.
 */

public class FileDto {

    private Long id;

    private String name;
    private String type;
    private String description;
    private String prix;
    private byte[] imageByte;

    public FileDto() {}

    public FileDto(Long id, String name, String type, byte[] imageByte) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.imageByte = imageByte;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getImageByte() {
        return imageByte;
    }

    public void setImageByte(byte[] imageByte) {
        this.imageByte = imageByte;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrix() {
        return prix;
    }

    public void setPrix(String prix) {
        this.prix = prix;
    }
}
