package edu.crypto.core.signature.service;

import edu.crypto.core.signature.common.KeyGenerationStartDto;
import edu.crypto.core.signature.common.SignatureGenerationStartDto;
import edu.crypto.core.signature.mapper.SignatureMapper;
import edu.crypto.core.signature.model.dto.*;
import edu.crypto.core.signature.model.event.KeyGenerationEvent;
import edu.crypto.core.signature.model.event.SignatureGenerationEvent;
import edu.crypto.core.validation.EntityNotFoundException;
import edu.crypto.data.signature.dao.CryptoKeyPairDao;
import edu.crypto.data.signature.dao.CryptoSignatureDao;
import edu.crypto.data.signature.domain.CryptoKeyPair;
import edu.crypto.data.signature.domain.CryptoSignature;
import edu.crypto.data.user.dao.CryptoUserDao;
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
    private final ApplicationEventPublisher applicationEventPublisher;
    private CryptoKeyPairDao keyPairDao;
    private CryptoSignatureDao signatureDao;
    private CryptoUserDao userDao;
    private ECDSAService ecdsaService;

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

    public CryptoKeyPairDto findKeyPairById(Long id) {
        var keyPair = keyPairDao.findById(id).orElseThrow(() -> new EntityNotFoundException("KeyPair", "id"));
        return SignatureMapper.mapKeyPairToDto(keyPair);
    }

    public CryptoKeyPairDto findKeyPairByAlias(String alias) {
        var keyPair = keyPairDao.findByAlias(alias).orElseThrow(() -> new EntityNotFoundException("KeyPair", "alias"));
        return SignatureMapper.mapKeyPairToDto(keyPair);
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
                .orElseThrow(() -> new EntityNotFoundException("KeyPair", "alias"));
    }


    public SignatureGenerationStartDto signData(SignatureGenerationRequest request) {
        logger.info("Signing data for request: " + request);

        var signature = new CryptoSignature();
        signature.setAlias(request.signatureAlias());
        signature.setMetadata(request.fileName());
        signature.setFileName(request.fileName());

        String privateKeyEnc = SignatureMapper.mapPrivateKeyToSafeString(request.privateKey());

        var keyPair = keyPairDao.findByPrivateKey(privateKeyEnc).orElseThrow(() -> new EntityNotFoundException("Key Pir", "key value"));
        keyPair.addSignature(signature);

        signatureDao.save(signature);

        logger.info("Signature with alias: " + request.signatureAlias() + " for file " + request.fileName() + " created...");
        logger.info("Publishing signature generation event ...");
        applicationEventPublisher.publishEvent(new SignatureGenerationEvent(signature.getId(), request));
        logger.info("Publishing event finished successfully...");

        return SignatureGenerationStartDto
                .builder()
                .id(signature.getId())
                .alias(signature.getAlias())
                .date(signature.getGenerationDate().toString())
                .state(signature.getState().name())
                .privateKey(privateKeyEnc)
                .build();
    }

    public CryptoSignatureDto findSignatureById(Long id) {
        var signature = signatureDao.findById(id).orElseThrow(() -> new EntityNotFoundException("CryptoSignature", "id"));
        return SignatureMapper.mapSignatureToDto(signature);
    }

    public CryptoSignatureDto findSignatureByAlias(String alias) {
        var signature = signatureDao.findByAlias(alias).orElseThrow(() -> new EntityNotFoundException("CryptoSignature", "alias"));
        return SignatureMapper.mapSignatureToDto(signature);
    }

    public String findSignatureGenerationStateById(Long id) {
        return signatureDao.getReferenceById(id).getState().name();
    }

    public String findSignatureGenerationStateByAlias(String alias) {
        return signatureDao
                .findByAlias(alias)
                .stream()
                .findFirst()
                .map(x -> x.getState().name())
                .orElseThrow(() -> new EntityNotFoundException("CryptoSignature", "alias"));
    }

    public boolean verifySignature(SignatureVerificationRequest request) throws Exception {
        return ecdsaService.verifySignature(
                request.data(),
                SignatureMapper.mapSafeStringToSignature(request.signature()),
                SignatureMapper.mapSafeStringToPublicKey(request.publicKey())
        );
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
