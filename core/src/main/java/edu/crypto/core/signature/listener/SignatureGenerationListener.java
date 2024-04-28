package edu.crypto.core.signature.listener;

import edu.crypto.core.signature.mapper.SignatureMapper;
import edu.crypto.core.signature.model.event.SignatureGenerationEvent;
import edu.crypto.core.signature.service.ECDSAService;
import edu.crypto.data.common.State;
import edu.crypto.data.signature.dao.CryptoSignatureDao;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Component
@Transactional
public class SignatureGenerationListener {

    private CryptoSignatureDao cryptoSignatureDao;
    private ECDSAService ecdsaService;

    @Async("singleThreadTaskExecutor")
    @EventListener
    public void handleSignatureGenerationRequest(SignatureGenerationEvent event) throws Exception {
        var request = event.getRequest();
        var cryptoSignature =  cryptoSignatureDao.getReferenceById(event.getSignatureId());
        cryptoSignature.setState(State.IN_GENERATION);

        byte[] signature = ecdsaService.signData(request.data(), request.privateKey());
        String signatureEnc = SignatureMapper.mapSignatureToSafeString(signature);

        cryptoSignature.setSignature(signatureEnc);
        cryptoSignatureDao.save(cryptoSignature);
        cryptoSignature.setState(State.GENERATED);
        cryptoSignatureDao.save(cryptoSignature);
    }
}
