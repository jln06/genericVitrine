package com.nourry.generic.vitrine.service.exception;

public class NoVariableComponentException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    private String variableComponentCode;

    public NoVariableComponentException() {
        super();
    }

    public NoVariableComponentException(String variableComponentCode) {
        super("La variable " + variableComponentCode + " inexistante en base de donnée");
    }
}
