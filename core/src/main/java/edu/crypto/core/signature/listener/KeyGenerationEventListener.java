package edu.crypto.core.signature.listener;

import edu.crypto.core.signature.mapper.SignatureMapper;
import edu.crypto.core.signature.model.event.KeyGenerationEvent;
import edu.crypto.core.signature.service.ECDSAService;
import edu.crypto.data.common.State;
import edu.crypto.data.signature.dao.CryptoKeyPairDao;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


@AllArgsConstructor
@Component
@Transactional
public class KeyGenerationEventListener {

    private CryptoKeyPairDao keyPairDao;
    private ECDSAService ecdsaService;

    @Async("singleThreadTaskExecutor")
    @EventListener
    public void handleKeyGenerationRequest(KeyGenerationEvent event) throws Exception {
        var request = event.getRequest();
        var keyPair = keyPairDao.getReferenceById(event.getKeyPairId());
        var ecdsaKeyPair = ecdsaService.generateKeyPair(request.curveType());

        keyPair.setState(State.IN_GENERATION);
        keyPairDao.save(keyPair);
        keyPair.setPublicKey(SignatureMapper.mapPublicKeyToSafeString(ecdsaKeyPair.getPublic()));
        keyPair.setPrivateKey(SignatureMapper.mapPrivateKeyToSafeString(ecdsaKeyPair.getPrivate()));
        keyPairDao.save(keyPair);
        keyPair.setState(State.GENERATED);
        keyPairDao.save(keyPair);
    }
}
