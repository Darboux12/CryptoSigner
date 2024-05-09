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

@Service
@AllArgsConstructor
public class SignatureService {

    private static final Logger logger = LoggerFactory.getLogger(SignatureService.class);
    private final ApplicationEventPublisher applicationEventPublisher;
    private CryptoKeyPairDao keyPairDao;
    private CryptoSignatureDao signatureDao;
    private CryptoUserDao userDao;
    private ECDSAService ecdsaService;

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

}
