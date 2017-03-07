package com.grouptwo.zalada.stockmanage.repository;

import com.grouptwo.zalada.stockmanage.domain.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Repository
public class ProductRepository {

    @Autowired
    private MongoTemplate mongoTemplete;

    @Autowired
    RestTemplate restTemplate;

    public void update(String id, Product updateProduct) {
        Long timestamp = System.currentTimeMillis() / 1000L;
        Query query = new Query(where("id").is(id));
        Update update = new Update();
        try {
            for (PropertyDescriptor pd : Introspector.getBeanInfo(Product.class).getPropertyDescriptors()) {
                if (pd.getReadMethod() != null && !"class".equals(pd.getName()) && pd.getReadMethod().invoke(updateProduct) != null && !pd.getName().equals("id")) {
                    update.set(pd.getName(), pd.getReadMethod().invoke(updateProduct).toString());
                }
            }
        } catch (IntrospectionException | IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }

        update.set("editDate", timestamp);
        mongoTemplete.updateFirst(query, update, Product.class);
    }

    public Product findById(String id) {
        Query query = new Query(where("id").is(id));
        return mongoTemplete.findOne(query, Product.class, Product.COLLECTION_NAME);
    }

    public Page<Product> findAll(Pageable pageable){
        List<Product> stories = null;

        Query query = new Query();
        query.with(pageable);

        stories = mongoTemplete.find(query, Product.class);

        long total = mongoTemplete.count(query, Product.class);

        return new PageImpl<Product>(stories, pageable, total);
    }

    public void insert(Product product){
        Long timestamp = System.currentTimeMillis() / 1000L;
        product.setSaleDate(timestamp);
        mongoTemplete.insert(product);
    }
}