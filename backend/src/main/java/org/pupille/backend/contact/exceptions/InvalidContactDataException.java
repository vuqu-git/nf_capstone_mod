package org.pupille.backend.contact.exceptions;

public class InvalidContactDataException extends RuntimeException {
    public InvalidContactDataException(String message) {
        super(message);
    }
}