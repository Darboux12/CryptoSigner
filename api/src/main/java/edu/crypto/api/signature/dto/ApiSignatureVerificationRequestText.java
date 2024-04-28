package edu.crypto.api.signature.dto;

import lombok.Builder;

@Builder
public record ApiSignatureVerificationRequestText(
        String data,
        String signature,
        String publicKey
) {}
