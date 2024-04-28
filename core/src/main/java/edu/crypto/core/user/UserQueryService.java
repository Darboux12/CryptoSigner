package edu.crypto.core.user;

import edu.crypto.core.signature.mapper.SignatureMapper;
import edu.crypto.core.signature.model.dto.CryptoSignatureDto;
import edu.crypto.core.validation.EntityNotFoundException;
import edu.crypto.data.signature.domain.CryptoKeyPair;
import edu.crypto.data.user.dao.CryptoUserDao;
import edu.crypto.data.user.domain.CryptoUser;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class UserQueryService {

    private final CryptoUserDao userDao;

    public UserQueryService(CryptoUserDao userDao) {
        this.userDao = userDao;
    }

    public UserResponse findUserByUsername(String username) throws EntityNotFoundException {
        CryptoUser user = userDao
                .findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User", "username"));
        return UserMapper.mapCryptoUserToResponse(user);
    }

    public Iterable<CryptoSignatureDto> findUserAllSignatures(String username) {
        return userDao
                .findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User", "username"))
                .getKeyPairs()
                .stream()
                .map(CryptoKeyPair::getSignatures)
                .flatMap(Collection::stream)
                .map(SignatureMapper::mapSignatureToDto)
                .collect(Collectors.toList());
    }
}
