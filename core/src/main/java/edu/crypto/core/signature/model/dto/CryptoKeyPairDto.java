package edu.crypto.core.signature.model.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record CryptoKeyPairDto(
        Long id,
        String alias,
        String author,
        String publicKey,
        String privateKey,
        LocalDateTime date,
        String state
) {}
