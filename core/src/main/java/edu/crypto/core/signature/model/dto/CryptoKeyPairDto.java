package edu.crypto.core.signature.model.dto;

import lombok.Builder;

@Builder
public record CryptoKeyPairDto(
        Long id,
        String alias,
        String author,
        String publicKey,
        String privateKey
) {}
