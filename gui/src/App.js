import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Login from './components/auth/Login';
import KeyManagement from './components/keys/KeyManagement';
import SignatureManagement from './components/signatures/SignatureManagement';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation /> {/* Navi w aplikacji */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/manage-keys" element={<KeyManagement />} />
          <Route path="/manage-signatures" element={<SignatureManagement />} />
          <Route path="/" element={
            <div>
              <h1>Welcome to the Crypto Management System</h1>
              <img src="/logo1.png" alt="Welcome" style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
