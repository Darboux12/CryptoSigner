package edu.crypto.core.signature.common;

import lombok.Builder;

@Builder
public record SignatureGenerationStartDto(
        Long id,
        String alias,
        String date,
        String state,
        String privateKey
) {}
