import React, { useState } from 'react';
import { generateKeys, getKeyByAlias } from '../../services/ApiService';

const KeyManagement = () => {
  const [alias, setAlias] = useState('');
  const [keyInfo, setKeyInfo] = useState(null);

  const handleGenerateKey = async () => {
    try {
      const response = await generateKeys({ alias }); 
      setKeyInfo(response);
    } catch (error) {
      console.error('Error generating key:', error);
    }
  };

  const handleFindKeyByAlias = async () => {
    try {
      const response = await getKeyByAlias(alias);
      setKeyInfo(response);
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
      <button onClick={handleGenerateKey}>Generate Key</button>
      <button onClick={handleFindKeyByAlias}>Find Key by Alias</button>
      {keyInfo && <div><pre>{JSON.stringify(keyInfo, null, 2)}</pre></div>}
    </div>
  );
};

export default KeyManagement;
