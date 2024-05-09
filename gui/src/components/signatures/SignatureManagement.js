import React, { useState } from 'react';
import axios from 'axios'

const SignatureManagement = () => {
    const [data, setData] = useState('');
    const [signature, setSignature] = useState('');
    const [verificationResult, setVerificationResult] = useState('');

    const signData = async () => {
        try {
            const response = await axios.post('http://localhost:8080/signer/signature/sign', { data });
            setSignature(response.data.signature);
        } catch (error) {
            console.error('Error signing data:', error);
        }
    };

    const verifySignature = async () => {
        try {
            const response = await axios.post('http://localhost:8080/signer/signature/verify', {
                data, 
                signature
            });
            setVerificationResult(response.data ? "Signature is valid" : "Signature is invalid");
        } catch (error) {
            console.error('Error verifying signature:', error);
        }
    };

    return (
        <div>
            <h2>Signature Management</h2>
            <textarea 
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="Enter data to sign"
                rows="4"
            />
            <button onClick={signData}>Sign Data</button>
            <button onClick={verifySignature}>Verify Signature</button>
            {signature && <div><strong>Generated Signature:</strong> <code>{signature}</code></div>}
            {verificationResult && <div><strong>Verification Result:</strong> {verificationResult}</div>}
        </div>
    );
};

export default SignatureManagement;
