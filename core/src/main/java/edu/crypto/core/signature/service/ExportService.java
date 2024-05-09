package edu.crypto.core.signature.service;

import edu.crypto.core.validation.EntityNotFoundException;
import edu.crypto.data.signature.dao.CryptoKeyPairDao;
import org.springframework.stereotype.Service;

@Service
public class ExportService {

    private final CryptoKeyPairDao keyPairDao;

    public ExportService(CryptoKeyPairDao keyPairDao) {
        this.keyPairDao = keyPairDao;
    }

    public String exportPrivateKeyPKCS8ByAlias(String alias) {
        var keyPair = keyPairDao.findByAlias(alias).orElseThrow(() -> new EntityNotFoundException("KeyPair", "alias"));
        return exportPrivateKeyPKCS8(keyPair.getPrivateKey());



    }

    public String exportPublicKeyPKCS8ByAlias(String alias) {
        var keyPair = keyPairDao.findByAlias(alias).orElseThrow(() -> new EntityNotFoundException("KeyPair", "alias"));
        return exportPublicKeyX509(keyPair.getPublicKey());



    }

    private String exportPrivateKeyPKCS8(String privateKey) {
        return "-----BEGIN PRIVATE KEY-----\n" + privateKey + "\n-----END PRIVATE KEY-----";
    }

    private String exportPublicKeyX509(String publicKey) {
        return "-----BEGIN PUBLIC KEY-----\n" + publicKey + "\n-----END PUBLIC KEY-----";
    }

}
