import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DenyModal = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Access Denied</Modal.Title>
            </Modal.Header>
            <Modal.Body>You must be logged in to access this page.</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DenyModal;
