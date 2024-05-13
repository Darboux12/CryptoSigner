package edu.crypto.data.signature.domain;

import edu.crypto.data.common.State;
import edu.crypto.data.user.domain.CryptoUser;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "crypto_keypair")
@NoArgsConstructor
public class CryptoKeyPair {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "generation_date", nullable = false)
    private LocalDateTime generationDate = LocalDateTime.now();

    @Column(nullable = false, unique = true)
    private String alias;

    @Column()
    private String publicKey;

    @Column()
    private String privateKey;

    @OneToMany(mappedBy="keyPair", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<CryptoSignature> signatures = new HashSet<>();

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @NotEmpty
    private State state = State.INITIALIZE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private CryptoUser author;

    public void addSignature(CryptoSignature signature) {
        getSignatures().add(signature);
        signature.setKeyPair(this);
    }

}
