package com.grouptwo.zalada.billing.domain;

import java.util.ArrayList;

/**
 * Created by new_z on 10/03/2017.
 */
public class Cart {
    String id;
    ArrayList<Product> products;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ArrayList<Product> getProducts() {
        return products;
    }

    public void setProducts(ArrayList<Product> products) {
        this.products = products;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "id='" + id + '\'' +
                ", products=" + products +
                '}';
    }
}
