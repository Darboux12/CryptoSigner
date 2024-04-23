package edu.crypto.core.signature.model.dto;

public enum ECCurveType {
    SECP256R1("secp256r1"),
    SECP384R1("secp384r1"),
    SECP521R1("secp521r1"),
    SECP256K1("secp256k1");

    private String curveName;

    ECCurveType(String curveName) {
        this.curveName = curveName;
    }

    public String getCurveName() {
        return this.curveName;
    }
}
