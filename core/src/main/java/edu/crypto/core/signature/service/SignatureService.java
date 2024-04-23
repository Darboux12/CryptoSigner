package edu.crypto.core.signature.service;

import edu.crypto.core.signature.common.KeyGenerationStartDto;
import edu.crypto.data.signature.dao.CryptoKeyPairDao;
import edu.crypto.data.signature.dao.CryptoSignatureDao;
import edu.crypto.data.signature.domain.CryptoKeyPair;
import edu.crypto.core.signature.model.dto.KeyGenerationRequest;
import edu.crypto.core.signature.model.dto.KeyPairDto;
import edu.crypto.core.signature.model.event.KeyGenerationEvent;
import edu.crypto.data.user.dao.CryptoUserDao;
import edu.crypto.core.validation.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Base64;

@Service
@AllArgsConstructor
public class SignatureService {

    private static final Logger logger = LoggerFactory.getLogger(SignatureService.class);

    private CryptoKeyPairDao keyPairDao;
    private CryptoSignatureDao signatureDao;
    private CryptoUserDao userDao;

    private ECDSAService ecdsaService;
    private final ApplicationEventPublisher applicationEventPublisher;

    private String mapPublicKeyToSafeString(PublicKey publicKey) {
        return Base64.getEncoder().encodeToString(publicKey.getEncoded());
    }

    private String mapPrivateKeyToSafeString(PrivateKey privateKey) {
        return Base64.getEncoder().encodeToString(privateKey.getEncoded());
    }

    public KeyGenerationStartDto generateKeyPair(KeyGenerationRequest request, String username) throws Exception {
        logger.info("Generating key pair for request: " + request);

        var keyPair = new CryptoKeyPair();
        var author = userDao.findByUsername(username).orElseThrow();

        keyPair.setAlias(request.keyAlias());
        keyPair.setAuthor(author);
        keyPairDao.save(keyPair);

        logger.info("Key Pair with alias: " + request.keyAlias() + " created...");
        logger.info("Publishing key pair generation event ...");
        applicationEventPublisher.publishEvent(new KeyGenerationEvent(keyPair.getId(), request));
        logger.info("Publishing event finished successfully...");

        return KeyGenerationStartDto
                .builder()
                .id(keyPair.getId())
                .alias(keyPair.getAlias())
                .date(keyPair.getGenerationDate().toString())
                .state(keyPair.getState().name())
                .build();
    }

    public KeyPairDto findKeyPairById(Long id) {
        var keyPair = keyPairDao.findById(id).orElseThrow(() -> new EntityNotFoundException("KeyPair", "id"));
        return mapKeyPairToDto(keyPair);
    }

    public KeyPairDto findKeyPairByAlias(String alias) {
        var keyPair = keyPairDao.findByAlias(alias).orElseThrow(() -> new EntityNotFoundException("KeyPair", "alias"));
        return mapKeyPairToDto(keyPair);
    }

    public String findKeyPairGenerationStateById(Long id) {
        return keyPairDao.getReferenceById(id).getState().name();
    }

    public String findKeyPairGenerationStateByAlias(String alias) {
        return keyPairDao
                .findByAlias(alias)
                .stream()
                .findFirst()
                .map(x -> x.getState().name())
                .orElseThrow(() -> new EntityNotFoundException("KeyPair","alias"));
    }

    private KeyPairDto mapKeyPairToDto(CryptoKeyPair keyPair) {
        return KeyPairDto
                .builder()
                .id(keyPair.getId())
                .alias(keyPair.getAlias())
                .author(keyPair.getAuthor().getUsername())
                .publicKey(keyPair.getPublicKey())
                .privateKey(keyPair.getPrivateKey())
                .build();
    }

/*
    public void signFile(String fileName, String signature, String metadata, String alias) {
        KeyPairEntity keyPair = keyPairDao.findKeyPairByAlias(alias);
        if (keyPair != null) {
            SignatureEntity signatureEntity = new SignatureEntity();
            signatureEntity.setFileName(fileName);
            signatureEntity.setSignature(signature);
            signatureEntity.setMetadata(metadata);
            signatureEntity.setKeyPair(keyPair);
            signatureDao.saveSignature(signatureEntity);
        } else {
            throw new RuntimeException("No key pair found with alias: " + alias);
        }
    }

    public String keyPairToString(KeyPair keyPair) {
        PublicKey pub = keyPair.getPublic();
        PrivateKey priv = keyPair.getPrivate();
        String publicKeyString = Base64.getEncoder().encodeToString(pub.getEncoded());
        String privateKeyString = Base64.getEncoder().encodeToString(priv.getEncoded());
        return publicKeyString + "," + privateKeyString;
    }

    public KeyPair stringToKeyPair(String keyPairString) throws NoSuchAlgorithmException, InvalidKeySpecException {
        String[] keys = keyPairString.split(",");
        if (keys.length != 2) {
            throw new IllegalArgumentException("Invalid key pair data");
        }

        byte[] publicKeyBytes = Base64.getDecoder().decode(keys[0]);
        byte[] privateKeyBytes = Base64.getDecoder().decode(keys[1]);

        PublicKey publicKey = KeyFactory.getInstance("EC").generatePublic(new X509EncodedKeySpec(publicKeyBytes));
        PrivateKey privateKey = KeyFactory.getInstance("EC").generatePrivate(new PKCS8EncodedKeySpec(privateKeyBytes));

        return new KeyPair(publicKey, privateKey);
    }
*/

}
