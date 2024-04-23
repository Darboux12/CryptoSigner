package edu.crypto.api.signature;

import edu.crypto.api.common.annotation.ValidEnumValue;
import edu.crypto.core.signature.model.dto.ECCurveType;

public record ApiKeyGenerationRequest(
        String alias,
        @ValidEnumValue(enumClass = ECCurveType.class)
        String curveType
) {
}
