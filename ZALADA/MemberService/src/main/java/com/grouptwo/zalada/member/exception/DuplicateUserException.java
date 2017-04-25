package com.grouptwo.zalada.member.exception;

/**
 * Created by new_z on 24-Apr-17.
 */
public class DuplicateUserException extends RuntimeException{
    public DuplicateUserException(){
        super("Duplicate User");
    }
}
