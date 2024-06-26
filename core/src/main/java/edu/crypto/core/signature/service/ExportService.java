package edu.crypto.core.signature.service;

import edu.crypto.core.validation.EntityNotFoundException;
import edu.crypto.data.signature.dao.CryptoKeyPairDao;
import edu.crypto.data.signature.dao.CryptoSignatureDao;
import org.springframework.stereotype.Service;

@Service
public class ExportService {

    private final CryptoKeyPairDao keyPairDao;
    private final CryptoSignatureDao signatureDao;

    public ExportService(CryptoKeyPairDao keyPairDao, CryptoSignatureDao signatureDao) {
        this.keyPairDao = keyPairDao;
        this.signatureDao = signatureDao;
    }

    public String exportSignatureByAlias(String alias) {
        var signature = signatureDao.findByAlias(alias).orElseThrow(() -> new EntityNotFoundException("Signature", "alias"));
        return exportSignature(signature.getSignature());
    }

    public String exportPrivateKeyPKCS8ByAlias(String alias) {
        var keyPair = keyPairDao.findByAlias(alias).orElseThrow(() -> new EntityNotFoundException("KeyPair", "alias"));
        return exportPrivateKeyPKCS8(keyPair.getPrivateKey());
    }

    public String exportPublicKeyPKCS8ByAlias(String alias) {
        var keyPair = keyPairDao.findByAlias(alias).orElseThrow(() -> new EntityNotFoundException("KeyPair", "alias"));
        return exportPublicKeyX509(keyPair.getPublicKey());
    }

    public String exportPrivateKeyPKCS8ById(Long id) {
        var keyPair = keyPairDao.findById(id).orElseThrow(() -> new EntityNotFoundException("KeyPair", "id"));
        return exportPrivateKeyPKCS8(keyPair.getPrivateKey());
    }

    public String exportPublicKeyPKCS8ById(Long id) {
        var keyPair = keyPairDao.findById(id).orElseThrow(() -> new EntityNotFoundException("KeyPair", "id"));
        return exportPublicKeyX509(keyPair.getPublicKey());
    }

    private String exportSignature(String signature) {
        return "-----BEGIN SIGNATURE-----\n" + signature + "\n-----END SIGNATURE-----";
    }

    private String exportPrivateKeyPKCS8(String privateKey) {
        return "-----BEGIN PRIVATE KEY-----\n" + privateKey + "\n-----END PRIVATE KEY-----";
    }

    private String exportPublicKeyX509(String publicKey) {
        return "-----BEGIN PUBLIC KEY-----\n" + publicKey + "\n-----END PUBLIC KEY-----";
    }

}
