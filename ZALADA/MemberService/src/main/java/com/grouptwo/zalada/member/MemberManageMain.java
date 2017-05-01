package com.grouptwo.zalada.member;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class MemberManageMain {

    public MemberManageMain(){
        //Spring needs public constructor for running
    }

    public static void main(String ... args){
        SpringApplication.run(MemberManageMain.class, args);
    }
}