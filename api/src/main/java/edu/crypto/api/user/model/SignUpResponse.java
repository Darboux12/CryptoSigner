package edu.crypto.api.user.model;


import org.springframework.http.HttpStatus;

public record SignUpResponse (
        HttpStatus status,
        String message

) {
}
