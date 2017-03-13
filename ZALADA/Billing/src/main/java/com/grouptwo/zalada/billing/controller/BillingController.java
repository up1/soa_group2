package com.grouptwo.zalada.billing.controller;

import com.grouptwo.zalada.billing.PaySlipPdfManager;
import com.grouptwo.zalada.billing.domain.Cart;
import com.grouptwo.zalada.billing.domain.PurchaseOrder;
import com.grouptwo.zalada.billing.repository.BillingRepository;
import com.grouptwo.zalada.billing.repository.SaleRepository;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@RestController
public class BillingController {

    @Autowired
    private
    BillingRepository billingRepository;

    @Autowired
    SaleRepository saleRepository;

    @Value("classpath:zalada-pay-form.pdf")
    private Resource payForm;


    @RequestMapping(value = "/billing/purchaseorder", method = RequestMethod.GET)
    public Page<PurchaseOrder> listBillByPage(Pageable pageable){
        return billingRepository.findAll(pageable);
    }

    //TODO Check email pattern
    @RequestMapping(value = "billing/purchaseorder", method = RequestMethod.POST)
    public ResponseEntity createPurchaseOrder(@RequestBody PurchaseOrder purchaseOrder){
        billingRepository.insert(purchaseOrder);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/billing/purchaseorder/{id}", method = RequestMethod.GET)
    public PurchaseOrder findBill(@PathVariable String id){
        return billingRepository.findById(id);
    }

    @RequestMapping(value = "billing/payslip/{poNumber}", method = RequestMethod.PATCH)
    public ResponseEntity<String> updatePurchaseOrder(@RequestBody PurchaseOrder purchaseOrder){
        if(purchaseOrder.getPayStatus() == null && purchaseOrder.getId() != null){
            billingRepository.updateStatus(purchaseOrder);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value="billing/payslip/{poNumber}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getPaySlip(@PathVariable String poNumber){
        ByteArrayOutputStream paySlipFile;

        PurchaseOrder purchaseOrder = billingRepository.getPurchaseOrder(poNumber);
        if(purchaseOrder == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            PaySlipPdfManager pdfManager = new PaySlipPdfManager(payForm);
            pdfManager.loadFile();
            pdfManager.loadForm();
            pdfManager.fillForm(purchaseOrder);
            paySlipFile = pdfManager.getFile();
            pdfManager.close();
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage().getBytes(), HttpStatus.BAD_GATEWAY);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        String filename = "payslip.pdf";
        headers.setContentDispositionFormData(filename, filename);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        return new ResponseEntity<>(paySlipFile.toByteArray(), headers, HttpStatus.OK);
    }
}
