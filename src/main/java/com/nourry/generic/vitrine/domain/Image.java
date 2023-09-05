package com.nourry.generic.vitrine.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A user.
 */
@Entity
@Table(name = "image")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "image")
public class Image extends AbstractAuditingEntity<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Column(length = 200, nullable = false)
    private String nom;

    @Getter
    @Column(length = 100)
    private String type;

    @Getter
    @Column(length = 200)
    private String uri;

    @Getter
    @Column(length = 200)
    private String description;

    @Getter
    @Column(length = 200)
    private String prix;

    @Getter
    @ManyToOne
    @JoinColumn(name = "image_categorie_code")
    private ImageCategorie imageCategorie;

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

    public void setType(String type) {
        this.type = type;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public void setImageCategorie(ImageCategorie imageCategorie) {
        this.imageCategorie = imageCategorie;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrix(String prix) {
        this.prix = prix;
    }
}
