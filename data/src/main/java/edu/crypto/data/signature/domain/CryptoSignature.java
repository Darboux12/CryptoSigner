package edu.crypto.data.signature.domain;

import edu.crypto.data.common.State;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "signature")
@NoArgsConstructor
public class CryptoSignature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "generation_date", nullable = false)
    private LocalDateTime generationDate = LocalDateTime.now();

    @Column(nullable = false)
    private String fileName;

    @Column
    private String signature;

    @Column(nullable = false)
    private String metadata;

    @Column(nullable = false)
    private String alias;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @NotEmpty
    private State state = State.INITIALIZE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crytokeypair_id", nullable = false)
    private CryptoKeyPair keyPair;

}
