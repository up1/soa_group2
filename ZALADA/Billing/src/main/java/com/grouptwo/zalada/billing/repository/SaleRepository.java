package com.grouptwo.zalada.billing.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import java.util.Set;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Repository
public class SaleRepository {

    @Autowired
    RestTemplate restTemplate;

    public String isCartExits(String cartId){
        HttpHeaders header = restTemplate.headForHeaders("localhost:9003/cart/" + cartId);
        return header.toString();
    }


}
