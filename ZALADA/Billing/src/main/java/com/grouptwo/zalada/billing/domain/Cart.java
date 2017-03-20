package com.grouptwo.zalada.billing.domain;

import java.util.ArrayList;

public class Cart {
    private String id;
    private ArrayList<Product> products;
    private String buyer;
    private Float totalPrice;

    public String getBuyer() {
        return buyer;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "id='" + id + '\'' +
                ", products=" + products +
                ", buyer='" + buyer + '\'' +
                ", totalPrice=" + totalPrice +
                '}';
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

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

}
