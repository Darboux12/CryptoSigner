package edu.crypto.core.signature.model.dto;

import lombok.Builder;

import java.security.PrivateKey;

@Builder
public record SignatureGenerationRequest(
        String fileName,
        byte[] data,
        String signatureAlias,
        PrivateKey privateKey
) {}
