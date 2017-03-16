package com.grouptwo.zalada.stockmanage;

import com.grouptwo.zalada.stockmanage.config.UploadProperties;
import com.grouptwo.zalada.stockmanage.service.UploadService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableAutoConfiguration
@EnableConfigurationProperties(UploadProperties.class)
public class StockManageMain {

    public static void main(String ... args){
        SpringApplication.run(StockManageMain.class, args);
    }

    @Bean
    CommandLineRunner init(UploadService uploadService) {
        return (args) -> {
            uploadService.deleteAll();
            uploadService.init();
        };
    }
}
