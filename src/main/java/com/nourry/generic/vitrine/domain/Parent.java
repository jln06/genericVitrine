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
@Table(name = "parent")
@Setter
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
//@org.springframework.data.elasticsearch.annotations.Document(indexName = "inscription")
public class Parent implements Serializable {

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
    @ManyToOne
    @JoinColumn(name = "situation_familiale")
    private SituationFamiliale situationFamiliale;

    @Getter
    @ManyToOne
    @JoinColumn(name = "id_inscription")
    private Inscription inscription;
}
