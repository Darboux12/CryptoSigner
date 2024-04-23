package edu.crypto.core.signature.listener;

import edu.crypto.core.signature.service.ECDSAService;
import edu.crypto.data.common.State;
import edu.crypto.data.signature.dao.CryptoKeyPairDao;
import edu.crypto.core.signature.model.event.KeyGenerationEvent;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Base64;


@AllArgsConstructor
@Component
@Transactional
public class KeyGenerationEventListener {

    private CryptoKeyPairDao keyPairDao;
    private ECDSAService ecdsaService;

    private String mapPublicKeyToSafeString(PublicKey publicKey) {
        return Base64.getEncoder().encodeToString(publicKey.getEncoded());
    }

    private String mapPrivateKeyToSafeString(PrivateKey privateKey) {
        return Base64.getEncoder().encodeToString(privateKey.getEncoded());
    }

    @Async("singleThreadTaskExecutor")
    @EventListener
    public void handleVulnerabilityBenchmarkRequest(KeyGenerationEvent event) throws Exception {
        var request = event.getRequest();
        var keyPair = keyPairDao.getReferenceById(event.getKeyPairId());
        var ecdsaKeyPair = ecdsaService.generateKeyPair(request.curveType());

        keyPair.setState(State.IN_GENERATION);
        keyPairDao.save(keyPair);
        keyPair.setPublicKey(mapPublicKeyToSafeString(ecdsaKeyPair.getPublic()));
        keyPair.setPrivateKey(mapPrivateKeyToSafeString(ecdsaKeyPair.getPrivate()));
        keyPair.setState(State.GENERATED);
        keyPairDao.save(keyPair);
        keyPairDao.save(keyPair);
    }
}
