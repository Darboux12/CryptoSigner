import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, FormControl, Image, Row, Spinner } from 'react-bootstrap';
import SignatureImage from "../../assets/Vulnerability.webp";
import './SignatureGeneration.css';
import { sendSignatureRequest } from "../api/apiService";

const SignatureGeneration = () => {
    const serverURL = 'http://localhost:8080';

    const [alias, setAlias] = useState('');
    const [file, setFile] = useState(null);
    const [privateKey, setPrivateKey] = useState('');
    const [privateKeyFile, setPrivateKeyFile] = useState(null);
    const [inputType, setInputType] = useState('text'); // 'text' or 'file'
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [aliasExists, setAliasExists] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [fileError, setFileError] = useState('');
    const [keyError, setKeyError] = useState('');

    useEffect(() => {
        checkAliasExists(alias);
    }, [alias]);

    const checkAliasExists = async (alias) => {
        if (!alias) return;
        const response = await fetch(`${serverURL}/signer/signature/exist/alias?alias=${alias}`, {
            method: 'GET',
            credentials: 'include',
        });
        const exists = await response.json();
        setAliasExists(exists);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size > 5000000) {
            setFileError('File size should not exceed 5MB');
            setFile(null);
        } else {
            setFileError('');
            setFile(file);
        }
    };

    const handlePrivateKeyFileChange = (event) => {
        const file = event.target.files[0];
        setPrivateKeyFile(file);
    };

    const handlePrivateKeyInput = (event) => {
        setPrivateKey(event.target.value);
    };

    const extractKeyFromPem = async (file) => {
        const readFileAsText = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (event) => {
                    resolve(event.target.result);
                };

                reader.onerror = (error) => {
                    reject(error);
                };

                reader.readAsText(file);
            });
        };

        const extractKey = (pemContent) => {
            const publicKeyHeader = '-----BEGIN PUBLIC KEY-----';
            const publicKeyFooter = '-----END PUBLIC KEY-----';
            const privateKeyHeader = '-----BEGIN PRIVATE KEY-----';
            const privateKeyFooter = '-----END PRIVATE KEY-----';

            let start, end;

            if (pemContent.includes(publicKeyHeader)) {
                throw new Error('The provided PEM file contains a public key instead of a private key.');
            } else if (pemContent.includes(privateKeyHeader)) {
                start = pemContent.indexOf(privateKeyHeader) + privateKeyHeader.length;
                end = pemContent.indexOf(privateKeyFooter, start);
            } else {
                throw new Error('Invalid PEM file format');
            }

            const key = pemContent.substring(start, end).replace(/\s+/g, '');
            return key;
        };

        try {
            const pemContent = await readFileAsText(file);
            return extractKey(pemContent);
        } catch (error) {
            throw new Error('Error reading or extracting key from file: ' + error.message);
        }
    };

    const fileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = (error) => reject(error);
    });

    const handleGenerateSignature = async () => {
        if (isSubmitting || fileError) return;

        setIsSubmitting(true);
        await checkAliasExists(alias);

        if (aliasExists) {
            setIsSubmitting(false);
            return;
        }

        try {
            const encodedFile = await fileToBase64(file);
            let privateKeyToSend;

            if (inputType === 'file' && privateKeyFile) {
                try {
                    privateKeyToSend = await extractKeyFromPem(privateKeyFile);
                    setKeyError(''); // Clear any previous key error
                } catch (error) {
                    setKeyError(error.message);
                    setIsSubmitting(false);
                    return;
                }
            } else {
                privateKeyToSend = privateKey;
            }

            const data = {
                fileName: file.name,
                data: encodedFile,
                signatureAlias: alias,
                privateKey: privateKeyToSend
            };

            const result = await sendSignatureRequest(data);
            console.log("Signature result:", result);
            setSubmitSuccess(true);
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 2000);
        } catch (error) {
            console.error("Signature generation failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container fluid className="signature-container">
            <Row className="my-4 justify-content-center">
                <Col xs={12} sm={10} md={7} lg={6}>
                    <Form className="w-100 p-3">
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-4">Enter Alias for Signature:</Form.Label>
                            <Form.Control type="text" value={alias} onChange={(e) => setAlias(e.target.value)} />
                            {aliasExists && (
                                <Alert variant="danger" className="mt-2">
                                    An alias with this name already exists!
                                </Alert>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-4">Upload File:</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                            {fileError && (
                                <Alert variant="danger" className="mt-2">{fileError}</Alert>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-4 fs-4">
                            <Form.Label className="fs-4">Private Key Input Method:</Form.Label>
                            <Form.Check
                                type="radio"
                                label="Enter Private Key as Text"
                                name="privateKeyMethod"
                                id="textMethod"
                                onChange={() => setInputType('text')}
                                checked={inputType === 'text'}
                            />
                            <Form.Check
                                type="radio"
                                label="Upload Private Key File (.PEM)"
                                name="privateKeyMethod"
                                id="fileMethod"
                                onChange={() => setInputType('file')}
                                checked={inputType === 'file'}
                            />
                        </Form.Group>
                        {inputType === 'text' && (
                            <Form.Group className="mb-4">
                                <Form.Label className="fs-4">Enter Private Key:</Form.Label>
                                <FormControl as="textarea" value={privateKey} onChange={handlePrivateKeyInput} />
                            </Form.Group>
                        )}
                        {inputType === 'file' && (
                            <Form.Group className="mb-4">
                                <Form.Label className="fs-4">Upload Private Key File:</Form.Label>
                                <Form.Control type="file" onChange={handlePrivateKeyFileChange} />
                                {privateKeyFile && <Alert variant="success" className="mt-2">File: {privateKeyFile.name}</Alert>}
                            </Form.Group>
                        )}
                        {keyError && (
                            <Alert variant="danger" className="mt-2">{keyError}</Alert>
                        )}
                        <Button variant="success" className="w-100 fs-4" onClick={handleGenerateSignature} disabled={isSubmitting || !alias || !file || !(privateKey || privateKeyFile) || aliasExists}>
                            Generate Signature
                        </Button>
                        {isSubmitting && <Spinner animation="border" />}
                        {submitSuccess && (
                            <Alert variant="success" className="mt-3">
                                Signature generation successful!
                            </Alert>
                        )}
                    </Form>
                </Col>
                <Col xs={12} md={5}>
                    <Image src={SignatureImage} alt="Signature Generation Visualization" fluid />
                </Col>
            </Row>
        </Container>
    );
};

export default SignatureGeneration;
