import {Button, OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import {format} from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faEye, faDownload, faTrash} from "@fortawesome/free-solid-svg-icons";
import {CopyToClipboard} from "react-copy-to-clipboard";
import React from "react";

export const KeyPairTable = ({displayScanType, userKeys, handleDelete}) => {

    const downloadKey = async (keyType, alias) => {
        const url = `http://localhost:8080/signer/key/download/${keyType}?alias=${alias}`;
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
                link.setAttribute('download', `${keyType}_key_${alias}.pem`); // Możesz dostosować nazwę pliku
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
                    <th style={{  }}>Date</th>
                    <th style={{  }}>Private Key</th>
                    <th style={{  }}>Public Key</th>
                    <th style={{  }}>State</th>
                </tr>
                </thead>
                <tbody>
                {userKeys.map(scan => (
                    <tr key={scan.id}>
                        <td>{format(new Date(scan.date), 'yyyy-MM-dd HH:mm')}</td>
                        <td>
                            <span style={{ width: '150px', display: 'inline-block' }}>{scan.alias} (Private)</span>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`tooltip-private-${scan.id}`}>Show private key</Tooltip>}
                            >
                                <Button className={"ms-3 me-2"} variant="outline-info" size="sm" onClick={() => alert(scan.privateKey)}>
                                    <FontAwesomeIcon icon={faEye} />
                                </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`tooltip-copy-${scan.id}`}>Copy to clipboard</Tooltip>}
                            >
                                <CopyToClipboard text={scan.privateKey}>
                                    <Button className={"me-2"} variant="outline-success" size="sm">
                                        <FontAwesomeIcon icon={faCopy} />
                                    </Button>
                                </CopyToClipboard>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`tooltip-download-${scan.id}`}>Download private key</Tooltip>}
                            >
                                <Button className={"me-2"} variant="outline-light" size="sm" onClick={() => downloadKey('private', scan.alias)}>
                                    <FontAwesomeIcon icon={faDownload} />
                                </Button>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`tooltip-delete-${scan.id}`}>Delete key pair</Tooltip>}
                            >
                                <Button className={""} variant="outline-danger" size="sm" onClick={() => handleDelete(scan.id, displayScanType)} >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </OverlayTrigger>

                        </td>
                        <td>
                            <span style={{ width: '150px', display: 'inline-block' }}>{scan.alias} (Public)</span>

                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`tooltip-public-${scan.id}`}>Show public key</Tooltip>}
                            >
                                <Button className={"ms-2 me-2"} variant="outline-info" size="sm" onClick={() => alert(scan.publicKey)}>
                                    <FontAwesomeIcon icon={faEye} />
                                </Button>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`tooltip-copy-${scan.id}`}>Copy to clipboard</Tooltip>}
                            >
                                <CopyToClipboard text={scan.publicKey}>
                                    <Button className={"me-2"} variant="outline-success" size="sm">
                                        <FontAwesomeIcon icon={faCopy} />
                                    </Button>
                                </CopyToClipboard>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`tooltip-download-${scan.id}`}>Download public key</Tooltip>}
                            >
                                <Button className={"me-2"} variant="outline-light" size="sm" onClick={() => downloadKey('public', scan.alias)}>
                                    <FontAwesomeIcon icon={faDownload} />
                                </Button>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`tooltip-delete-${scan.id}`}>Delete key pair</Tooltip>}
                            >
                                <Button className={""} variant="outline-danger" size="sm" onClick={() => handleDelete(scan.id, displayScanType)} >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </OverlayTrigger>

                        </td>
                        <td>{scan.state}</td>
                    </tr>
                )) }
                </tbody>
            </Table>
        </>
    )
}
