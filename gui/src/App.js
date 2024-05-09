import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import KeyManagement from './components/keys/KeyManagement';
import SignatureManagement from './components/signatures/SignatureManagement';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/manage-keys" component={KeyManagement} />
          <Route path="/manage-signatures" component={SignatureManagement} />
          <Route path="/" exact component={() => <h1>Welcome to the Crypto Management System</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;