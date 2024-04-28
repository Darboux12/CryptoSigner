package edu.crypto.core.user;

import edu.crypto.data.role.domain.Role;
import edu.crypto.data.user.domain.CryptoUser;

import java.util.Set;
import java.util.stream.Collectors;

public class UserMapper {

    public static UserResponse mapCryptoUserToResponse(CryptoUser user) {
        return UserResponse
                .builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(mapCryptoRoleToRole(user.getRoles()))
                .build();
    }

    private static Set<String> mapCryptoRoleToRole(Set<Role> roles) {
        return roles.stream().map(Role::getName).collect(Collectors.toSet());
    }

}
