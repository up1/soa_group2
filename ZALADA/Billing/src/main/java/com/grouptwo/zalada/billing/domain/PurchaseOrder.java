package com.grouptwo.zalada.billing.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "purchaseOrder")
public class PurchaseOrder {

    public static final String COLLECTION_NAME = "purchaseOrder";
    @Id
    private String id;
    private String buyer;
    private Integer totalPrice;
    private Long buyDate;
    private Long paidDate;
    private ArrayList<Product> buyProducts;
    private String deliveryAddress;
    private Integer payStatus;
    private String tel;
    private String email;

    public static final String COLLECTION_NAME = "billing";
    public static final int STATUSCODE_NOTPAY = 0;
    public static final int STATUSCODE_PAY = 1;

    public String getId() {
        return id;
    }

    public PurchaseOrder(){}

    public PurchaseOrder(Cart cart){
        this.buyProducts = new ArrayList<>(cart.getProducts());
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBuyer() {
        return buyer;
    }

    public void setBuyer(String buyer) {
        this.buyer = buyer;
    }

    public Integer getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Long getBuyDate() {
        return buyDate;
    }

    public void setBuyDate(Long buyDate) {
        this.buyDate = buyDate;
    }

    public Long getPaidDate() {
        return paidDate;
    }

    public void setPaidDate(Long paidDate) {
        this.paidDate = paidDate;
    }

    public ArrayList<Product> getBuyProducts() {
        return buyProducts;
    }

    public void setBuyProducts(ArrayList<Product> buyProducts) {
        this.buyProducts = buyProducts;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public Integer getPayStatus() {
        return payStatus;
    }

    public void setPayStatus(Integer payStatus) {
        this.payStatus = payStatus;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Billing.purchaseOrder[" +
                "id='" + id + '\'' +
                ", buyer='" + buyer + '\'' +
                ", totalPrice=" + totalPrice +
                ", buyDate=" + buyDate +
                ", paidDate=" + paidDate +
                ", buyProducts=" + buyProducts +
                ", deliveryAddress='" + deliveryAddress + '\'' +
                ", payStatus=" + payStatus +
                ", tel='" + tel + '\'' +
                ", email='" + email + '\'' +
                ']';
    }
}
