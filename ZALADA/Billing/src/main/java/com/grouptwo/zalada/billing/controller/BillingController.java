package com.grouptwo.zalada.billing.controller;

import com.grouptwo.zalada.billing.domain.Product;
import com.grouptwo.zalada.billing.repository.BillingRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
}
