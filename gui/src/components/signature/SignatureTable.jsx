import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faDownload, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import React from "react";
import './SignatureTable.css';
import {serverURL} from "../api/apiService"; // Importing the custom CSS file

export const SignatureTable = ({ displayScanType, userSignatures, handleDelete }) => {
    const downloadSignature = async (alias) => {
        const url = `${serverURL}/signer/signature/download?alias=${alias}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', `signature_${alias}.pem`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);
            } else {
                throw new Error('Problem with server response');
            }
        } catch (error) {
            console.error('Failed to download key:', error);
        }
    };

    const downloadKey = async (keyType, alias) => {
        const url = `${serverURL}/signer/key/download/${keyType}?alias=${alias}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', `${keyType}_key_${alias}.pem`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(downloadUrl);
            } else {
                throw new Error('Problem with server response');
            }
        } catch (error) {
            console.error('Failed to download key:', error);
        }
    };

    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Signed File</th>
                    <th>Signature</th>
                    <th>Private Key</th>
                    <th>Public Key</th>
                    <th>State</th>
                </tr>
                </thead>
                <tbody>
                {userSignatures.map(scan => (
                    <tr key={scan.id}>
                        <td>{format(new Date(scan.date), 'yyyy-MM-dd HH:mm')}</td>
                        <td>{scan.fileName}</td>
                        <td>
                            <div className="cell-content">
                                <span>{scan.alias}</span>
                                <div className="icon-container">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-signature-${scan.id}`}>Show signature</Tooltip>}
                                    >
                                        <Button variant="outline-info" size="sm" onClick={() => alert(scan.signature)}>
                                            <FontAwesomeIcon icon={faEye} />
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-copy-${scan.id}`}>Copy to clipboard</Tooltip>}
                                    >
                                        <CopyToClipboard text={scan.signature}>
                                            <Button variant="outline-success" size="sm">
                                                <FontAwesomeIcon icon={faCopy} />
                                            </Button>
                                        </CopyToClipboard>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-download-${scan.id}`}>Download signature</Tooltip>}
                                    >
                                        <Button variant="outline-light" size="sm" onClick={() => downloadSignature(scan.alias)}>
                                            <FontAwesomeIcon icon={faDownload} />
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-delete-${scan.id}`}>Delete signature</Tooltip>}
                                    >
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(scan.id, displayScanType)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="cell-content">
                                <span>{scan.keyPairAlias} (Private)</span>
                                <div className="icon-container">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-private-${scan.id}`}>Show private key</Tooltip>}
                                    >
                                        <Button variant="outline-info" size="sm" onClick={() => alert(scan.privateKey)}>
                                            <FontAwesomeIcon icon={faEye} />
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-copy-private-${scan.id}`}>Copy private key to clipboard</Tooltip>}
                                    >
                                        <CopyToClipboard text={scan.privateKey}>
                                            <Button variant="outline-success" size="sm">
                                                <FontAwesomeIcon icon={faCopy} />
                                            </Button>
                                        </CopyToClipboard>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-download-private-${scan.id}`}>Download private key</Tooltip>}
                                    >
                                        <Button variant="outline-light" size="sm" onClick={() => downloadKey('private', scan.keyPairAlias)}>
                                            <FontAwesomeIcon icon={faDownload} />
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="cell-content">
                                <span>{scan.keyPairAlias} (Public)</span>
                                <div className="icon-container">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-public-${scan.id}`}>Show public key</Tooltip>}
                                    >
                                        <Button variant="outline-success" size="sm" onClick={() => alert(scan.publicKey)}>
                                            <FontAwesomeIcon icon={faEye} />
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-copy-public-${scan.id}`}>Copy public key to clipboard</Tooltip>}
                                    >
                                        <CopyToClipboard text={scan.publicKey}>
                                            <Button variant="outline-info" size="sm">
                                                <FontAwesomeIcon icon={faCopy} />
                                            </Button>
                                        </CopyToClipboard>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id={`tooltip-download-public-${scan.id}`}>Download public key</Tooltip>}
                                    >
                                        <Button variant="outline-light" size="sm" onClick={() => downloadKey('public', scan.keyPairAlias)}>
                                            <FontAwesomeIcon icon={faDownload} />
                                        </Button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                        </td>
                        <td>{scan.state}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}
