package com.grouptwo.zalada.billing.repository;

import com.grouptwo.zalada.billing.domain.Bill;
import com.grouptwo.zalada.billing.domain.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Repository
public class BillingRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    RestTemplate restTemplate;


    public Bill findById(String id){
        return mongoTemplate.findOne(getQueryId(id), Bill.class, Bill.COLLECTION_NAME);
    }

    public Page<Bill> findAll(Pageable pageable){
        Query query = new Query().with(pageable);
        List<Bill> stories = mongoTemplate.find(query, Bill.class);
        long total = mongoTemplate.count(query, Product.class);
        return new PageImpl<>(stories, pageable, total);
    }


    public void insert(Bill bill){
        Long timestamp = getTimeStamp();
        bill.setBuyDate(timestamp);
        mongoTemplate.insert(bill);
    }


    public void updateStatus(Bill bill){
        Query query = getQueryId(bill.getId());
        int billStatus = bill.getBillStatus();
        Update update = new Update().set("billStatus", billStatus);
        if(billStatus == Bill.STATUSCODE_PAY){
            update.set("paidDate", getTimeStamp());
        }
        mongoTemplate.updateFirst(query, update, Bill.class);
    }


    private Long getTimeStamp(){
        return System.currentTimeMillis() / 1000L;
    }

    private Query getQueryId(String id){
        return new Query(where("id").is(id));
    }
}
