package edu.crypto.data.signature.dao;

import edu.crypto.data.signature.domain.CryptoSignature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CryptoSignatureDao extends JpaRepository<CryptoSignature, Long>  {

    Optional<CryptoSignature> findByAlias(String alias);

    boolean existsByAlias(String alias);

}
