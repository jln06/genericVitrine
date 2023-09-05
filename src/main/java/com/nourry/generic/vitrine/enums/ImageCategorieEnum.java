package com.nourry.generic.vitrine.enums;

public enum ImageCategorieEnum {
    GALERIE(true),
    PRESENTATION(false),
    BANNIERE(false),
    GOODIES(true);

    private boolean recupToute;

    ImageCategorieEnum(boolean recupToute) {
        this.recupToute = recupToute;
    }

    public boolean isRecupToute() {
        return recupToute;
    }
}
