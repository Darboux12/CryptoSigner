package edu.crypto.data.signature.dao;

import edu.crypto.data.signature.domain.CryptoKeyPair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CryptoKeyPairDao extends JpaRepository<CryptoKeyPair, Long>  {

    Optional<CryptoKeyPair> findByAlias(String alias);

    Optional<CryptoKeyPair> findByPrivateKey(String privateKey);

}
