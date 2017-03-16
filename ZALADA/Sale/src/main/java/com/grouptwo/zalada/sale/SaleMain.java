package com.grouptwo.zalada.sale;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class SaleMain {

    public static void main(String... args){
        SpringApplication.run(SaleMain.class, args);
    }
}
