package edu.crypto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class CryptoSigner {
    public static void main(String[] args) {
        SpringApplication.run(CryptoSigner.class, args);
    }
}
