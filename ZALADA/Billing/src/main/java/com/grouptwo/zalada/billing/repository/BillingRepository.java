package com.grouptwo.zalada.billing.repository;

import com.grouptwo.zalada.billing.domain.Bill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Repository
public class BillingRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    RestTemplate restTemplate;

    public void insert(Bill bill){
        Long timestamp = getTimeStamp();
        bill.setBuyDate(timestamp);
        mongoTemplate.insert(bill);
    }


    public void updateStatus(Bill bill){
        Query query = new Query(where("id").is(bill.getId()));
        int billStatus = bill.getBillStatus();
        Update update = new Update().set("billStatus", billStatus);
        if(isPaidStatus(billStatus)){
            update.set("paidDate", getTimeStamp());
        }
        mongoTemplate.updateFirst(query, update, Bill.class);
    }

    private boolean isPaidStatus(int statusCode){
        return statusCode == 1;
    }

    private Long getTimeStamp(){
        return System.currentTimeMillis() / 1000L;
    }

}
