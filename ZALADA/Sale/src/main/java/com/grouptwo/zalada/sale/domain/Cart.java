package com.grouptwo.zalada.sale.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "cart")
public class Cart {

    public Cart(){
        products = new ArrayList<>();
    }

    public Cart(Integer type){
        cartType = type;
        products = new ArrayList<>();
    }

    public Cart(Integer type, String owner, Long createTime){
        cartType = type;
        ownerName = owner;
        createDate = createTime;
        products = new ArrayList<>();
    }

    @Id
    private String id;
    private Integer cartType;
    private String ownerName;
    private ArrayList<Product> products;
    private Long createDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getCartType() {
        return cartType;
    }

    public void setCartType(Integer cartType) {
        this.cartType = cartType;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public ArrayList<Product> getProducts() {
        return products;
    }

    public void setProducts(ArrayList<Product> products) {
        this.products = products;
    }

    public Long getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Long createDate) {
        this.createDate = createDate;
    }

    public void addProduct(Product product){
        if(products == null){
           products = new ArrayList<>();
        }
        products.add(product);
    }

    @Override
    public String toString() {
        return "Cart{" +
                "id='" + id + '\'' +
                ", cartType='" + cartType + '\'' +
                ", ownerName='" + ownerName + '\'' +
                ", products=" + products +
                ", createDate='" + createDate + '\'' +
                '}';
    }

}
