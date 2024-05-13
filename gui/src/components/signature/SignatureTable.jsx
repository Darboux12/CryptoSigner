import {Button, OverlayTrigger, Table, Tooltip} from "react-bootstrap";
import {format} from "date-fns";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faEye} from "@fortawesome/free-solid-svg-icons";
import {CopyToClipboard} from "react-copy-to-clipboard";
import React from "react";

export const SignatureTable = ({displayScanType, userSignatures, handleDelete}) => {

    return (
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th style={{  }}>Date</th>
                    <th style={{  }}>Signed File</th>
                    <th style={{  }}>Signature</th>
                    <th style={{  }}>Private Key</th>
                    <th style={{  }}>Public Key</th>
                    <th style={{  }}>State</th>
                    <th style={{  }}>Action</th>
                </tr>
                </thead>
                <tbody>
                {userSignatures.map(scan => (
                    <tr key={scan.id}>
                        <td>{format(new Date(scan.date), 'yyyy-MM-dd HH:mm')}</td>
                        <td>{scan.fileName}</td>
                        <td>
                            {scan.alias}
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`tooltip-signature-${scan.id}`}>Show signature</Tooltip>}
                            >
                                <Button className={"ms-3 me-2"} variant="outline-secondary" size="sm" onClick={() => alert(scan.signature)}>
                                    <FontAwesomeIcon icon={faEye} />
                                </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`tooltip-copy-${scan.id}`}>Copy to clipboard</Tooltip>}
                            >
                                <CopyToClipboard text={scan.signature}>
                                    <Button variant="outline-secondary" size="sm">
                                        <FontAwesomeIcon icon={faCopy} />
                                    </Button>
                                </CopyToClipboard>
                            </OverlayTrigger>
                        </td>
                        <td>
                            {scan.keyPairAlias} (Private)
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`tooltip-private-${scan.id}`}>Show private key</Tooltip>}
                            >
                                <Button className={"ms-3 me-2"} variant="outline-secondary" size="sm" onClick={() => alert(scan.privateKey)}>
                                    <FontAwesomeIcon icon={faEye} />
                                </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`tooltip-copy-${scan.id}`}>Copy to clipboard</Tooltip>}
                            >
                                <CopyToClipboard text={scan.privateKey}>
                                    <Button variant="outline-secondary" size="sm">
                                        <FontAwesomeIcon icon={faCopy} />
                                    </Button>
                                </CopyToClipboard>
                            </OverlayTrigger>
                        </td>
                        <td>
                            {scan.keyPairAlias} (Public)
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`tooltip-public-${scan.id}`}>Show public key</Tooltip>}
                            >
                                <Button className={"ms-3 me-2"} variant="outline-secondary" size="sm" onClick={() => alert(scan.publicKey)}>
                                    <FontAwesomeIcon icon={faEye} />
                                </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id={`tooltip-copy-${scan.id}`}>Skopiuj do schowka</Tooltip>}
                            >
                                <CopyToClipboard text={scan.publicKey}>
                                    <Button variant="outline-secondary" size="sm">
                                        <FontAwesomeIcon icon={faCopy} />
                                    </Button>
                                </CopyToClipboard>
                            </OverlayTrigger>
                        </td>
                        <td>{scan.state}</td>
                        <td>
                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(scan.id, displayScanType)} style={{ marginLeft: '10px' }}>Delete</Button>
                        </td>
                    </tr>
                )) }
                </tbody>
            </Table>
        </>
    )
}
