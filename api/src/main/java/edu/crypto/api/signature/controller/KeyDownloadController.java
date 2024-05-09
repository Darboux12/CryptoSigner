package edu.crypto.api.signature.controller;

import edu.crypto.core.signature.service.ExportService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.NoSuchAlgorithmException;

@RestController
@RequestMapping("/signer/key/")
public class KeyDownloadController {

    private final ExportService exportService;

    public KeyDownloadController(ExportService exportService) {
        this.exportService = exportService;
    }

    @GetMapping("/download/public")
    public ResponseEntity<ByteArrayResource> downloadPublicKey(@RequestParam("alias") String alias) throws NoSuchAlgorithmException {
        String publicKey = exportService.exportPublicKeyPKCS8ByAlias(alias);
        String header = "attachment; filename=\"" + alias + ".pem\"";
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .header(HttpHeaders.CONTENT_DISPOSITION, header )
            .body(new ByteArrayResource(publicKey.getBytes()));
    }

    @GetMapping("/download/private")
    public ResponseEntity<ByteArrayResource> downloadPrivateKey(@RequestParam("alias") String alias) throws NoSuchAlgorithmException {
        String privateKey = exportService.exportPrivateKeyPKCS8ByAlias(alias);
        String header = "attachment; filename=\"" + alias + ".pem\"";
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .header(HttpHeaders.CONTENT_DISPOSITION, header)
            .body(new ByteArrayResource(privateKey.getBytes()));
    }
}
