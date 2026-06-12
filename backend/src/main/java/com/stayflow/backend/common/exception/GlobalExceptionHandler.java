package com.stayflow.backend.common.exception;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(IllegalArgumentException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, String> handleIllegalArgumentException(
      IllegalArgumentException e
  ) {
    return Map.of(
        "message", e.getMessage()
    );
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, String> handleMethodArgumentNotValidException(
      MethodArgumentNotValidException e
  ) {
    String message = e.getBindingResult()
        .getFieldError()
        .getDefaultMessage();

    return Map.of(
        "message", message
    );
  }

  @ExceptionHandler(HttpClientErrorException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, String> handleHttpClientErrorException(
      HttpClientErrorException e
  ) {
    return Map.of("message", e.getResponseBodyAsString());
  }

}
