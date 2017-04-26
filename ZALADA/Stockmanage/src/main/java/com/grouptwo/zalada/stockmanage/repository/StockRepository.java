package com.grouptwo.zalada.stockmanage.repository;

import com.google.common.collect.Lists;
import com.grouptwo.zalada.stockmanage.domain.Category;
import com.grouptwo.zalada.stockmanage.domain.Product;
import com.grouptwo.zalada.stockmanage.exception.ProductNotFoundException;
import com.grouptwo.zalada.stockmanage.exception.RepositoryException;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Repository
public class StockRepository {

    @Autowired
    private MongoTemplate mongoTemplate;
    private Log log = LogFactory.getLog(StockRepository.class.getName());

    public void updateProduct(String owner, String id, Product updateProduct) throws ProductNotFoundException {

        boolean isProductExits = mongoTemplate.exists(new Query(where("id").is(id).andOperator(whereByOwner(owner))), Product.class);
        if (isProductExits){
            throw new ProductNotFoundException();
        }

        Long timestamp = getTimeStamp();
        if(updateProduct.getCategory() != null)
            updateProduct.setCategory(findCategoryByName(updateProduct.getCategory().getName()));

        Update update = updateWithReflect(Product.class, updateProduct);

        update.set("editDate", timestamp);
        mongoTemplate.updateFirst(queryById(id), update, Product.class);
    }

    public void updateCategory(String name, Category updateCategory) {
        Update update = updateWithReflect(Category.class, updateCategory);
        mongoTemplate.updateFirst(queryByName(name), update, Category.class);
    }

    public Product findProductById(String owner, String id) {
        Query query = new Query(where("id").is(id).andOperator(whereByOwner(owner)));
        return mongoTemplate.findOne(query, Product.class);
    }

    public Category findCategoryByName(String name) {
        return mongoTemplate.findOne(queryByName(name), Category.class);
    }

    public List findAllProduct(String owner, Pageable pageable){
        return getPaging(Product.class, pageable, queryByOwner(owner));
    }

    public  List<Product> findAllProduct(String owner){
        return mongoTemplate.find(queryByOwner(owner), Product.class);
    }

    public List findAllProductByCategory(String owner, Pageable pageable, String categoryName){
        List<String> categoryList = createCategoryList(categoryName);
        return getPaging(Product.class, pageable, new Query(where("category.name").in(categoryList).andOperator(whereByOwner((owner)))));
    }

    public  List<Product> findAllProductByCategory(String owner, String categoryName){
        List<String> categoryList = createCategoryList(categoryName);
        return mongoTemplate.find(new Query(where("category.name").in(categoryList).andOperator(whereByOwner(owner))), Product.class);
    }

    public void insertProduct(String owner, Product product) throws RepositoryException{
        if(product.getCategory() == null){
            throw new RepositoryException("Category Not Provide");
        }
        Category category = findCategoryByName(product.getCategory().getName());
        if(category == null){
            throw new RepositoryException("Category Not Match");
        }
        product.setOwner(owner);
        product.setCategory(category);
        product.setSaleDate(getTimeStamp());
        mongoTemplate.insert(product);
    }

    public void insertCategory(Category category){
        mongoTemplate.insert(category);
    }

    public void deleteProduct(String owner, String id) throws ProductNotFoundException {
        boolean isProductExits = mongoTemplate.exists(new Query(where("id").is(id).andOperator(where("owner").is(owner))), Product.class);
        if(isProductExits) {
            mongoTemplate.remove(queryById(id), Product.class);
        }else{
            throw new ProductNotFoundException();
        }
    }

    public List findAllCategory(Pageable pageable) {
        return getPaging(Category.class, pageable, new Query());
    }

    public List<Category> findAllCategory(){
        return mongoTemplate.findAll(Category.class);
    }

    @SuppressWarnings("unchecked")
    private List getPaging(Class domainClass, Pageable pageable, Query query){
        List domains;
        query.with(pageable);
        domains = mongoTemplate.find(query, domainClass);
        long total = mongoTemplate.count(query, domainClass);

        return Lists.newArrayList(new PageImpl(domains, pageable, total));
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

    private Update updateWithReflect(Class domain, Object updateObject){
        Update update = new Update();
        Object updateObjectCasted = domain.cast(updateObject);
        try {
            for (PropertyDescriptor pd : Introspector.getBeanInfo(domain).getPropertyDescriptors()) {
                String attributeName = pd.getName();
                Method getter = pd.getReadMethod();
                Object attributeObject = getter.invoke(updateObjectCasted);
                if (!"class".equals(attributeName) && !"id".equals(attributeName) && attributeObject != null) {
                    update.set(attributeName, pd.getPropertyType().cast(attributeObject));
                }
            }
        } catch (IntrospectionException | IllegalAccessException | InvocationTargetException e) {
            log.error(e);
        }
        return update;
    }

    private List<String> createCategoryList(String categoryName){
        Category category = mongoTemplate.findOne(queryByName(categoryName), Category.class);
        List<String> categoryList = new ArrayList<>();
        categoryList.add(categoryName);
        for (String eachChild : category.getChildren()){
            categoryList.add(eachChild);
        }
        return categoryList;
    }

    private Query queryByOwner(String owner){
        return new Query(whereByOwner(owner));
    }
    private Criteria whereByOwner(String owner){
        return where("owner").is(owner);
    }

    public void deleteCategory(String name) {
        mongoTemplate.remove(queryByName(name), Category.class);
    }
}