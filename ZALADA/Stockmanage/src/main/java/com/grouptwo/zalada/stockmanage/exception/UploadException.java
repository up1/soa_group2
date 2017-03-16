package com.grouptwo.zalada.stockmanage.exception;

/**
 * Created by new_z on 16/03/2017.
 */
public class UploadException extends Exception {
    public UploadException(String exception){
        super(exception);
    }

    public UploadException(String exception, Throwable cause){
        super(exception, cause);
    }
}
