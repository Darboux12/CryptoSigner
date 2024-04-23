package edu.crypto.api.security;

import edu.crypto.core.security.config.JwtAuthenticationManager;
import edu.crypto.core.security.service.JwtUserDetailsService;
import edu.crypto.core.security.util.JwtTokenUtil;
import edu.crypto.api.user.model.SignUpResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/signer/")
public class JwtAuthenticationController {

    private final JwtAuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;

    private final JwtUserDetailsService userDetailsService;

    public JwtAuthenticationController(JwtAuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, JwtUserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
    }

    @RequestMapping(value = "authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        ResponseCookie httpOnlyCookie = ResponseCookie.from("AuthToken", token)
                .httpOnly(true)
                .path("/")
                .maxAge(60 * 60 * 24)
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, httpOnlyCookie.toString())
                .body(new SignUpResponse(HttpStatus.OK, "User logged in successfully"));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
