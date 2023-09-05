package com.nourry.generic.vitrine.service.dto;

import co.elastic.clients.json.JsonpDeserializable;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.nourry.generic.vitrine.Utils;
import com.nourry.generic.vitrine.domain.Inscription;
import com.nourry.generic.vitrine.domain.User;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Data;
import org.apache.commons.lang3.BooleanUtils;

@Data
public class InscriptionDto {

    private Long id;

    @Size(min = 1, max = 50)
    private String nom;

    @Size(min = 1, max = 50)
    private String prenom;

    @Email
    @Size(min = 5, max = 254)
    private String email;

    @Size(min = 5, max = 15)
    private String telephone;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate dateNaissance;

    private Boolean paye;
    private String saisonAnnee;
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
    }
}
