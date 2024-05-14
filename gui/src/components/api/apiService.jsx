export const serverURL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const addUser = async (userData) => {

    console.log(userData);

    try {
        const response = await fetch(`${serverURL}/signer/user/sign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error adding user:", errorData);
            return null; // Lub inna logika obsługi błędów
        }

        return await response.json(); // Sukces, zwraca dodanego użytkownika
    } catch (error) {
        console.error("Network error:", error);
        return null; // Lub inna logika obsługi błędów
    }
};

export const authenticateUser = async (loginData) => {
    try {
        const response = await fetch(`${serverURL}/signer/authenticate`, {
            method: 'POST',
            credentials: 'include', // Dla żądań cross-origin
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error during authentication:", errorData);
            throw new Error(errorData.message || 'Authentication failed');
        }

        return await response.json(); // Zwraca otrzymany token JWT
    } catch (error) {
        console.error("Network error:", error);
        throw error; // Przekazuje błąd do dalszej obsługi
    }
};

export const getUserData = async () => {

    try {
        const response = await fetch(`${serverURL}/signer/user/username`, {
            method: 'GET',
            credentials: 'include', // Dla żądań cross-origin
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error during authentication:", errorData);
            throw new Error(errorData.message || 'Authentication failed');
        }

        return await response.json(); // Zwraca otrzymany token JWT
    } catch (error) {
        console.error("Network error:", error);
        throw error; // Przekazuje błąd do dalszej obsługi
    }
};

export const sendKeyGenerationRequest = async (alias, selectedCurveType) => {

    const jsonObject = {
        alias: alias,
        curveType: selectedCurveType
    };

    try {
        const response = await fetch(`${serverURL}/signer/key/generate`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonObject)
        });



        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error during the generation process:", errorData);
            throw new Error(errorData.message || 'Generation failed');
        }

        return await response.json();
    } catch (error) {
        console.error("Network error:", error);
        throw error;
    }
};

export const sendSignatureRequest = async (jsonData) => {

    try {
        const response = await fetch(`${serverURL}/signer/signature/sign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}: ${await response.text()}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error sending signature request:', error);
        throw error;
    }
};

export const sendVerificationRequest = async ({ data, signature, publicKey }) => {
    const endpoint = `${serverURL}/signer/signature/verify`; // Change this to your actual endpoint

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: data,           // the file content encoded in Base64
                signature: signature, // the signature content, could be Base64 encoded if it's binary
                publicKey: publicKey  // the public key content, could be Base64 encoded if it's a binary file
            }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json(); // Assuming the server responds with JSON
    } catch (error) {
        console.error("Failed to send verification request:", error);
        throw error;
    }
};


