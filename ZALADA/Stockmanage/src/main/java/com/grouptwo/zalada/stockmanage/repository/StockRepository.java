package com.grouptwo.zalada.stockmanage.repository;

import com.google.common.collect.Lists;
import com.grouptwo.zalada.stockmanage.domain.Category;
import com.grouptwo.zalada.stockmanage.domain.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import org.springframework.web.client.RestTemplate;

@Repository
public class StockRepository {

    @Autowired
    private MongoTemplate mongoTemplete;

    
    public void updateProduct(String id, Product updateProduct) {
        Long timestamp = getTimeStamp();
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
        mongoTemplete.updateFirst(queryById(id), update, Product.class);
    }

    public Product findProductById(String id) {
        return mongoTemplete.findOne(queryById(id), Product.class);
    }

    public ArrayList findAllProduct(Pageable pageable){
        return getPaging(Product.class, pageable);
    }

    public void insertProduct(Product product){
        product.setSaleDate(getTimeStamp());
        mongoTemplete.insert(product);
    }

    public void deleteProduct(String id) {
        mongoTemplete.remove(queryById(id), Product.class);
    }

    private Query queryById(String id){
        return new Query(where("id").is(id));
    }

    private Long getTimeStamp(){
        return System.currentTimeMillis() / 1000L;
    }

    public ArrayList findAllCategory(Pageable pageable) {
        return getPaging(Category.class, pageable);
    }

    public List<Category> findAllCategory(){
        return mongoTemplete.findAll(Category.class);
    }

    public  List<Product> findAllProdcut(){
        return mongoTemplete.findAll(Product.class);
    }

    @SuppressWarnings("unchecked")
    private ArrayList getPaging(Class domainClass, Pageable pageable){
        Query query = new Query();
        List domains;
        query.with(pageable);
        domains = mongoTemplete.find(query, domainClass);
        long total = mongoTemplete.count(query, domainClass);
        return Lists.newArrayList((new PageImpl(domains, pageable, total)));
    }
}