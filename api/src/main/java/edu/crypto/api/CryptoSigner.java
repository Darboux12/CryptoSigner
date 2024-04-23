package edu.crypto.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication(scanBasePackages = {"edu.crypto"})
@EnableAsync
public class CryptoSigner {
    public static void main(String[] args) {
        SpringApplication.run(CryptoSigner.class, args);
    }
}
