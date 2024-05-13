import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import {addUser} from "../api/apiService";
import SuccessModal from "./SuccessModal";

function RegistrationModal(props) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear specific field error on change
    };

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;
        let errorMsg = '';

        if (formData.username.trim().length < 4) {
            newErrors.username = 'Username must be at least 4 characters long!';
            errorMsg = 'Username is too short!';
            isValid = false;
        }

        if (!formData.email.match(/\S+@\S+\.\S+/)) {
            newErrors.email = 'Invalid email format!';
            errorMsg += ' Invalid email format!';
            isValid = false;
        }

        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters!';
            errorMsg += ' Password is too short!';
            isValid = false;
        }

        if (formData.password !== formData.repeatPassword) {
            newErrors.password = 'Passwords do not match!';
            newErrors.repeatPassword = 'Passwords do not match!';
            errorMsg += ' Passwords do not match!';
            isValid = false;
        }

        setErrors(newErrors);
        setFormError(errorMsg);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            const result = await addUser(formData);
            if (result) {
                setShowSuccessModal(true);
                props.onHide(); // Hide modal on successful submission
            } else {
                // Tutaj możesz dodać logikę obsługi błędów, np. wyświetlić komunikat w modalu
            }
        }
    };

    return (

        <>

        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#343a40', color: '#adb5bd' }}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Sign Up
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#343a40', color: '#adb5bd' }}>
                {formError && <Alert variant="danger">{formError}</Alert>}
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            isInvalid={!!errors.username}
                            style={{ backgroundColor: '#495057', borderColor: '#ced4da', color: '#ffffff' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                            style={{ backgroundColor: '#495057', borderColor: '#ced4da', color: '#ffffff' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                            style={{ backgroundColor: '#495057', borderColor: '#ced4da', color: '#ffffff' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="repeatPassword"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            isInvalid={!!errors.repeatPassword}
                            style={{ backgroundColor: '#495057', borderColor: '#ced4da', color: '#ffffff' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.repeatPassword}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button className={"mt-4"} variant="outline-info" type="submit" style={{ width: '100%' }}>
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

            <SuccessModal header={"Registration Successful"} text={"Congratulations! You have successfully registered. You can sign in now!"} show={showSuccessModal} onHide={() => setShowSuccessModal(false)} />

        </>
    );
}

export default RegistrationModal;
