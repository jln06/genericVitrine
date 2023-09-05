package com.nourry.generic.vitrine.domain;

import com.nourry.generic.vitrine.enums.ImageCategorieEnum;
import com.nourry.generic.vitrine.enums.VariableComponentEnum;
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
@Table(name = "image_categorie")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ImageCategorie implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Id
    @Column(name = "code", length = 50)
    private ImageCategorieEnum code;

    @Getter
    @Column(length = 200)
    private String chemin;

    public ImageCategorieEnum getCode() {
        return code;
    }

    public void setCode(ImageCategorieEnum code) {
        this.code = code;
    }

    public void setChemin(String chemin) {
        this.chemin = chemin;
    }
}
