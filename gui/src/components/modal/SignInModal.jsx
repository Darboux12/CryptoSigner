import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import {authenticateUser} from "../api/apiService";
import SuccessModal from "./SuccessModal";

function SignInModal(props) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        if (!formData.username || !formData.password) {
            setError('Username and password cannot be empty.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await authenticateUser({ username: formData.username, password: formData.password });

            if (response.status === "OK") {
                document.cookie = "signed=true; path=/; max-age=3600"; // max-age jest czasem w sekundach
                document.cookie = `username=${encodeURIComponent(formData.username)}; path=/; max-age=3600`;

                setShowSuccessModal(true);
                props.onHide();
            } else {
                setError('Username or password is incorrect');
            }
        } catch (error) {
            setError('Username or password is incorrect');
        }
    };


    return (

        <>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton style={{ backgroundColor: '#343a40', color: '#adb5bd' }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Sign In
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#343a40', color: '#adb5bd' }}>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                style={{ backgroundColor: '#495057', borderColor: '#ced4da', color: '#ffffff' }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                style={{ backgroundColor: '#495057', borderColor: '#ced4da', color: '#ffffff' }}
                            />
                        </Form.Group>
                        <Button className={"mt-4"}  variant="outline-info" type="submit" style={{ width: '100%' }}>
                            Sign In
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <SuccessModal header={"Sign Successful"} text={"You have successfully signed in. Have a nice time!"} show={showSuccessModal} onHide={() => setShowSuccessModal(false)} />
        </>

    );
}

export default SignInModal;
