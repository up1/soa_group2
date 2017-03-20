package com.grouptwo.zalada.counterservicemockup;

import android.media.AudioManager;
import android.media.ToneGenerator;

import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

/**
 * Created by kanathip on 20/3/2560.
 */

public class Repository {

    private RestTemplate restTemplate;

    public Repository(){
        restTemplate = new RestTemplate();
        restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
    }

    public ResponseEntity<Void> paySlip(String poNumber){
        String url = "http://139.59.102.212:9002/payslip/paid/" + poNumber;
        return restTemplate.exchange(url, HttpMethod.PATCH, null, Void.class);
    }

    public RestTemplate getRestTemplate() {
        return restTemplate;
    }

    public void setRestTemplate(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
}
