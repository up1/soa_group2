package com.grouptwo.zalada.billing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class BillingMain {

    public static void  main (String... args){
        SpringApplication.run(BillingMain.class, args);
    }
}
