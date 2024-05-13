package edu.crypto.api.signature.controller;

import edu.crypto.api.signature.dto.ApiKeyGenerationRequest;
import edu.crypto.core.security.util.JwtTokenUtil;
import edu.crypto.core.signature.common.KeyGenerationStartDto;
import edu.crypto.core.signature.model.common.ECCurveType;
import edu.crypto.core.signature.model.dto.KeyGenerationRequest;
import edu.crypto.core.signature.model.dto.CryptoKeyPairDto;
import edu.crypto.core.signature.service.SignatureService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/signer/key/")
public class CryptoKeyController {

    private final SignatureService signatureService;
    private final JwtTokenUtil jwtTokenUtil;

    public CryptoKeyController(SignatureService signatureService, JwtTokenUtil jwtTokenUtil) {
        this.signatureService = signatureService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("generate")
    public ResponseEntity<KeyGenerationStartDto> generateKey(@Validated @RequestBody ApiKeyGenerationRequest request, HttpServletRequest httpServletRequest) throws Exception {
        String token = jwtTokenUtil.getTokenFromCookie(httpServletRequest);
        String author = jwtTokenUtil.getUsernameFromToken(token);
        var response = signatureService.generateKeyPair(mapApiKeyToServiceRequest(request), author);
        return ResponseEntity.ok(response);
    }

    @GetMapping("find")
    public ResponseEntity<CryptoKeyPairDto> getKeyPairByAlias(@RequestParam("alias") String alias) {
        var response = signatureService.findKeyPairByAlias(alias);
        return ResponseEntity.ok(response);
    }

    @GetMapping("find/id")
    public ResponseEntity<CryptoKeyPairDto> getKeyPairById(@RequestParam("id") Long id) {
        var response = signatureService.findKeyPairById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("generate/state/id")
    public ResponseEntity<String> getGenerateKeyStateId(@RequestParam("id") Long id) {
        var response = signatureService.findKeyPairGenerationStateById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("generate/state")
    public ResponseEntity<String> getGenerateKeyStateAlias(@RequestParam("alias") String alias) {
        var response = signatureService.findKeyPairGenerationStateByAlias(alias);
        return ResponseEntity.ok(response);
    }

    @GetMapping("find/curve")
    public ResponseEntity<Set<String>> getAllCurveTypes() {
        var response = signatureService.findAllCurveType();
        return ResponseEntity.ok(response);
    }

    @GetMapping("exist/alias")
    public ResponseEntity<Boolean> existKeyByAlias(@RequestParam("alias") String alias) {
        var response = signatureService.existKeyByAlias(alias);
        return ResponseEntity.ok(response);
    }

    private KeyGenerationRequest mapApiKeyToServiceRequest(ApiKeyGenerationRequest request) {
        return KeyGenerationRequest
                .builder()
                .keyAlias(request.alias())
                .curveType(ECCurveType.valueOf(request.curveType()))
                .build();
    }

    @DeleteMapping("delete/alias")
    public ResponseEntity<String> deleteKeyPairByAlias(@RequestParam("alias") String alias) {
        signatureService.deleteKeyPairByAlias(alias);
        return ResponseEntity.ok("Key Pair successfully deleted");
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> deleteKeyPairById(@RequestParam("id") Long id) {
        signatureService.deleteKeyPairById(id);
        return ResponseEntity.ok("Key Pair successfully deleted");
    }

}
