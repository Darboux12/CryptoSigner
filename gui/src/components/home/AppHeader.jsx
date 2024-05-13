// AppHeader.js
import React from 'react';

const AppHeader = () => {

    const headerStyle = {
        fontWeight: "bold",
        color: '#fff',
        backgroundColor: 'black',
        padding: '20px',
        textAlign: 'center',
        fontSize: '2em'
    };

    const descriptionStyle = {
        fontWeight: "normal",
        color: "#ccc",
        marginTop: '20px',
        fontSize: '0.5em'
    };

    return (
        <div style={headerStyle}>
                <span style={{ color: 'white' }}>Looking for</span> for <span style={{ color: '#20c997' }}>Key Management Tool</span>? Discover the <span style={{ color: 'white' }}>Power</span> of <span style={{ color: '#e83e8c' }}>CryptoSigner</span>!
            <p style={descriptionStyle}>
                Introducing <strong>Crypto Signer</strong> - toolkit designed specifically for managing ECDSA keys and signatures. This streamlined application simplifies the creation and verification of ECDSA key pairs and signatures, allowing you to delve into the nuances of data authenticity and security with ease. Ideal for developers, security analysts, and encryption aficionados, ECDSA Essentials Toolkit provides a comprehensive platform to test, analyze, and secure your digital communications. Whether you're enhancing security protocols or exploring cryptographic principles, this tool empowers you to handle ECDSA operations with precision and innovation. Embark on your cryptographic endeavors and master the art of secure digital signatures in ECDSA today.
            </p>
        </div>
    );
};

export default AppHeader;
