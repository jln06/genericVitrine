package com.nourry.generic.vitrine.domain;

import com.nourry.generic.vitrine.enums.VariableComponentEnum;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Getter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A user.
 */
@Entity
@Table(name = "variable_component")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "varibaleComponent")
public class VariableComponent extends AbstractAuditingEntity<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Enumerated(EnumType.STRING)
    private VariableComponentEnum code;

    @Getter
    @Column(length = 50)
    private String libelle;

    @Getter
    private String valeur;

    public VariableComponent(VariableComponentEnum code) {
        this.code = code;
        this.libelle = code.name().toLowerCase();
    }

    public VariableComponent() {}

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCode(VariableComponentEnum code) {
        this.code = code;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public void setValeur(String valeur) {
        this.valeur = valeur;
    }
}
