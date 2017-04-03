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

    private static String ANONYMOUS_OWNER = "anonymous";

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
        return getPaging(Product.class, pageable, queryByCategory(categoryName));
    }

    public  List<Product> findAllProductByCategory(String categoryName){
        return mongoTemplate.find(queryByCategory(categoryName), Product.class);
    }

    public ResponseEntity<String> insertCart(Integer userType){
        Cart userCart = new Cart(userType, ANONYMOUS_OWNER, getTimeStamp());
        mongoTemplate.insert(userCart);
        return new ResponseEntity<>(userCart.getId(), HttpStatus.CREATED);
    }

    public ResponseEntity<String> insertCart(Integer userType, String ownerName){
        Cart userCart = new Cart(userType, ownerName, getTimeStamp());
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

    public ResponseEntity<String> insertPurchaseOrder(PurchaseOrder purchaseOrder){
        mongoTemplate.insert(purchaseOrder);
        return new ResponseEntity<>(purchaseOrder.getId(), HttpStatus.CREATED);
    }

    //Further review needed - query by "username"
    public ArrayList findPurchaseOrderList(Pageable pageable, String memberId){
        return getPaging(PurchaseOrder.class, pageable, queryById(memberId));
    }

    public ArrayList findPurchaseOrderList(String memberId){
        return null;
    }

    public PurchaseOrder findPurchaseOrder(String memberId, String poNumber){
        return null;
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

    private Query queryByCategory(String categoryName) {
        return new Query(where("category.name").is(categoryName));
    }

    private Long getTimeStamp(){
        return System.currentTimeMillis() / 1000L;
    }

    private Query queryByAmount(){
        return new Query(where("amount").gt(0));
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

    public ResponseEntity<ArrayList> queryPurchaseOrder(PurchaseOrder purchaseOrder) {
        ArrayList<Product> product = purchaseOrder.getBuyProducts();
        ArrayList<String> history = new ArrayList<>();

        for (Product p : product) {
            SaleHistory saleHistory = new SaleHistory();
            saleHistory.setProduct_id(p.getId());
            saleHistory.setOwner(p.getOwner());
            saleHistory.setBuyer(purchaseOrder.getBuyer());
            saleHistory.setPonumber(purchaseOrder.getId());
            saleHistory.setDate(getTimeStamp());
            saleHistory.setAmount(p.getAmount());

            mongoTemplate.insert(saleHistory);
            history.add(saleHistory.getId());
        }

        return new ResponseEntity<>(history, HttpStatus.CREATED);
    }

}