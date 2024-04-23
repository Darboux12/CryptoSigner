package edu.crypto.api.user.mapper;

import edu.crypto.data.role.domain.Role;
import edu.crypto.core.user.SaveUserRequest;
import edu.crypto.core.user.UserResponse;
import edu.crypto.data.user.domain.CryptoUser;
import edu.crypto.api.user.model.SignUpRequest;

import java.util.Set;
import java.util.stream.Collectors;

public class UserMapper {

    public static SaveUserRequest mapSignUpToSaveUserRequest(SignUpRequest signUpRequest) {
        return SaveUserRequest
                .builder()
                .email(signUpRequest.email())
                .username(signUpRequest.username())
                .password(signUpRequest.password())
                .build();
    }

    public static UserResponse mapJcaUserToResponse(CryptoUser user) {

        return UserResponse
                .builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(mapJcaRoleToRole(user.getRoles()))
                .build();

    }

    private static Set<String> mapJcaRoleToRole(Set<Role> roles) {
        return roles.stream().map(Role::getName).collect(Collectors.toSet());
    }




}
