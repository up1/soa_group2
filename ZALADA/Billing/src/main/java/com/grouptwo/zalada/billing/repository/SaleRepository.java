package com.grouptwo.zalada.billing.repository;

import com.grouptwo.zalada.billing.domain.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

@Repository
public class SaleRepository {

    @Autowired
    private
    RestTemplate restTemplate;

    public String isCartExits(String cartId){
        HttpHeaders header = restTemplate.headForHeaders("localhost:9003/cart/" + cartId);
        return header.toString();
    }

    public ResponseEntity<Cart> getCart(String cartId){
        return  restTemplate.getForEntity("localhost:9003/cart/" + cartId, Cart.class);
    }


}
