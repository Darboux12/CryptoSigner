import React, {useEffect, useState} from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import "./UserProfileDropdown.css"

const UserProfileDropdown = () => {

    const [username, setUsername] = useState('');

    useEffect(() => {
        const getUsernameFromCookie = () => {
            const cookies = document.cookie.split(';');
            const usernameCookie = cookies.find(cookie => cookie.trim().startsWith('username='));
            if (usernameCookie) {
                return decodeURIComponent(usernameCookie.split('=')[1]);
            }
            return ''; // Zwróć pusty string, jeśli ciasteczko nie zostało znalezione
        };

        setUsername(getUsernameFromCookie());
    }, []); // Pusta tablica zależności oznacza, że efekt uruchomi się tylko raz, przy montowaniu komponentu

    const clearAllCookies = () => {
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    const handleLogout = () => {
        clearAllCookies();
        window.location.reload();
    };


    return (
        <Dropdown>
            <Dropdown.Toggle as={Button} variant="outline-light" id="dropdown-basic" className={"ms-5"}>
                <FontAwesomeIcon icon={faUserCircle} size="lg" /> {username}
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-dark">
                <Dropdown.Item href="/user/profile">My Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default UserProfileDropdown;
