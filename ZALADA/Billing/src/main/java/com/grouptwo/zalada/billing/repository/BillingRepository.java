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
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Repository
public class BillingRepository {

    @Autowired
    private MongoTemplate mongoTemplate;
    
    private static final String PAYSTATUS = "payStatus";

    public PurchaseOrder findById(String buyer, String id) {
        return mongoTemplate.findOne(queryByIdAndBuyer(id, buyer), PurchaseOrder.class, PurchaseOrder.COLLECTION_NAME);
    }

    private Query queryByIdAndBuyer(String id, String buyer){
        return new Query(whereIdIs(id).andOperator(whereBuyerIs(buyer)));
    }

    public void insertPurchaseOrder(PurchaseOrder purchaseOrder) {
        Long timestamp = getTimeStamp();
        purchaseOrder.setBuyDate(timestamp);
        purchaseOrder.setPayScheduled(timestamp + 86400 * 7);
        purchaseOrder.setPayStatus(PurchaseOrder.STATUS_CODE_NOT_PAY);
        mongoTemplate.save(purchaseOrder);
    }

    public void cancelPurchaseOrder(String buyer, String id) {
        Query query = queryByIdAndBuyer(id, buyer);

        Update update = new Update();
        update.set(PAYSTATUS, PurchaseOrder.STATUS_CODE_CANCEL);
        mongoTemplate.updateFirst(query, update, PurchaseOrder.class);
    }

    public PurchaseOrder getPurchaseOrder(String buyer, String poNumber) {
        Query query = queryByIdAndBuyer(poNumber, buyer);
        return mongoTemplate.findOne(query, PurchaseOrder.class);
    }


    private Long getTimeStamp() {
        return System.currentTimeMillis() / 1000L;
    }

    private Query queryBuyId(String id) {
        return new Query(where("id").is(id));
    }

    public List<PurchaseOrder> findAllPurchaseOrder(String buyer) {

        return Lists.newArrayList(mongoTemplate.find(queryByBuyer(buyer), PurchaseOrder.class));
    }

    private Query queryByBuyer(String buyer){
        return new Query(where("buyer").is(buyer));
    }

    public List findAllPurchaseOrder(String buyer, Pageable pageable) {
        return getPaging(Product.class, pageable, queryByBuyer(buyer));
    }


    @SuppressWarnings("unchecked")
    private List getPaging(Class domainClass, Pageable pageable, Query query) {
        List domains;
        query.with(pageable);
        domains = mongoTemplate.find(query, domainClass);
        long total = mongoTemplate.count(query, domainClass);
        return Lists.newArrayList(new PageImpl(domains, pageable, total));
    }

    public void updatePurchaseOrder(String buyer, String poNumber, PurchaseOrder updatePurchaseOrder) throws InvocationTargetException, IllegalAccessException, IntrospectionException {
        Update update = new Update();
        for (PropertyDescriptor pd : Introspector.getBeanInfo(PurchaseOrder.class).getPropertyDescriptors()) {
            if (pd.getReadMethod() != null && !"class".equals(pd.getName()) && pd.getReadMethod().invoke(updatePurchaseOrder) != null && !"id".equals(pd.getName())) {
                update.set(pd.getName(), pd.getReadMethod().invoke(updatePurchaseOrder).toString());
            }
        }
        mongoTemplate.updateFirst(queryByIdAndBuyer(poNumber, buyer), update, PurchaseOrder.class);
    }

    public List findAllByPayStatus(String buyer, Pageable pageable, Integer payStatus) {
        Query query = queryByPayStatusAndBuyer(payStatus, buyer);

        return getPaging(PurchaseOrder.class, pageable, query);
    }

    private Query queryByPayStatusAndBuyer(Integer payStatus, String buyer){
        return new Query(wherePayStatusIs(payStatus).andOperator(whereBuyerIs(buyer)));
    }

    public List findAllByPayStatus(String buyer, Integer payStatus) {
        Query query = queryByPayStatusAndBuyer(payStatus, buyer);

        return Lists.newArrayList(mongoTemplate.find(query, PurchaseOrder.class));
    }

    private Criteria wherePayStatusIs(Integer payStatus){
        return where(PAYSTATUS).is(payStatus);
    }

    private Criteria whereBuyerIs(String buyer){
        return where("buyer").is(buyer);
    }

    private Criteria whereIdIs(String id){
        return where("id").is(id);
    }


    public void paidPaySlip(String poNumber) {
        Query query = queryBuyId(poNumber);
        query.fields().include(PAYSTATUS);
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
        mongoTemplate.updateFirst(queryBuyId(poNumber), update, PurchaseOrder.class);

    }
}
