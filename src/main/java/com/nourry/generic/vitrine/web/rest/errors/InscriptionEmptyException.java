package com.nourry.generic.vitrine.web.rest.errors;

@SuppressWarnings("java:S110") // Inheritance tree of classes should not be too deep
public class InscriptionEmptyException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public InscriptionEmptyException(String saison) {
        super(ErrorConstants.EMAIL_ALREADY_USED_TYPE, "Aucune inscription pour la saison " + saison, "inscription", "inscriptionEmpty");
    }
}
