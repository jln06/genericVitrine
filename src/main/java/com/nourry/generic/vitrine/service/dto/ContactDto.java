package com.nourry.generic.vitrine.service.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class ContactDto {

    @Size(min = 1, max = 50)
    private String nom;

    @Size(min = 1, max = 50)
    private String prenom;

    @Email
    @Size(min = 5, max = 254)
    private String email;

    @Pattern(regexp = "^[0-9]{10,14}$", message = "Le numéro de téléphone doit contenir de 10 à 14 chiffres.")
    private String numeroTelephone;

    @Size(min = 1, max = 800)
    private String message;

    public ContactDto() {}
}
