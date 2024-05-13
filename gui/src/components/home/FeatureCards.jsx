import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faKey, faPenAlt, faSearch, faUserCog, faVault, faExchangeAlt} from '@fortawesome/free-solid-svg-icons';

const FeatureCards = () => {
    const features = [
        {
            title: "Generate Key Pairs",
            description: "Effortlessly create ECDSA public and private key pairs with just a click. This feature enables you to start your cryptographic operations with a fresh set of keys tailored for high security and reliability. Ideal for ensuring that your communications remain confidential and tamper-proof.",
            icon: faKey, // Kept from previous change
            color: "#17a2b8",
        },
        {
            title: "Sign Data",
            description: "Utilize your private key to sign any data, securing its authenticity and integrity. This feature allows you to produce verifiable digital signatures that confirm the sender's identity and ensure that the data has not been altered in transit.",
            icon: faPenAlt, // Kept from previous change
            color: "#28a745",
        },
        {
            title: "Verify Signatures",
            description: "Quickly and accurately check if a signature is valid using the corresponding public key. This essential tool helps validate the authenticity of signed data, ensuring that it comes from a trusted source and remains intact and unaltered.",
            icon: faSearch, // Kept from previous change
            color: "#ffc107",
        },
        {
            title: "Signature Management",
            description: "Navigate the complexities of cryptographic operations with an intuitive interface that simplifies the management of keys and signatures. This user-centric design makes it easy to perform sophisticated tasks without needing in-depth cryptographic knowledge.",
            icon: faUserCog, // Kept from previous change
            color: "#3498db", // Changed to a less bright blue
        },
        {
            title: "Storage Mechanisms",
            description: "Securely store your cryptographic keys using advanced security mechanisms designed to protect against unauthorized access and breaches. This feature ensures that your keys are safely stored, yet readily available for your cryptographic needs.",
            icon: faVault, // Kept from previous change
            color: "#95a5a6", // Changed to a gray that stands out on black
        },
        {
            title: "Export Keys in a Secure Format",
            description: "Enhance the flexibility of your cryptographic operations with the ability to export and import keys in a secure format. This feature supports the safe transfer of keys between different systems, ensuring that your encryption capabilities are portable and protected against potential security threats.",
            icon: faExchangeAlt, // Kept from previous change
            color: "#f39c12", // Adjusted for a darker yellow/orange that contrasts well on black
        }
    ];

    return (
        <Container className="py-5" style={{ backgroundColor: "#000" }}>
            <div className="text-center mb-5">
                <h2 style={{ color: "#fff", fontWeight: "bold", marginBottom: "20px" }}>Unlock the Power of Cryptography</h2>
                <p style={{ color: "#ccc" }}>
                    Dive into the world of security, where every byte matters and every key opens a door to digital fortress. Explore, evaluate, and fortify your knowledge with our cutting-edge tools designed for enthusiasts, developers, and guardians of the cyber realm.
                </p>
            </div>
            <Row className="g-4">
                {features.map((feature, idx) => (
                    <Col key={idx} md={4}>
                        <Card className="h-100" style={{ backgroundColor: "#222", borderColor: feature.color }}>
                            <Card.Body>
                                <Card.Title style={{ color: feature.color }}>
                                    <FontAwesomeIcon icon={feature.icon} style={{ marginRight: "10px" }} />{feature.title}
                                </Card.Title>
                                <Card.Text style={{ color: "#ddd" }}>
                                    {feature.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FeatureCards;
