import React from 'react';
import JcaNavbar from "../navbar/JcaNavbar";
import { Container, Image, Row, Col } from "react-bootstrap";
import Crypto from "../../assets/Crypto.webp";
import AppHeader from "./AppHeader";
import FeatureCards from "./FeatureCards";

export function Home() {
    return (
        <>
            <JcaNavbar />
            <Container fluid className="main-container" style={{ background: "black" }}>
                <Row>
                    <Col md={8} xs={12}>
                        <AppHeader />
                        <FeatureCards />
                    </Col>
                    <Col md={4} xs={12} className="p-0">
                        <Image src={Crypto} alt="Crypto" fluid />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
