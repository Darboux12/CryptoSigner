package edu.crypto.core.validation;

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(String entity, String param) {
        super(entity + " with given " + param + "has not been found");
    }
}
