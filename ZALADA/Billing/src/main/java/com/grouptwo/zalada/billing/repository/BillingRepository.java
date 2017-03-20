package com.grouptwo.zalada.billing.repository;

import com.grouptwo.zalada.billing.domain.Product;
import com.grouptwo.zalada.billing.domain.PurchaseOrder;
import com.grouptwo.zalada.billing.exception.QueryException;
import com.grouptwo.zalada.billing.exception.UpdateException;
import org.assertj.core.util.Lists;
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

@Repository
public class BillingRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public PurchaseOrder findById(String id) {
        return mongoTemplate.findOne(getQueryId(id), PurchaseOrder.class, PurchaseOrder.COLLECTION_NAME);
    }

    public void insertPurchaseOrder(PurchaseOrder purchaseOrder) {
        Long timestamp = getTimeStamp();
        purchaseOrder.setBuyDate(timestamp);
        purchaseOrder.setPayScheduled(timestamp + 86400 * 7);
        purchaseOrder.setPayStatus(PurchaseOrder.STATUS_CODE_NOT_PAY);
        mongoTemplate.save(purchaseOrder);
    }

    public void cancelPurchaseOrder(String id) {
        Query query = getQueryId(id);

        Update update = new Update();
        update.set("payStatus", PurchaseOrder.STATUS_CODE_CANCEL);
        mongoTemplate.updateFirst(query, update, PurchaseOrder.class);
    }

    public PurchaseOrder getPurchaseOrder(String poNumber) {
        Query query = getQueryId(poNumber);
        return mongoTemplate.findOne(query, PurchaseOrder.class);
    }


    private Long getTimeStamp() {
        return System.currentTimeMillis() / 1000L;
    }

    private Query getQueryId(String id) {
        return new Query(where("id").is(id));
    }

    public ArrayList<PurchaseOrder> findAllPurchaseOrder() {
        return Lists.newArrayList(mongoTemplate.findAll(PurchaseOrder.class));
    }

    public ArrayList findAllPurchaseOrder(Pageable pageable) {
        return getPaging(Product.class, pageable, new Query());
    }


    @SuppressWarnings("unchecked")
    private ArrayList getPaging(Class domainClass, Pageable pageable, Query query) {
        List domains;
        query.with(pageable);
        domains = mongoTemplate.find(query, domainClass);
        long total = mongoTemplate.count(query, domainClass);
        return Lists.newArrayList((new PageImpl(domains, pageable, total)));
    }

    public void updatePurchaseOrder(String poNumber, PurchaseOrder updatePurchaseOrder) throws InvocationTargetException, IllegalAccessException, IntrospectionException {
        Update update = new Update();
        for (PropertyDescriptor pd : Introspector.getBeanInfo(PurchaseOrder.class).getPropertyDescriptors()) {
            if (pd.getReadMethod() != null && !"class".equals(pd.getName()) && pd.getReadMethod().invoke(updatePurchaseOrder) != null && !pd.getName().equals("id")) {
                update.set(pd.getName(), pd.getReadMethod().invoke(updatePurchaseOrder).toString());
            }
        }
        mongoTemplate.updateFirst(getQueryId(poNumber), update, PurchaseOrder.class);
    }

    public ArrayList findAllByPayStatus(Pageable pageable, Integer payStatus) {
        Query query = new Query(where("payStatus").is(payStatus));

        return getPaging(PurchaseOrder.class, pageable, query);
    }

    public ArrayList findAllByPayStatus(Integer payStatus) {
        Query query = new Query(where("payStatus").is(payStatus));

        return Lists.newArrayList(mongoTemplate.find(query, PurchaseOrder.class));
    }


    public void paidPaySlip(String poNumber) {
        Query query = getQueryId(poNumber);
        query.fields().include("payStatus");
        Update update = new Update();
        PurchaseOrder purchaseOrder = mongoTemplate.findOne(query, PurchaseOrder.class);

        if (purchaseOrder == null)
            throw new QueryException("Query Purchase Order with id: " + poNumber + " Not Found");

        Integer payStatus = purchaseOrder.getPayStatus();
        if (payStatus == -1)
            throw new UpdateException("Purchase Order with id: " + poNumber + " was Canceled");
        else if (payStatus == -2)
            throw new UpdateException("Purchase Order with id: " + poNumber + " is Out Of Pay Scheduled Date");

        update.set("patStatus", PurchaseOrder.STATUS_CODE_PAY);
        mongoTemplate.updateFirst(getQueryId(poNumber), update, PurchaseOrder.class);

    }
}
