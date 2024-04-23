package edu.crypto.core.user;

import edu.crypto.data.user.dao.CryptoUserDao;
import edu.crypto.data.user.domain.CryptoUser;
import edu.crypto.core.validation.EntityNotFoundException;
import org.springframework.stereotype.Service;

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
        return UserMapper.mapJcaUserToResponse(user);
    }
}
