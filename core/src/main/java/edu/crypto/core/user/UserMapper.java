package edu.crypto.core.user;

import edu.crypto.core.signature.mapper.SignatureMapper;
import edu.crypto.data.role.domain.Role;
import edu.crypto.data.signature.domain.CryptoKeyPair;
import edu.crypto.data.user.domain.CryptoUser;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

public class UserMapper {

    public static UserResponse mapCryptoUserToResponse(CryptoUser user) {
        return UserResponse
                .builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .cryptoKeyPairDtos(SignatureMapper.mapKeyPairToDtos(user.getKeyPairs()))
                .cryptoSignatureDtos(
                        user.getKeyPairs().stream()
                                .map(CryptoKeyPair::getSignatures)
                                .flatMap(Collection::stream)
                                .map(SignatureMapper::mapSignatureToDto)
                                .collect(Collectors.toSet())
                )
                .roles(mapCryptoRoleToRole(user.getRoles()))
                .build();
    }

    private static Set<String> mapCryptoRoleToRole(Set<Role> roles) {
        return roles.stream().map(Role::getName).collect(Collectors.toSet());
    }

}
