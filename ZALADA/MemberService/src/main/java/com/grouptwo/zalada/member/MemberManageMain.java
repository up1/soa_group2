package com.grouptwo.zalada.member;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

@SpringBootApplication
@ComponentScan(basePackages = {"com.grouptwo.zalada.member", "com.auth0.spring.security.api"})
@EnableAutoConfiguration
@PropertySources({
        @PropertySource("classpath:application.properties"),
        @PropertySource("classpath:auth0.properties")
})
public class MemberManageMain {

    public static void main(String ... args){
        SpringApplication.run(MemberManageMain.class, args);
    }
}