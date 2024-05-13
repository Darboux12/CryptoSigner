import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import logo from '../../assets/logo-empty.png'; // Dodaj ścieżkę do Twojego logo

const SuccessModal = ({ header, text, show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} size="md" aria-labelledby="success-modal-title" centered>
            <Modal.Header closeButton style={{ backgroundColor: '#343a40', color: '#adb5bd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <img src={logo} alt="Logo" style={{ width: '50px', height: 'auto', marginRight: '10px' }} /> {/* Dodaj logo tutaj */}
                <Modal.Title id="success-modal-title">
                    {header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#343a40', color: '#adb5bd' }}>
                <p>{text}</p>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#343a40' }}>
                <Button variant="outline-info" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SuccessModal;
