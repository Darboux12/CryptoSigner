import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import {Home} from "./components/home/Home";
import JcaNavbar from "./components/navbar/JcaNavbar";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import VulnerabilityScanner from "./components/vulnerability/VulnerabilityScanner";
import UserProfile from "./components/profile/UserProfile";
import VulnerabilityScanResultsPage from "./components/vulnerability/VulnerabilityScanResultsPage";
import KeyGeneration from "./components/key/KeyGeneration";
import PrivateRoute from "./components/router/PrivateRoute";
import SignatureGeneration from "./components/signature/SignatureGeneration";
import SignatureVerification from "./components/signature/SignatureVerification";

function App() {
    return (
        <Router>
            <JcaNavbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vulnerability" element={
                    <PrivateRoute>
                        <VulnerabilityScanner />
                    </PrivateRoute>
                } />
                <Route path="/key/generation" element={
                    <PrivateRoute>
                        <KeyGeneration />
                    </PrivateRoute>
                } />
                <Route path="/signature/generation" element={
                    <PrivateRoute>
                        <SignatureGeneration />
                    </PrivateRoute>
                } />
                <Route path="/signature/verification" element={
                    <PrivateRoute>
                        <SignatureVerification/>
                    </PrivateRoute>
                } />
                <Route path="/user/profile" element={
                    <PrivateRoute>
                        <UserProfile />
                    </PrivateRoute>
                } />

            </Routes>
        </Router>
    );
}

export default App;
