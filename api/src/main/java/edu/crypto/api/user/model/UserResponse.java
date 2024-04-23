package edu.crypto.api.user.model;

import lombok.Builder;

import java.util.Set;

@Builder
public record UserResponse(
        Long id,
        String username,
        String email,
        Set<String> roles
) {}
