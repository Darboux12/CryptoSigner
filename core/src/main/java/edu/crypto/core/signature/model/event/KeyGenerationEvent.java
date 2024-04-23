package edu.crypto.core.signature.model.event;

import edu.crypto.core.signature.model.dto.KeyGenerationRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class KeyGenerationEvent {
    private Long keyPairId;
    private KeyGenerationRequest request;
}
