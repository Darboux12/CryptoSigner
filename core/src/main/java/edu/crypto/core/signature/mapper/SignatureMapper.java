package edu.crypto.core.signature.mapper;

import edu.crypto.core.signature.model.dto.CryptoKeyPairDto;
import edu.crypto.core.signature.model.dto.CryptoSignatureDto;
import edu.crypto.data.signature.domain.CryptoKeyPair;
import edu.crypto.data.signature.domain.CryptoSignature;

import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Set;
import java.util.stream.Collectors;

public class SignatureMapper {

    public static String mapSignatureToSafeString(byte[] signature) {
        return Base64.getEncoder().encodeToString(signature);
    }

    public static byte[] mapSafeStringToSignature(String signature) {
        return Base64.getDecoder().decode(signature);
    }

    public static String mapPublicKeyToSafeString(PublicKey publicKey) {
        return Base64.getEncoder().encodeToString(publicKey.getEncoded());
    }

    public static String mapPrivateKeyToSafeString(PrivateKey privateKey) {
        return Base64.getEncoder().encodeToString(privateKey.getEncoded());
    }

    public static PrivateKey mapSafeStringToPrivateKey(String privateKey) throws NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] privateKeyBytes = Base64.getDecoder().decode(privateKey);
        return KeyFactory.getInstance("EC").generatePrivate(new PKCS8EncodedKeySpec(privateKeyBytes));
    }

    public static PublicKey mapSafeStringToPublicKey(String publicKey) throws NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] publicKeyBytes = Base64.getDecoder().decode(publicKey);
        return KeyFactory.getInstance("EC").generatePublic(new X509EncodedKeySpec(publicKeyBytes));
    }

    public static Set<CryptoSignatureDto> mapSignatureToDtos(Set<CryptoSignature> signature) {
        return signature.stream().map(SignatureMapper::mapSignatureToDto).collect(Collectors.toSet());
    }

    public static Set<CryptoKeyPairDto> mapKeyPairToDtos(Set<CryptoKeyPair> keyPairs) {
        return keyPairs.stream().map(SignatureMapper::mapKeyPairToDto).collect(Collectors.toSet());
    }

    public static CryptoSignatureDto mapSignatureToDto(CryptoSignature signature) {
        return CryptoSignatureDto
                .builder()
                .id(signature.getId())
                .alias(signature.getAlias())
                .fileName(signature.getFileName())
                .signature(signature.getSignature())
                .metadata(signature.getMetadata())
                .privateKey(signature.getKeyPair().getPrivateKey())
                .publicKey(signature.getKeyPair().getPublicKey())
                .date(signature.getGenerationDate())
                .state(signature.getState().name())
                .keyPairAlias(signature.getKeyPair().getAlias())
                .build();
    }

    public static CryptoKeyPairDto mapKeyPairToDto(CryptoKeyPair keyPair) {
        return CryptoKeyPairDto
                .builder()
                .id(keyPair.getId())
                .alias(keyPair.getAlias())
                .author(keyPair.getAuthor().getUsername())
                .publicKey(keyPair.getPublicKey())
                .privateKey(keyPair.getPrivateKey())
                .date(keyPair.getGenerationDate())
                .state(keyPair.getState().name())
                .build();
    }

    public static void main(String[] args) throws NoSuchAlgorithmException, InvalidKeySpecException {
        String myPrivateKey = "MEECAQAwEwYHKoZIzj0CAQYIKoZIzj0DAQcEJzAlAgEBBCAXqnmgL51xy+Czr6J282DUzzz1EqtqFHXGU0qMFuNlPg==";
        String expected = "MEECAQAwEwYHKoZIzj0CAQYIKoZIzj0DAQcEJzAlAgEBBCAXqnmgL51xy+Czr6J282DUzzz1EqtqFHXGU0qMFuNlPg==";
        String actual = mapPrivateKeyToSafeString(mapSafeStringToPrivateKey(myPrivateKey));
        System.out.println(expected.equals(actual));
    }
}
