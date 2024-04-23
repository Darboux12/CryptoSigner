package edu.crypto.core.signature.model.dto;

import lombok.Builder;

@Builder
public record KeyGenerationRequest(
        String keyAlias,
        ECCurveType curveType
) {
}
