import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Table, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './UserProfile.css';
import {getUserData, serverURL} from "../api/apiService";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

import {Tooltip, OverlayTrigger } from 'react-bootstrap';

import { faEye, faCopy } from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {KeyPairTable} from "../key/KeyPairTable";
import {SignatureTable} from "../signature/SignatureTable";


const UserProfile = () => {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userImage, setUserImage] = useState('');
    const [userKeys, setUserKeys] = useState([]);
    const [userSignatures, setUserSignatures] = useState([]);
    const [displayScanType, setDisplayScanType] = useState('key');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const data = await getUserData();
            setUserName(data.username);
            setUserDescription(data.description);
            setUserImage(data.image);

            console.log(data);

            const sortedUserSignatures = (data.cryptoSignatureDtos || []).sort((a, b) => new Date(b.date) - new Date(a.date));
            const sortedUserKeys = (data.cryptoKeyPairDtos || []).sort((a, b) => new Date(b.date) - new Date(a.date));

            setUserSignatures(sortedUserSignatures);
            setUserKeys(sortedUserKeys);

        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleDelete = async (scanId, type) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this scan?');
        if (!isConfirmed) {
            return;
        }

        const endpoint = type === 'key'
            ? `${serverURL}/signer/key/delete?id=${scanId}`
            : `${serverURL}/signer/signature/delete?id=${scanId}`;

        try {
            const response = await fetch(endpoint, { method: 'DELETE', credentials: 'include', // Dla żądań cross-origin
                headers: {
                    'Content-Type': 'application/json',
                } });
            if (response.ok) {
                alert('Scan successfully deleted.');
                fetchUserProfile(); // Refresh the list after deletion
            } else {
                alert('Failed to delete the scan.');
            }
        } catch (error) {
            console.error('Error deleting scan:', error);
            alert('An error occurred while trying to delete the scan.');
        }
    };

    return (
        <Container fluid className="user-profile-container">

            <Row className="my-4 justify-content-center text-center">
                <Col md={6}>
                    {userImage ? (
                        <img src={userImage} alt="User" className="user-image" />
                    ) : (
                        <FontAwesomeIcon icon={faUserCircle} size="8x" />
                    )}
                    <h2 className="mt-3">{userName}</h2>
                    <p>{userDescription}</p>
                    <div>
                        <Button variant="info" className="me-2" onClick={() => console.log('Change photo clicked')}>Change Photo</Button>
                        <Button variant="info" onClick={() => console.log('Change description clicked')}>Change Description</Button>
                    </div>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={{ span: 10, offset: 1 }} className="d-flex justify-content-end">
                    <ToggleButtonGroup type="radio" name="scanTypeOptions" defaultValue={displayScanType}>
                        <ToggleButton
                            id="toggle-key"
                            variant="outline-primary"
                            value="key"
                            checked={displayScanType === 'key'}
                            onChange={(e) => setDisplayScanType(e.currentTarget.value)}
                        >
                            Key Pairs
                        </ToggleButton>
                        <ToggleButton
                            id="toggle-signature"
                            variant="outline-primary"
                            value="signature"
                            checked={displayScanType === 'signature'}
                            onChange={(e) => setDisplayScanType(e.currentTarget.value)}
                        >
                            Signatures
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Col>
            </Row>

            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <h3 className="mt-4">{displayScanType === 'key' ? 'User Key Pairs' : 'User Signatures'}</h3>

                    {displayScanType === "key" &&
                        <KeyPairTable
                            displayScanType = {displayScanType}
                            userKeys = {userKeys}
                            handleDelete = {handleDelete}
                            />}

                    {displayScanType !== "key" &&
                        <SignatureTable
                            displayScanType = {displayScanType}
                            userSignatures = {userSignatures}
                            handleDelete = {handleDelete}
                        />}
                </Col>
            </Row>

        </Container>
    );
};

export default UserProfile;
