package com.grouptwo.zalada.member;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class MemberManageMain {

    public MemberManageMain(){
        //Needs a constructor
    }

    public static void main(String ... args){
        SpringApplication.run(MemberManageMain.class, args);
    }
}