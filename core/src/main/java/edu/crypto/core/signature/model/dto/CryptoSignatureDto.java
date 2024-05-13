package edu.crypto.core.signature.model.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record CryptoSignatureDto(
        Long id,
        String alias,
        String fileName,
        String signature,
        String metadata,
        String privateKey,
        String publicKey,
        String state,
        LocalDateTime date,
        String keyPairAlias
) {}
