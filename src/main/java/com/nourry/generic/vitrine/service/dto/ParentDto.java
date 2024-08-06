package com.nourry.generic.vitrine.service.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class ParentDto {

    private Long id;

    @Size(min = 1, max = 50)
    @NotNull
    private String nom;

    @Size(min = 1, max = 50)
    @NotNull
    private String prenom;

    @Size(max = 150)
    private String adresse;

    @Size(min = 5, max = 5)
    @NotNull
    private String codePostal;

    @Size(max = 50)
    @NotNull
    private String ville;

    @Email
    @Size(min = 5, max = 254)
    private String email;

    @Size(min = 5, max = 15)
    private String telephone;

    private String situationFamiliale;

    public ParentDto() {}
}
