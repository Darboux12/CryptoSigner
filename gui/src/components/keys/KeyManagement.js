import React, { useState } from 'react';
import axios from 'axios';

const KeyManagement = () => {
  const [alias, setAlias] = useState('');
  const [keyInfo, setKeyInfo] = useState(null);

  const generateKey = async () => {
    try {
      const response = await axios.post('http://localhost:8080/signer/key/generate', { alias });
      setKeyInfo(response.data);
    } catch (error) {
      console.error('Error generating key:', error);
    }
  };

  const findKeyByAlias = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/signer/key/find?alias=${alias}`);
      setKeyInfo(response.data);
    } catch (error) {
      console.error('Error finding key:', error);
    }
  };

  return (
    <div>
      <h2>Key Management</h2>
      <input
        type="text"
        value={alias}
        onChange={e => setAlias(e.target.value)}
        placeholder="Enter key alias"
      />
      <button onClick={generateKey}>Generate Key</button>
      <button onClick={findKeyByAlias}>Find Key by Alias</button>
      {keyInfo && <div><pre>{JSON.stringify(keyInfo, null, 2)}</pre></div>}
    </div>
  );
};

export default KeyManagement;
