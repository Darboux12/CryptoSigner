package edu.crypto.core.user;

import lombok.Builder;

@Builder
public record SaveUserRequest (
        String username,
        String email,
        String password
){
}
