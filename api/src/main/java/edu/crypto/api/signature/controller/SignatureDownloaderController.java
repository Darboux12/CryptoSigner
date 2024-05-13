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
@RequestMapping("/signer/signature/")
public class SignatureDownloaderController {

    private final ExportService exportService;

    public SignatureDownloaderController(ExportService exportService) {
        this.exportService = exportService;
    }

    @GetMapping("/download")
    public ResponseEntity<ByteArrayResource> downloadSignatureByAlias(@RequestParam("alias") String alias) throws NoSuchAlgorithmException {
        String signature = exportService.exportSignatureByAlias(alias);
        String header = "attachment; filename=\"" + alias + ".pem\"";
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, header )
                .body(new ByteArrayResource(signature.getBytes()));
    }

}
