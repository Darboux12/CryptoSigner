# CryptoSigner - An Application for Managing ECDSA Keys and Signatures

## Project Description
The project involves the development of a secure web application that allows users to generate keys, sign data, and verify signatures using the ECDSA (Elliptic Curve Digital Signature Algorithm). The application features a user-friendly interface along with advanced security mechanisms.

## Features
- **Key Pair Generation**: Creation of public and private key pairs for use in digital signatures.
- **Data Signing**: Capability to sign selected data using a private key.
- **Signature Verification**: Checking the authenticity of a signature using the corresponding public key.
- **Secure Key Storage**: Private keys are stored securely, protected from unauthorized access.
- **Key Export and Import**: Functionality that allows the exporting and importing of keys in a secure format.

## About ECDSA
ECDSA, or Elliptic Curve Digital Signature Algorithm, utilizes elliptical curves for generating digital signatures. It is valued for its efficiency and security, making it a standard in many modern cryptographic applications, including blockchain technologies.

## Technology Stack
The project is implemented using the following technologies:
- **Frontend**: React.js for an interactive user interface.
- **Backend**: Java with the Spring Boot framework, providing support for creating REST APIs and Maven for managing dependencies and building the project.
- **Database**: PostgreSQL, offering secure data storage with transaction capabilities.
- **Container Management**: Docker Compose for defining and running multi-container Docker applications.

## Deployment
**Windows** 
- Navigate to the root directory of the project where the build.bat and deploy.bat files are located.
- Run the following command to build the project: build.bat (this script will compile the project using Maven and prepare all necessary components)
- Execute the following command to deploy the project: deploy.bat (this will start all required services using Docker Compose)

**macOS/Linux**
- Navigate to the project's root directory where the build.sh and deploy.sh scripts should be located.
- If not already executable, change the script permissions by running: chmod +x build.sh deploy.sh
- Execute the build script with the following command: ./build.sh
- Run the deployment script: ./deploy.sh
- Check that all services have started correctly by reviewing the output logs or accessing the application through a browser.
