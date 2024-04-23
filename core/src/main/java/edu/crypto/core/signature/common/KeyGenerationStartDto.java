package edu.crypto.core.signature.common;

import lombok.Builder;

@Builder
public record KeyGenerationStartDto(
        Long id,
        String alias,
        String date,
        String state) {
}
