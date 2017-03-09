package com.grouptwo.zalada.billing.controller;

import com.grouptwo.zalada.billing.domain.Bill;
import com.grouptwo.zalada.billing.domain.Product;
import com.grouptwo.zalada.billing.repository.BillingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class BillingController {

    @Autowired
    BillingRepository billingRepository;

    @RequestMapping(value = "/billing", method = RequestMethod.GET)
    public String getString(){
        return "";
    }

    @RequestMapping(value = "billing/unpaid", method = RequestMethod.POST)
    public ResponseEntity<String> createNewBill(@RequestBody Bill bill){
        bill.setBillStatus(0);
        billingRepository.insert(bill);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "billing/pay", method = RequestMethod.PATCH)
    public ResponseEntity<String> updateBillStatus(@RequestBody Bill bill){
        if(bill.getBillStatus() == null && bill.getId() != null){
            billingRepository.updateStatus(bill);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
