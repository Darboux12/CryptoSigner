package edu.crypto.api.user.controller;

import edu.crypto.api.user.mapper.UserMapper;
import edu.crypto.api.user.model.SignUpRequest;
import edu.crypto.api.user.model.SignUpResponse;
import edu.crypto.core.security.util.JwtTokenUtil;
import edu.crypto.core.user.UserQueryService;
import edu.crypto.core.user.UserResponse;
import edu.crypto.core.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/signer/user/")
public class UserController {

    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserQueryService userQueryService;

    public UserController(UserService userService, JwtTokenUtil jwtTokenUtil, UserQueryService userQueryService) {
        this.userService = userService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userQueryService = userQueryService;
    }

    @PostMapping("sign")
    public ResponseEntity<SignUpResponse> signUp(@Validated @RequestBody SignUpRequest request) {
        userService.saveUser(UserMapper.mapSignUpToSaveUserRequest(request));
        return ResponseEntity.ok(new SignUpResponse(HttpStatus.OK,"User has been added"));
    }

    @GetMapping("username")
    public ResponseEntity<UserResponse> getUserFromToken(HttpServletRequest request) {
        String token = jwtTokenUtil.getTokenFromCookie(request);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        return ResponseEntity.ok(userQueryService.findUserByUsername(username));
    }

    @GetMapping("test")
    public ResponseEntity<String> test(@RequestParam Long id, HttpServletRequest request) {
        String token = jwtTokenUtil.getTokenFromCookie(request);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        return ResponseEntity.ok(username);
    }


}
