package com.nourry.generic.vitrine.domain;

import com.nourry.generic.vitrine.enums.PieceJointeTypeEnum;
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
@Table(name = "situation_familiale")
@Setter
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
//@org.springframework.data.elasticsearch.annotations.Document(indexName = "inscription")
public class SituationFamiliale implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Getter
    @Column(length = 50, nullable = false)
    private String code;

    @Getter
    @Column(length = 50, nullable = false)
    private String libelle;
}
