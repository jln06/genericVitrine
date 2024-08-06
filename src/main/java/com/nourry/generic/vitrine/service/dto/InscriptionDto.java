package com.nourry.generic.vitrine.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.nourry.generic.vitrine.domain.Inscription;
import com.nourry.generic.vitrine.utils.Utils;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;
import org.apache.commons.lang3.BooleanUtils;

@Data
public class InscriptionDto {

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
    private String email;

    private String telephone;

    @Size(min = 5, max = 15)
    private String numeroUrgence;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate dateNaissance;

    private Boolean portLunette;
    private Boolean allergie;
    private Boolean contactUrgence;
    private Boolean mineur;
    private String saisonAnnee;
    private String allergieType;
    private String santeAutre;
    private ParentDto parent1;
    private ParentDto parent2;

    private Long idAssurance;
    private Long idCertificatMedical;

    private Boolean paye;
    private LocalDateTime dateCreation;

    public InscriptionDto() {}

    public InscriptionDto(Inscription inscription) {
        this.id = inscription.getId();
        this.nom = inscription.getNom();
        this.prenom = inscription.getPrenom();
        this.email = inscription.getEmail();
        this.saisonAnnee = inscription.getSaison().getAnnees();
        this.dateNaissance = inscription.getDateNaissance();
        this.telephone = inscription.getTelephone();
        this.paye = BooleanUtils.isTrue(inscription.getPaye());
        this.dateCreation = Utils.instantToLocalDate(inscription.getCreatedDate());
        this.adresse = inscription.getAdresse();
        this.codePostal = inscription.getCodePostal();
        this.ville = inscription.getVille();
        this.dateCreation = LocalDateTime.ofInstant(inscription.getCreatedDate(), ZoneOffset.UTC);
        this.numeroUrgence = inscription.getNumeroUrgence();
        this.portLunette = inscription.getPortLunette();
        this.allergie = inscription.getAllergie();
        this.contactUrgence = inscription.getContactUrgence();
        this.mineur = inscription.getMineur();
        this.allergieType = inscription.getTypeAllergie();
        this.santeAutre = inscription.getSanteAutre();
    }
}
