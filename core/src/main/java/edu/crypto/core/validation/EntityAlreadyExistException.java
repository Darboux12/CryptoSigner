package edu.crypto.core.validation;

public class EntityAlreadyExistException extends RuntimeException {

    public  EntityAlreadyExistException(String entity, String param) {
        super(entity + " with given " + param + " already exist");
    }

}
