import React, { useState } from 'react';
import { signData, verifySignature } from '../../services/ApiService';  

const SignatureManagement = () => {
    const [data, setData] = useState('');
    const [signature, setSignature] = useState('');
    const [verificationResult, setVerificationResult] = useState('');

    const handleSignData = async () => {
        try {
            const response = await signData({ data });
            setSignature(response.signature);
        } catch (error) {
            console.error('Error signing data:', error);
        }
    };

    const handleVerifySignature = async () => {
        try {
            const response = await verifySignature({ data, signature });
            setVerificationResult(response ? "Signature is valid" : "Signature is invalid");
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
            <button onClick={handleSignData}>Sign Data</button>
            <button onClick={handleVerifySignature}>Verify Signature</button>
            {signature && <div><strong>Generated Signature:</strong> <code>{signature}</code></div>}
            {verificationResult && <div><strong>Verification Result:</strong> {verificationResult}</div>}
        </div>
    );
};

export default SignatureManagement;
