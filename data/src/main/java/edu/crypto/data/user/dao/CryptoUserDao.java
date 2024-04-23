package edu.crypto.data.user.dao;

import edu.crypto.data.user.domain.CryptoUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CryptoUserDao extends JpaRepository<CryptoUser, Long> {

    Optional<CryptoUser> findByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);
}
