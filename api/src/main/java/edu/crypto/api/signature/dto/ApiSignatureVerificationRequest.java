package edu.crypto.api.signature.dto;

public record ApiSignatureVerificationRequest (
        byte[] data,
        String signature,
        String publicKey
) {}
