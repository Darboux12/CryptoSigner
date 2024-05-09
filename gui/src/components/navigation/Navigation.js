import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/manage-keys">Manage Keys</Link></li>
      <li><Link to="/manage-signatures">Manage Signatures</Link></li>
    </ul>
  </nav>
);

export default Navigation;
