package edu.crypto.core.signature.model.dto;

import java.util.Set;

public record CryptoKeyPairEntityDto (
        Long id,
        String alias,
        String author,
        String publicKey,
        String privateKey,
        Set<String> signatures
) {
}
