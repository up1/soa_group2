package com.grouptwo.zalada.member;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

@SpringBootApplication
@EnableAutoConfiguration
@PropertySources({@PropertySource("classpath:application.properties")})
public class MemberManageMain {

    public static void main(String ... args){
        SpringApplication.run(MemberManageMain.class, args);
    }
}