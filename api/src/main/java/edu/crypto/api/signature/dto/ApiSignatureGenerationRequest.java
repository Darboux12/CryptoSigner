package edu.crypto.api.signature.dto;

import lombok.Builder;

@Builder
public record ApiSignatureGenerationRequest(
        String fileName,
        byte[] data,
        String signatureAlias,
        String privateKey
) {}
