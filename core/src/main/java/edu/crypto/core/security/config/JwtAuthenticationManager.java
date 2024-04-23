package edu.crypto.core.security.config;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationManager {

    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        this.authenticationManager = authenticationConfiguration.getAuthenticationManager();
    }


    public AuthenticationManager getAuthenticationManager() {
        return authenticationManager;
    }
}
