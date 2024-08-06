package com.nourry.generic.vitrine.domain;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A user.
 */
@Entity
@Table(name = "inscription")
@Setter
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
//@org.springframework.data.elasticsearch.annotations.Document(indexName = "inscription")
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
    @Column(length = 254)
    private String email;

    @Getter
    @Column(length = 15)
    private String telephone;

    @Getter
    @Size(min = 5, max = 15)
    @Column(name = "numero_urgence", length = 15)
    private String numeroUrgence;

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

    @Getter
    @Size(max = 150)
    private String adresse;

    @Getter
    @Size(min = 5, max = 5)
    @NotNull
    @Column(name = "codePostal", length = 5)
    private String codePostal;

    @Getter
    @Size(max = 50)
    @NotNull
    private String ville;

    @Getter
    @Column(name = "port_lunette")
    private Boolean portLunette;

    @Getter
    @Column(name = "allergie")
    private Boolean allergie;

    @Getter
    @Column(name = "contact_urgence")
    private Boolean contactUrgence;

    @Getter
    @NotNull
    @Column(name = "mineur")
    private Boolean mineur;

    @Getter
    @Size(max = 50)
    @Column(name = "type_allergie")
    private String typeAllergie;

    @Getter
    @Size(max = 50)
    @Column(name = "sante_autre")
    private String santeAutre;

    @Override
    public Long getId() {
        return id;
    }
}
