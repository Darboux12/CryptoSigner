package edu.crypto.core.signature.model.event;

import edu.crypto.core.signature.model.dto.SignatureGenerationRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignatureGenerationEvent {
    private Long signatureId;
    private SignatureGenerationRequest request;
}
