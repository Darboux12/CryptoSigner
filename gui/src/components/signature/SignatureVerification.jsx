import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Image, Spinner, Alert, FormControl } from 'react-bootstrap';
import VerificationImage from "../../assets/Vulnerability.webp";
import './SignatureVerification.css';
import { sendVerificationRequest } from "../api/apiService";

const SignatureVerification = () => {
    const serverURL = 'http://localhost:8080';

    const [file, setFile] = useState(null);
    const [publicKey, setPublicKey] = useState('');
    const [publicKeyFile, setPublicKeyFile] = useState(null);
    const [signature, setSignature] = useState('');
    const [signatureFile, setSignatureFile] = useState(null);
    const [inputPublicKeyType, setInputPublicKeyType] = useState('text'); // 'text' or 'file'
    const [inputSignatureType, setInputSignatureType] = useState('text'); // 'text' or 'file'
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [verifySuccess, setVerifySuccess] = useState(false);
    const [verifyError, setVerifyError] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handlePublicKeyFileChange = (event) => {
        setPublicKeyFile(event.target.files[0]);
    };

    const handleSignatureFileChange = (event) => {
        setSignatureFile(event.target.files[0]);
    };

    const handlePublicKeyInput = (event) => {
        setPublicKey(event.target.value);
    };

    const handleSignatureInput = (event) => {
        setSignature(event.target.value);
    };

    const fileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
    });

    const handleVerifySignature = async () => {
        if (isSubmitting || !file || !(publicKey || publicKeyFile) || !(signature || signatureFile)) {
            return;
        }

        setIsSubmitting(true);
        setVerifyError('');

        try {
            const encodedFile = await fileToBase64(file);
            const publicKeyToSend = inputPublicKeyType === 'file' && publicKeyFile ? await fileToBase64(publicKeyFile) : publicKey;
            const signatureToSend = inputSignatureType === 'file' && signatureFile ? await fileToBase64(signatureFile) : signature;

            const data = {
                fileName: file.name,
                data: encodedFile,
                publicKey: publicKeyToSend,
                signature: signatureToSend
            };

            const result = await sendVerificationRequest(data);
            if (result) {
                setVerifySuccess(true);
                setTimeout(() => {
                    setVerifySuccess(false);
                }, 2000);
            } else {
                setVerifyError("Verification failed: The file is corrupted.");
            }
        } catch (error) {
            setVerifyError("Verification failed: Invalid signature or key format");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container fluid className="verification-container">
            <Row className="my-4 justify-content-center">
                <Col xs={12} sm={10} md={7} lg={6}>
                    <Form className="w-100 p-3">
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-4">Upload File to Verify:</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>
                        <Form.Group className="mb-4 fs-4">
                            <Form.Label className="fs-4">Public Key Input Method:</Form.Label>
                            <Form.Check
                                type="radio"
                                label="Enter Public Key as Text"
                                name="publicKeyMethod"
                                id="textMethodPK"
                                onChange={() => setInputPublicKeyType('text')}
                                checked={inputPublicKeyType === 'text'}
                            />
                            <Form.Check
                                type="radio"
                                label="Upload Public Key File (.PEM)"
                                name="publicKeyMethod"
                                id="fileMethodPK"
                                onChange={() => setInputPublicKeyType('file')}
                                checked={inputPublicKeyType === 'file'}
                            />
                        </Form.Group>
                        {inputPublicKeyType === 'text' && (
                            <Form.Group className="mb-4">
                                <Form.Label className="fs-4">Enter Public Key:</Form.Label>
                                <FormControl as="textarea" value={publicKey} onChange={handlePublicKeyInput} />
                            </Form.Group>
                        )}
                        {inputPublicKeyType === 'file' && (
                            <Form.Group className="mb-4">
                                <Form.Label className="fs-4">Upload Public Key File:</Form.Label>
                                <Form.Control type="file" onChange={handlePublicKeyFileChange} />
                            </Form.Group>
                        )}
                        <Form.Group className="mb-4 fs-4">
                            <Form.Label className="fs-4">Signature Input Method:</Form.Label>
                            <Form.Check
                                type="radio"
                                label="Enter Signature as Text"
                                name="signatureMethod"
                                id="textMethodSig"
                                onChange={() => setInputSignatureType('text')}
                                checked={inputSignatureType === 'text'}
                            />
                            <Form.Check
                                type="radio"
                                label="Upload Signature File (.PEM)"
                                name="signatureMethod"
                                id="fileMethodSig"
                                onChange={() => setInputSignatureType('file')}
                                checked={inputSignatureType === 'file'}
                            />
                        </Form.Group>
                        {inputSignatureType === 'text' && (
                            <Form.Group className="mb-4">
                                <Form.Label className="fs-4">Enter Signature:</Form.Label>
                                <FormControl as="textarea" value={signature} onChange={handleSignatureInput} />
                            </Form.Group>
                        )}
                        {inputSignatureType === 'file' && (
                            <Form.Group className="mb-4">
                                <Form.Label className="fs-4">Upload Signature File:</Form.Label>
                                <Form.Control type="file" onChange={handleSignatureFileChange} />
                            </Form.Group>
                        )}
                        <Button variant="success" className="w-100 fs-4" onClick={handleVerifySignature} disabled={isSubmitting || !file || !(publicKey || publicKeyFile) || !(signature || signatureFile)}>
                            Verify Signature
                        </Button>
                        {isSubmitting && <Spinner animation="border" />}
                        {verifySuccess && (
                            <Alert variant="success" className="mt-3">
                                Verification successful!
                            </Alert>
                        )}
                        {verifyError && (
                            <Alert variant="danger" className="mt-3">
                                {verifyError}
                            </Alert>
                        )}
                    </Form>
                </Col>
                <Col xs={12} md={5}>
                    <Image src={VerificationImage} alt="Signature Verification Visualization" fluid />
                </Col>
            </Row>
        </Container>
    );
};

export default SignatureVerification;
