package com.grouptwo.zalada.billing.repository;

import com.grouptwo.zalada.billing.domain.Product;
import com.grouptwo.zalada.billing.domain.PurchaseOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Repository
public class BillingRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public PurchaseOrder findById(String id){
        return mongoTemplate.findOne(getQueryId(id), PurchaseOrder.class, PurchaseOrder.COLLECTION_NAME);
    }

    public Page<PurchaseOrder> findAll(Pageable pageable){
        Query query = new Query().with(pageable);
        List<PurchaseOrder> stories = mongoTemplate.find(query, PurchaseOrder.class);
        long total = mongoTemplate.count(query, Product.class);
        return new PageImpl<>(stories, pageable, total);
    }
    public void insert(PurchaseOrder purchaseOrder){
        Long timestamp = getTimeStamp();
        purchaseOrder.setBuyDate(timestamp);
        purchaseOrder.setPayScheduled(timestamp + 86400);
        mongoTemplate.save(purchaseOrder);
    }

    public PurchaseOrder removePurchaseOrder(String id){
        return mongoTemplate.findAndRemove(getQueryId(id), PurchaseOrder.class);

    }


    public void updateStatus(PurchaseOrder purchaseOrder){
        Query query = new Query(where("id").is(purchaseOrder.getId()));
        int billStatus = purchaseOrder.getPayStatus();
        Update update = new Update().set("billStatus", billStatus);
        if(billStatus == PurchaseOrder.STATUSCODE_PAY){
            update.set("paidDate", getTimeStamp());
        }
        mongoTemplate.updateFirst(query, update, PurchaseOrder.class);
    }

    public PurchaseOrder getPurchaseOrder(String poNumber){
        Query query = new Query(where("id").is(poNumber));
        return mongoTemplate.findOne(query, PurchaseOrder.class);
    }


    private Long getTimeStamp(){
        return System.currentTimeMillis() / 1000L;
    }

    private Query getQueryId(String id){
        return new Query(where("id").is(id));
    }
}
