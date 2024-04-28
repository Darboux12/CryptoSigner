package edu.crypto.api.signature.dto;

import lombok.Builder;

@Builder
public record ApiSignatureGenerationRequestText (
        String fileName,
        String data,
        String signatureAlias,
        String privateKey
) {}
