package edu.crypto.core.validation;

public class ScanNotFinishedException extends RuntimeException {

    public ScanNotFinishedException(long scanId) {
        super("Performance scanning for scan id = " + scanId + " has not finished yet");
    }

}
