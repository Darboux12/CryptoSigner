import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import DenyModal from './DenyModal';

const checkIfLoggedIn = () => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie === "signed=true") {
            return true;
        }
    }
    return false;
};

const PrivateRoute = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (checkIfLoggedIn()) {
            setIsLoggedIn(true);
        } else {
            setShowModal(true);
        }
    }, []);

    if (!isLoggedIn) {
        return <DenyModal show={showModal} onHide={() => setShowModal(false)} />;
    }

    return children;
};

export default PrivateRoute;
