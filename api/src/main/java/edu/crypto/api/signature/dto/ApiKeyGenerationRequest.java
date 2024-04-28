package edu.crypto.api.signature.dto;

import edu.crypto.api.common.annotation.ValidEnumValue;
import edu.crypto.core.signature.model.common.ECCurveType;

public record ApiKeyGenerationRequest(
        String alias,
        @ValidEnumValue(enumClass = ECCurveType.class)
        String curveType
) {
}
