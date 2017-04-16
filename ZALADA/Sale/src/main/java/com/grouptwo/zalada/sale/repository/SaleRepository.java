package com.grouptwo.zalada.sale.repository;

import com.google.common.collect.Lists;
import com.grouptwo.zalada.sale.domain.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
public class SaleRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public Product findProductById(String id) {
        return mongoTemplate.findOne(queryById(id), Product.class);
    }

    public ArrayList findAllProduct(Pageable pageable){
        return getPaging(Product.class, pageable, queryByAmount());
    }

    public  List<Product> findAllProduct(){
        return mongoTemplate.find(queryByAmount(), Product.class);
    }

    public ArrayList findAllProductByCategory(Pageable pageable, String categoryName){
        Category category = mongoTemplate.findOne(queryByName(categoryName), Category.class);
        return getPaging(Product.class, pageable, new Query(where("category").is(category)));
    }

    public  List<Product> findAllProductByCategory(String categoryName){
        Category category = mongoTemplate.findOne(queryByName(categoryName), Category.class);
        return mongoTemplate.find(new Query(where("category").is(category)), Product.class);
    }

    public ResponseEntity<String> insertCart(Integer userType){
        Cart anonCart = new Cart();
        anonCart.setCartType(userType);
        anonCart.setCreateDate(getTimeStamp());
        anonCart.setOwnerName("anonymous");
        mongoTemplate.insert(anonCart);
        return new ResponseEntity<>(anonCart.getId(), HttpStatus.CREATED);
    }

    public ResponseEntity<String> insertCart(Integer userType, String ownerName){
        Cart userCart = new Cart();
        userCart.setCartType(userType);
        userCart.setOwnerName(ownerName);
        userCart.setCreateDate(getTimeStamp());
        mongoTemplate.insert(userCart);
        return new ResponseEntity<>(userCart.getId(), HttpStatus.CREATED);
    }

    public Cart findCartById(String cartId){
        return mongoTemplate.findOne(queryById(cartId), Cart.class);
    }

    public void addCart(String cartId, String productId, Integer amount){
        Cart updateCart = mongoTemplate.findOne(queryById(cartId), Cart.class);
        Product buyingProduct = mongoTemplate.findOne(queryById(productId), Product.class);
        buyingProduct.setAmount(amount);
        updateCart.addProduct(buyingProduct);
        Update update = updateWithReflect(Cart.class, updateCart);
        mongoTemplate.updateFirst(queryById(cartId), update, Cart.class);
    }



    public void updateCart(String cartId, Cart updateCart){
        Update update = updateWithReflect(Cart.class, updateCart);
        mongoTemplate.updateFirst(queryById(cartId), update, Cart.class);
    }

    public ResponseEntity<String> updateAmount(String cartId, String productId, int amount){
        Cart cart = findCartById(cartId);
        ArrayList<Product> cartItems = cart.getProducts();
        for(Product product: cartItems){
            if(product.getId().equals(productId)) {
                product.setAmount(amount);
                Update update = new Update().set("products", cartItems);
                mongoTemplate.updateFirst(queryById(cartId), update, Cart.class);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("productId not found", HttpStatus.NO_CONTENT);
    }

    public ResponseEntity<String> removeFromCart(String cartId, String productId){
        Cart cart = findCartById(cartId);
        ArrayList<Product> cartItems = cart.getProducts();
        for(Product product: cartItems){
            if(product.getId().equals(productId)) {
                cartItems.remove(product);
                Update update = new Update().set("products", cartItems);
                mongoTemplate.updateFirst(queryById(cartId), update, Cart.class);
                return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("product not found", HttpStatus.NO_CONTENT);
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
                if (!"class".equals(attributeName) && attributeObject != null && !attributeName.equals("id")) {
                    update.set(attributeName, pd.getPropertyType().cast(attributeObject));
                }
            }
        } catch (IntrospectionException | IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return update;
    }

    private Query queryByAmount(){
        return new Query(where("amount").gt(0));
    }

}