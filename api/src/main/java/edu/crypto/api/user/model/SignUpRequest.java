package edu.crypto.api.user.model;

public record SignUpRequest(
        String username,
        String email,
        String password,
        String repeatPassword
) {
}
