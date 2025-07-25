package org.pupille.backend.mysql.programmheft.exceptions;

public class ProgrammheftNotFoundException extends RuntimeException {
    public ProgrammheftNotFoundException(String message) {
        super(message);
    }
}
