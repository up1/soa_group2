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

    public void insertProduct(Product product){
        String id = (mongoTemplate.findOne(queryByName(product.getCategory().getName()), Category.class)).getId();
        if( id != null ){
            product.setSaleDate(getTimeStamp());
            product.getCategory().setId(id);
            mongoTemplate.insert(product);
        }
    }

    public void insertCategory(Category category){
        mongoTemplate.insert(category);
    }

    private Query queryById(String id){
        return new Query(where("id").is(id));
    }

    private Query queryByName(String name){
        return new Query(where("name").is(name));
    }

    private Long getTimeStamp(){
        return System.currentTimeMillis() / 1000L;
    }

}
