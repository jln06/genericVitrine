package com.nourry.generic.vitrine.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nourry.generic.vitrine.config.Constants;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A user.
 */
@Entity
@Table(name = "inscription")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "inscription")
public class Inscription extends AbstractAuditingEntity<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Getter
    @Size(min = 1, max = 50)
    @Column(length = 50)
    private String nom;

    @Getter
    @Size(min = 1, max = 50)
    @Column(length = 50)
    private String prenom;

    @Getter
    @Email
    @Size(min = 5, max = 254)
    @Column(length = 254)
    private String email;

    @Getter
    @Size(min = 5, max = 15)
    @Column(length = 15)
    private String telephone;

    @Getter
    private LocalDate dateNaissance;

    @Getter
    @NotNull
    @Column(nullable = false)
    private Boolean paye;

    @Getter
    @ManyToOne
    @JoinColumn(name = "saison_id")
    private Saison saison;

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setSaison(Saison saison) {
        this.saison = saison;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public void setPaye(Boolean paye) {
        this.paye = paye;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
}
