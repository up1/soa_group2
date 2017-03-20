package com.grouptwo.zalada.stockmanage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class StockManageMain {

    public static void main(String ... args){
        SpringApplication.run(StockManageMain.class, args);
    }

}
