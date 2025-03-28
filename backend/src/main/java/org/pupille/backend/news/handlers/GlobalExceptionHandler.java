package org.pupille.backend.news.handlers;

import org.pupille.backend.news.dtos.CustomErrorMessage;
import org.pupille.backend.news.exceptions.NewsNotFoundException;
import org.pupille.backend.news.exceptions.NewsUpdateException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NewsUpdateException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CustomErrorMessage handleNewsUpdateException(NewsUpdateException e) {
        return new CustomErrorMessage(e.getMessage(), Instant.now());
    }
    @ExceptionHandler(NewsNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public CustomErrorMessage handleNewsNotFoundException(NewsNotFoundException e) {
        return new CustomErrorMessage(e.getMessage(), Instant.now());
    }

    // Other exception handlers as needed
}