package edu.crypto.core.user;

import edu.crypto.core.signature.model.dto.CryptoKeyPairDto;
import edu.crypto.core.signature.model.dto.CryptoSignatureDto;
import lombok.Builder;

import java.util.Set;

@Builder
public record UserResponse(
        Long id,
        String username,
        String email,
        Set<CryptoSignatureDto> cryptoSignatureDtos,
        Set<CryptoKeyPairDto> cryptoKeyPairDtos,
        Set<String> roles
) {}
