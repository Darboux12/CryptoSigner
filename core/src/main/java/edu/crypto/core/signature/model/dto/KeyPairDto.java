package edu.crypto.core.signature.model.dto;

import lombok.Builder;

@Builder
public record KeyPairDto(
        Long id,
        String alias,
        String author,
        String publicKey,
        String privateKey
) {}
