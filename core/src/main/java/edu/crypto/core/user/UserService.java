package edu.crypto.core.user;

import edu.crypto.data.user.dao.CryptoUserDao;
import edu.crypto.data.user.domain.CryptoUser;
import edu.crypto.core.validation.EntityAlreadyExistException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;

    private final CryptoUserDao userDao;

    public UserService(PasswordEncoder passwordEncoder, CryptoUserDao userDao) {
        this.passwordEncoder = passwordEncoder;
        this.userDao = userDao;
    }

    public void saveUser(SaveUserRequest request) throws EntityAlreadyExistException {
        String email = request.email();
        String username = request.username();
        String password = request.password();

        if (userDao.existsByEmail(email))
            throw new EntityAlreadyExistException("User", "email");

        if (userDao.existsByUsername(username))
            throw new EntityAlreadyExistException("User", "username");

        CryptoUser jcaUser = new CryptoUser();
        jcaUser.setEmail(request.email());
        jcaUser.setUsername(request.username());
        jcaUser.setPassword(passwordEncoder.encode(password));
        this.userDao.save(jcaUser);
    }

}
