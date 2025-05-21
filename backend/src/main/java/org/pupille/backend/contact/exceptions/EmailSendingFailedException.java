package org.pupille.backend.contact.exceptions;

public class EmailSendingFailedException extends RuntimeException {
    public EmailSendingFailedException(String message, Throwable cause) {
        super(message, cause);
    }

    public EmailSendingFailedException(String message) {
        super(message);
    }
}