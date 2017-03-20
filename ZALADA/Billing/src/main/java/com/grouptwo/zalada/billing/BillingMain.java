package com.grouptwo.zalada.billing;


import com.grouptwo.zalada.billing.domain.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableAutoConfiguration
public class BillingMain {

    public static void  main (String... args){
        SpringApplication.run(BillingMain.class, args);
    }
}
