package edu.crypto.core.security.service;

import edu.crypto.core.user.UserQueryService;
import edu.crypto.data.user.dao.CryptoUserDao;
import edu.crypto.data.user.domain.CryptoUser;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final UserQueryService userQueryService;
    private final CryptoUserDao userDao;

    public JwtUserDetailsService(UserQueryService userQueryService, CryptoUserDao userDao) {
        this.userQueryService = userQueryService;
        this.userDao = userDao;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        try {
            CryptoUser cryptoUser = this.userDao.findByUsername(username).orElseThrow();
            Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
            cryptoUser.getRoles().forEach(role -> grantedAuthorities.add(new SimpleGrantedAuthority(role.getName())));
            return new User(cryptoUser.getUsername(), cryptoUser.getPassword(),  grantedAuthorities);

        } catch (EntityNotFoundException e) {
            throw new RuntimeException(e);
        }

    }

}
