package edu.crypto.api.signature.controller;

import edu.crypto.api.signature.dto.ApiSignatureGenerationRequest;
import edu.crypto.api.signature.dto.ApiSignatureGenerationRequestText;
import edu.crypto.api.signature.dto.ApiSignatureVerificationRequest;
import edu.crypto.api.signature.dto.ApiSignatureVerificationRequestText;
import edu.crypto.core.security.util.JwtTokenUtil;
import edu.crypto.core.signature.common.SignatureGenerationStartDto;
import edu.crypto.core.signature.mapper.SignatureMapper;
import edu.crypto.core.signature.model.dto.CryptoSignatureDto;
import edu.crypto.core.signature.model.dto.SignatureGenerationRequest;
import edu.crypto.core.signature.model.dto.SignatureVerificationRequest;
import edu.crypto.core.signature.service.SignatureService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@RestController
@RequestMapping("/signer/signature/")
public class CryptoSignatureController {

    private final SignatureService signatureService;
    private final JwtTokenUtil jwtTokenUtil;

    public CryptoSignatureController(SignatureService signatureService, JwtTokenUtil jwtTokenUtil) {
        this.signatureService = signatureService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("sign")
    public ResponseEntity<SignatureGenerationStartDto> signDataFromByte(@Validated @RequestBody ApiSignatureGenerationRequest request, HttpServletRequest httpServletRequest) throws Exception {
        String token = jwtTokenUtil.getTokenFromCookie(httpServletRequest);
        var response = signatureService.signData(mapApiSignatureToServiceRequest(request));
        return ResponseEntity.ok(response);
    }

    @PostMapping("sign/text")
    public ResponseEntity<SignatureGenerationStartDto> signDataFromText(@Validated @RequestBody ApiSignatureGenerationRequestText request, HttpServletRequest httpServletRequest) throws Exception {
        String token = jwtTokenUtil.getTokenFromCookie(httpServletRequest);
        var response = signatureService.signData(mapApiSignatureToServiceRequestText(request));
        return ResponseEntity.ok(response);
    }

    @PostMapping("verify")
    public ResponseEntity<Boolean> verifyDataFromByte(@Validated @RequestBody ApiSignatureVerificationRequest request, HttpServletRequest httpServletRequest) throws Exception {
        String token = jwtTokenUtil.getTokenFromCookie(httpServletRequest);
        var response = signatureService.verifySignature(mapApiSignatureVerificationToServiceRequest(request));
        return ResponseEntity.ok(response);
    }

    @PostMapping("verify/text")
    public ResponseEntity<Boolean> verifyDataFromText(@Validated @RequestBody ApiSignatureVerificationRequestText request, HttpServletRequest httpServletRequest) throws Exception {
        String token = jwtTokenUtil.getTokenFromCookie(httpServletRequest);
        var response = signatureService.verifySignature(mapApiSignatureVerificationTextToServiceRequest(request));
        return ResponseEntity.ok(response);
    }

    @GetMapping("find")
    public ResponseEntity<CryptoSignatureDto> getSignatureByAlias(@RequestParam("alias") String alias) {
        var response = signatureService.findSignatureByAlias(alias);
        return ResponseEntity.ok(response);
    }

    @GetMapping("find/id")
    public ResponseEntity<CryptoSignatureDto> getSignatureById(@RequestParam("id") Long id) {
        var response = signatureService.findSignatureById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("generate/state/id")
    public ResponseEntity<String> getGenerateKeyStateId(@RequestParam("id") Long id) {
        var response = signatureService.findSignatureGenerationStateById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("generate/state")
    public ResponseEntity<String> getGenerateKeyStateAlias(@RequestParam("alias") String alias) {
        var response = signatureService.findSignatureGenerationStateByAlias(alias);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> deleteKeyPairById(@RequestParam("id") Long id) {
        signatureService.deleteSignatureById(id);
        return ResponseEntity.ok("Signature successfully deleted");
    }

    @GetMapping("exist/alias")
    public ResponseEntity<Boolean> existSignatureByAlias(@RequestParam("alias") String alias) {
        var response = signatureService.existSignatureByAlias(alias);
        return ResponseEntity.ok(response);
    }

    private SignatureGenerationRequest mapApiSignatureToServiceRequest(ApiSignatureGenerationRequest request) throws NoSuchAlgorithmException, InvalidKeySpecException {
        return SignatureGenerationRequest
                .builder()
                .fileName(request.fileName())
                .data(request.data())
                .signatureAlias(request.signatureAlias())
                .privateKey(SignatureMapper.mapSafeStringToPrivateKey(request.privateKey()))
                .build();
    }

    private SignatureGenerationRequest mapApiSignatureToServiceRequestText(ApiSignatureGenerationRequestText request) throws NoSuchAlgorithmException, InvalidKeySpecException {
        return SignatureGenerationRequest
                .builder()
                .fileName(request.fileName())
                .data(request.data().getBytes(StandardCharsets.UTF_8))
                .signatureAlias(request.signatureAlias())
                .privateKey(SignatureMapper.mapSafeStringToPrivateKey(request.privateKey()))
                .build();
    }

    private SignatureVerificationRequest mapApiSignatureVerificationToServiceRequest(ApiSignatureVerificationRequest request) throws NoSuchAlgorithmException, InvalidKeySpecException {
        return SignatureVerificationRequest
                .builder()
                .data(request.data())
                .signature(request.signature())
                .publicKey(request.publicKey())
                .build();
    }

    private SignatureVerificationRequest mapApiSignatureVerificationTextToServiceRequest(ApiSignatureVerificationRequestText request) throws NoSuchAlgorithmException, InvalidKeySpecException {
        return SignatureVerificationRequest
                .builder()
                .data(request.data().getBytes())
                .signature(request.signature())
                .publicKey(request.publicKey())
                .build();
    }
}
