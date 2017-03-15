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

    public void updateCategory(String name, Category updateCategory) {
        Update update = new Update();
        try {
            for (PropertyDescriptor pd : Introspector.getBeanInfo(Category.class).getPropertyDescriptors()) {
                if (pd.getReadMethod() != null && !"class".equals(pd.getName()) && pd.getReadMethod().invoke(updateCategory) != null && !pd.getName().equals("id")) {
                    update.set(pd.getName(), pd.getReadMethod().invoke(updateCategory).toString());
                }
            }
        } catch (IntrospectionException | IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }
        mongoTemplete.updateFirst(queryByName(name), update, Category.class);
    }

    public Product findProductById(String id) {
        return mongoTemplete.findOne(queryById(id), Product.class);
    }

    public Category findCategoryByName(String name) {
        return mongoTemplete.findOne(queryByName(name), Category.class);
    }

    public ArrayList findAllProduct(Pageable pageable){
        return getPaging(Product.class, pageable, new Query());
    }

    public  List<Product> findAllProduct(){
        return mongoTemplete.findAll(Product.class);
    }

    public ArrayList findAllProductByCategory(Pageable pageable, String categoryName){
        Category category = mongoTemplete.findOne(queryByName(categoryName), Category.class);
        return getPaging(Product.class, pageable, new Query(where("category").is(category)));
    }

    public  List<Product> findAllProductByCategory(String categoryName){
        Category category = mongoTemplete.findOne(queryByName(categoryName), Category.class);
        return mongoTemplete.find(new Query(where("category").is(category)), Product.class);
    }

    public void insertProduct(Product product){
        String id = (mongoTemplete.findOne(queryByName(product.getCategory().getName()), Category.class)).getId();
        if( id != null ){
            product.setSaleDate(getTimeStamp());
            product.getCategory().setId(id);
            mongoTemplete.insert(product);
        }
    }

    public void insertCategory(Category category){
        mongoTemplete.insert(category);
    }

    public void deleteProduct(String id) {
        mongoTemplete.remove(queryById(id), Product.class);
    }

    public void deleteCategory(String name) {
        mongoTemplete.remove(queryByName(name), Category.class);
    }

    public ArrayList findAllCategory(Pageable pageable) {
        return getPaging(Category.class, pageable, new Query());
    }

    public List<Category> findAllCategory(){
        return mongoTemplete.findAll(Category.class);
    }

    @SuppressWarnings("unchecked")
    private ArrayList getPaging(Class domainClass, Pageable pageable, Query query){
        List domains;
        query.with(pageable);
        domains = mongoTemplete.find(query, domainClass);
        long total = mongoTemplete.count(query, domainClass);
        return Lists.newArrayList((new PageImpl(domains, pageable, total)));
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