package com.grouptwo.zalada.stockmanage.exception;

/**
 * Created by new_z on 26-Apr-17.
 */
public class ProductNotFoundException extends Exception {
    public ProductNotFoundException(){
        super("Product Not Found");
    }

}
