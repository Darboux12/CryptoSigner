import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Image, Spinner, Alert, ButtonGroup } from 'react-bootstrap';
import KeyPairImage from "../../assets/Vulnerability.webp";
import './KeyGeneration.css';
import {sendKeyGenerationRequest, serverURL} from "../api/apiService";

const KeyGeneration = () => {

    const [alias, setAlias] = useState('');
    const [curveTypes, setCurveTypes] = useState([]);
    const [selectedCurveType, setSelectedCurveType] = useState('');

    const [isTesting, setIsTesting] = useState(false);
    const [testSuccess, setTestSuccess] = useState(false);
    const [keyExists, setKeyExists] = useState(false);

    useEffect(() => {
        fetchCurveTypes();
    }, []);

    const fetchCurveTypes = async () => {
        const response = await fetch(`${serverURL}/signer/key/find/curve`, {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        setCurveTypes(data);
    };

    const checkKeyExists = async () => {
        const response = await fetch(`${serverURL}/signer/key/exist/alias?alias=${alias}`, {
            method: 'GET',
            credentials: 'include',
        });
        const exists = await response.json();
        setKeyExists(exists);
    };

    const handleStartTest = async () => {
        if (isTesting) {
            // If already testing, don't allow another test
            return;
        }

        setIsTesting(true);  // Indicate that the test has started

        try {
            // Perform the key existence check right here and wait for it
            const response = await fetch(`${serverURL}/signer/key/exist/alias?alias=${alias}`, {
                method: 'GET',
                credentials: 'include',
            });
            const exists = await response.json();
            setKeyExists(exists);

            if (exists) {
                setIsTesting(false);
                return;
            }

            // If the key doesn't exist, proceed with the generation request
            const result = await sendKeyGenerationRequest(alias, selectedCurveType);
            console.log("Test result:", result);
            setTestSuccess(true);
            setTimeout(() => {
                setTestSuccess(false);
            }, 2000);  // Display success message for a short time
        } catch (error) {
            console.error("Test failed:", error);
        } finally {
            setIsTesting(false);  // Reset testing state after the process completes
        }
    };

    const handleAliasChange = (event) => {
        setAlias(event.target.value);
        setKeyExists(false);
    };

    const handleCurveTypeSelection = (type) => {
        setSelectedCurveType(type);
    };

    return (
        <Container fluid className="scanner-container">
            <Row className="my-4 justify-content-center">
                <Col xs={12} sm={10} md={7} lg={6} className="d-flex justify-content-center align-items-center">
                    <Form className="w-100 p-3">
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-4">Enter Alias for Key:</Form.Label>
                            <Form.Control type="text" value={alias} onChange={handleAliasChange} onBlur={checkKeyExists} />
                            {keyExists && (
                                <Alert variant="danger" className="mt-2">
                                    A key with this alias already exists!
                                </Alert>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="fs-4">Select Curve Type:</Form.Label>
                            <ButtonGroup className="d-flex">
                                {curveTypes.map((curve, idx) => (
                                    <Button className="flex-fill" key={idx} variant={selectedCurveType === curve ? "primary" : "secondary"} onClick={() => handleCurveTypeSelection(curve)}>
                                        {curve}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </Form.Group>
                        <Button variant="success" className="w-100 fs-4" onClick={handleStartTest} disabled={isTesting || !alias || !selectedCurveType || keyExists}>
                            Generate
                        </Button>
                        {isTesting && <Spinner animation="border" />}
                        {testSuccess && (
                            <Alert variant="success" className="mt-3">
                                Key generation successful!
                            </Alert>
                        )}
                    </Form>
                </Col>
                <Col xs={12} md={5}>
                    <Image src={KeyPairImage} alt="Key Generation Visualization" fluid />
                </Col>
            </Row>
        </Container>
    );
};

export default KeyGeneration;
