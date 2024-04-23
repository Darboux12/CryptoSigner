package edu.crypto.data.signature.dao;

import edu.crypto.data.signature.domain.CryptoSignature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CryptoSignatureDao extends JpaRepository<CryptoSignature, Long>  {
}
