package org.pupille.backend.news.exceptions;

public class NewsUpdateException extends IllegalArgumentException {
    public NewsUpdateException(String message) {
        super(message);
    }
}