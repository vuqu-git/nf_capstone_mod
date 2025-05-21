package org.pupille.backend.contact.exceptions;

public class InvalidIssueTypeException extends RuntimeException {
    public InvalidIssueTypeException(String message) {
        super(message);
    }
}