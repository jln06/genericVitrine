package com.nourry.generic.vitrine.domain;

import java.io.Serializable;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A user.
 */
@Entity
@Table(name = "piece_jointe")
@Setter
@Getter
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PieceJointe extends AbstractAuditingEntity<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "type", nullable = false)
    private TypePieceJointe typePieceJointe;

    @ManyToOne
    @JoinColumn(name = "id_inscription", nullable = false)
    private Inscription inscription;

    @Column(length = 200)
    private String nom;

    @Column(length = 200)
    private String taille;

    @Column(length = 200)
    private String format;

    @OneToOne
    @JoinColumn(name = "id_fichier")
    private Blob fichier;

    @Override
    public Long getId() {
        return id;
    }
}
