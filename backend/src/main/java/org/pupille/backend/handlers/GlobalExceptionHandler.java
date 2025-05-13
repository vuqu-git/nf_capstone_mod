package org.pupille.backend.handlers;

import org.pupille.backend.news.dtos.CustomErrorMessage;
import org.pupille.backend.news.exceptions.NewsNotFoundException;
import org.pupille.backend.news.exceptions.NewsUpdateException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // for exceptions thrown in NewsService
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

    // this one is for exception thrown in getTerminWithFilmsPlusByTerminId method in ScreeningService class
    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public CustomErrorMessage handleTerminNotFoundException(NoSuchElementException e) {
        return new CustomErrorMessage(e.getMessage(), Instant.now());
    }
}