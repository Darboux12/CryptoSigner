package edu.crypto.core.signature.model.dto;

import edu.crypto.core.signature.model.common.ECCurveType;
import lombok.Builder;

@Builder
public record KeyGenerationRequest(
        String keyAlias,
        ECCurveType curveType
) {
}
