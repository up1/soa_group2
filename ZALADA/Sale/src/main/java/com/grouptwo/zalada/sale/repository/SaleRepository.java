package com.grouptwo.zalada.sale.repository;

import com.google.common.collect.Lists;
import com.grouptwo.zalada.sale.domain.Category;
import com.grouptwo.zalada.sale.domain.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Repository
public class SaleRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public Product findProductById(String id) {
        return mongoTemplate.findOne(queryById(id), Product.class);
    }

    public ArrayList findAllProduct(Pageable pageable){
        return getPaging(Product.class, pageable, new Query());
    }

    public  List<Product> findAllProduct(){
        return mongoTemplate.findAll(Product.class);
    }

    @SuppressWarnings("unchecked")
    private ArrayList getPaging(Class domainClass, Pageable pageable, Query query){
        List domains;
        query.with(pageable);
        domains = mongoTemplate.find(query, domainClass);
        long total = mongoTemplate.count(query, domainClass);
        return Lists.newArrayList((new PageImpl(domains, pageable, total)));
    }

    private Query queryById(String id){
        return new Query(where("id").is(id));
    }

}
