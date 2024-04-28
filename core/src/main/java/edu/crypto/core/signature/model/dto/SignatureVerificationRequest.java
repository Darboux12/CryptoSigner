package edu.crypto.core.signature.model.dto;

import lombok.Builder;

@Builder
public record SignatureVerificationRequest(
        byte[] data,
        String signature,
        String publicKey
) {}
