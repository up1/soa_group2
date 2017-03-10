package com.grouptwo.zalada.billing.controller;

import com.grouptwo.zalada.billing.domain.Bill;
import com.grouptwo.zalada.billing.domain.Product;
import com.grouptwo.zalada.billing.repository.BillingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
public class BillingController {

    @Autowired
    BillingRepository billingRepository;

    @RequestMapping(value = "/billing", method = RequestMethod.GET)
    public Page<Bill> listBillByPage(Pageable pageable){
        return billingRepository.findAll(pageable);
    }

    @RequestMapping(value = "/billing/{id}", method = RequestMethod.GET)
    public Bill findBill(@PathVariable String id){
        return billingRepository.findById(id);
    }

    @RequestMapping(value = "billing/unpaid", method = RequestMethod.POST)
    public ResponseEntity<String> createNewBill(@RequestBody Bill bill){
        bill.setBillStatus(0);
        billingRepository.insert(bill);
        return new ResponseEntity<>(bill.getId(), HttpStatus.OK);
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
