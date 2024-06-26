package edu.crypto.core.signature.service;

import edu.crypto.core.signature.mapper.SignatureMapper;
import edu.crypto.core.signature.model.common.ECCurveType;
import org.springframework.stereotype.Service;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.spec.ECGenParameterSpec;

@Service
public class ECDSAService {

    public KeyPair generateKeyPair(ECCurveType curveType) throws Exception {
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("EC", "SunEC");
        ECGenParameterSpec ecSpec = new ECGenParameterSpec(curveType.getCurveName());
        keyGen.initialize(ecSpec);
        return keyGen.generateKeyPair();
    }

    public byte[] signData(byte[] data, PrivateKey privateKey) throws Exception {
        Signature signature = Signature.getInstance("SHA256withECDSA");
        signature.initSign(privateKey);
        signature.update(data);
        return signature.sign();
    }

    public boolean verifySignature(byte[] data, byte[] signatureBytes, PublicKey publicKey) throws Exception {
        Signature signature = Signature.getInstance("SHA256withECDSA");
        signature.initVerify(publicKey);
        signature.update(data);
        return signature.verify(signatureBytes);
    }

    public static void main(String[] args) {

        try {
            ECDSAService generator = new ECDSAService();
            KeyPair keyPair = generator.generateKeyPair(ECCurveType.SECP256R1);

            String token = SignatureMapper.mapPrivateKeyToSafeString(keyPair.getPrivate());
            PrivateKey privateKey = SignatureMapper.mapSafeStringToPrivateKey(token);

            String token2 = SignatureMapper.mapPublicKeyToSafeString(keyPair.getPublic());
            PublicKey publicKey = SignatureMapper.mapSafeStringToPublicKey(token2);


            // Przykładowe dane do podpisania
            String message = "Test message";
            byte[] messageBytes = message.getBytes();

            // Podpisywanie danych
            byte[] signature = generator.signData(messageBytes, privateKey);
            System.out.println("Signature: " + java.util.Base64.getEncoder().encodeToString(signature));

            // Weryfikacja podpisu
            boolean isCorrect = generator.verifySignature("Test messsage".getBytes(), signature, publicKey);
            System.out.println("Signature verified: " + isCorrect);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
