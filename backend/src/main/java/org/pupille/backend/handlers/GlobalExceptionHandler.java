//package org.pupille.backend.handlers;
//
//import org.pupille.backend.news.dtos.CustomErrorMessage;
//import org.pupille.backend.news.exceptions.NewsNotFoundException;
//import org.pupille.backend.news.exceptions.NewsUpdateException;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.ResponseStatus;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//import java.time.Instant;
//import java.util.NoSuchElementException;
//
//@RestControllerAdvice
//public class GlobalExceptionHandler {
//
//    // for exceptions thrown in NewsService
//    @ExceptionHandler(NewsUpdateException.class)
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    public CustomErrorMessage handleNewsUpdateException(NewsUpdateException e) {
//        return new CustomErrorMessage(e.getMessage(), Instant.now());
//    }
//    @ExceptionHandler(NewsNotFoundException.class)
//    @ResponseStatus(HttpStatus.NOT_FOUND)
//    public CustomErrorMessage handleNewsNotFoundException(NewsNotFoundException e) {
//        return new CustomErrorMessage(e.getMessage(), Instant.now());
//    }
//
//    // this one is for exception thrown in getTerminWithFilmsPlusByTerminId method in ScreeningService class
//    @ExceptionHandler(NoSuchElementException.class)
//    @ResponseStatus(HttpStatus.NOT_FOUND)
//    public CustomErrorMessage handleTerminNotFoundException(NoSuchElementException e) {
//        return new CustomErrorMessage(e.getMessage(), Instant.now());
//    }
//}


package org.pupille.backend.handlers;

import org.pupille.backend.contact.exceptions.EmailSendingFailedException;
import org.pupille.backend.contact.exceptions.InvalidContactDataException;
import org.pupille.backend.contact.exceptions.InvalidDateTimeFormatException;
import org.pupille.backend.contact.exceptions.InvalidEngagementHoursFormatException;
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

    // --- Exception Handlers for News Service ---
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

    // --- Exception Handler for Screening Service ---
    // this one is for exception thrown in getTerminWithFilmsPlusByTerminId method in ScreeningService class
    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public CustomErrorMessage handleTerminNotFoundException(NoSuchElementException e) {
        return new CustomErrorMessage(e.getMessage(), Instant.now());
    }

    // --- Exception Handlers for Contact Service ---
    @ExceptionHandler(InvalidContactDataException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CustomErrorMessage handleInvalidContactDataException(InvalidContactDataException e) {
        return new CustomErrorMessage(e.getMessage(), Instant.now());
    }

    @ExceptionHandler(InvalidDateTimeFormatException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CustomErrorMessage handleInvalidDateTimeFormatException(InvalidDateTimeFormatException e) {
        return new CustomErrorMessage(e.getMessage(), Instant.now());
    }

    @ExceptionHandler(InvalidEngagementHoursFormatException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CustomErrorMessage handleInvalidEngagementHoursFormatException(InvalidEngagementHoursFormatException e) {
        return new CustomErrorMessage(e.getMessage(), Instant.now());
    }

    @ExceptionHandler(EmailSendingFailedException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public CustomErrorMessage handleEmailSendingFailedException(EmailSendingFailedException e) {
        return new CustomErrorMessage(e.getMessage(), Instant.now());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CustomErrorMessage handleIllegalArgumentException(IllegalArgumentException e) {
        return new CustomErrorMessage(e.getMessage(), Instant.now());
    }
}