import React, { useState } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import RegistrationModal from "../modal/RegistrationModal";
import SignInModal from "../modal/SignInModal";
import UserProfileDropdown from "../dropdown/UserProfileDropdown";
import logo from "../../assets/logo-empty.png";
import style from "./JcaNavbar.css";

export default function JcaNavbar() {

    const [modalShow, setModalShow] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);

    function checkIfLoggedIn() {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie === "signed=true") {
                return true;
            }
        }
        return false;
    }

    const isLoggedIn = checkIfLoggedIn();

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top" style={{ paddingRight: "30px", paddingLeft: "30px" }}>
                <Navbar.Brand href="/" style={style}>
                    <img src={logo} width="60" height="60" alt="Crypto Signer logo"/>
                    <span className="navbar-header d-inline-block d-lg-none m-2"></span>
                    <span className="navbar-header d-none d-lg-inline-block m-2">Crypto Signer</span>                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="ml-auto text-center text-lg-end fs-5">
                        <Nav.Link as={Link} to="/" className="dropdown-item-mobile">Home</Nav.Link>
                        <Nav.Link as={Link} to="/key/generation" className="dropdown-item-mobile">Generate Key Pair</Nav.Link>
                        <Nav.Link as={Link} to="/signature/generation" className="dropdown-item-mobile">Sign Data</Nav.Link>
                        <Nav.Link as={Link} to="/signature/verification" className="dropdown-item-mobile">Verify Signature</Nav.Link>
                        {isLoggedIn ? (
                            <UserProfileDropdown />
                        ) : (
                            <>
                                <Button variant="outline-info" onClick={() => setShowSignInModal(true)} className="ms-0 ms-lg-5 mb-3 mt-3 mb-lg-0 mt-lg-0">Sign In</Button>
                                <Button variant="info" onClick={() => setModalShow(true)} className="ms-0 ms-lg-3">Sign Up</Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <RegistrationModal show={modalShow} onHide={() => setModalShow(false)} />
            <SignInModal show={showSignInModal} onHide={() => setShowSignInModal(false)} />
        </>
    );
}
