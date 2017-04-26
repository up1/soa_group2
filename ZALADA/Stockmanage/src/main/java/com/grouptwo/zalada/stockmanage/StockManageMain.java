package com.grouptwo.zalada.stockmanage;

import com.grouptwo.zalada.stockmanage.config.UploadProperties;
import com.grouptwo.zalada.stockmanage.domain.Category;
import com.grouptwo.zalada.stockmanage.repository.StockRepository;
import com.grouptwo.zalada.stockmanage.service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.ArrayList;

@SpringBootApplication
@EnableAutoConfiguration
@EnableConfigurationProperties(UploadProperties.class)
public class StockManageMain {

    private static boolean CLEAR = true;
    public static void main(String ... args){
        SpringApplication.run(StockManageMain.class, args);
    }

    @Autowired
    private MongoTemplate mongoTemplate;

    @Bean
    CommandLineRunner init(UploadService uploadService, StockRepository stockRepository) {
        return args -> {
            if(CLEAR){
                uploadService.deleteAll();
                uploadService.init();
                mongoTemplate.getDb().dropDatabase();
                initData(stockRepository);
            }
        };
    }

    private void initData(StockRepository stockRepository){

        String mobileAccessory = "Mobile Accessory";

        Category mobileParentCategory = new Category();
        mobileParentCategory.setName("Mobile Phone and Tablet");
        ArrayList<String> mobileChildren = new ArrayList<>();
        mobileChildren.add("Mobile Phone");
        mobileChildren.add("Tablet");
        mobileChildren.add(mobileAccessory);
        mobileParentCategory.setChildren(mobileChildren);
        stockRepository.insertCategory(mobileParentCategory);

        Category mobileCategory = new Category();
        mobileCategory.setName("Mobile Phone");
        ArrayList<String> parent = new ArrayList<>();
        parent.add("Mobile Phone and Tablet");
        mobileCategory.setParents(parent);
        stockRepository.insertCategory(mobileCategory);

        Category tabletCategory = new Category();
        tabletCategory.setName("Tablet");
        tabletCategory.setParents(parent);
        stockRepository.insertCategory(tabletCategory);

        Category mobileAccCategory = new Category();
        mobileAccCategory.setName(mobileAccessory);
        mobileAccCategory.setParents(parent);
        ArrayList<String> accChildren = new ArrayList<>();
        accChildren.add("Backup Battery");
        accChildren.add("Battery and Charging Accessory");
        accChildren.add("Mobile Case");
        mobileAccCategory.setChildren(accChildren);
        stockRepository.insertCategory( mobileAccCategory);

        parent.add(mobileAccessory);
        Category backupBatteryCategory  = new Category();
        backupBatteryCategory.setName("Backup Battery");
        backupBatteryCategory.setParents(parent);
        stockRepository.insertCategory( backupBatteryCategory);

        Category batteryCategory = new Category();
        batteryCategory.setName("Battery and Charging Accessory");
        batteryCategory.setParents(parent);
        stockRepository.insertCategory( batteryCategory);

        Category caseCategory = new Category();
        caseCategory.setName("Mobile Case");
        caseCategory.setParents(parent);
        stockRepository.insertCategory( caseCategory);
    }
}
