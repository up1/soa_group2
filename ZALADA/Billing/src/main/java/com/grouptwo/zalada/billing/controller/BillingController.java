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
    BillingRepository billingRepository;

    @Autowired
    SaleRepository saleRepository;

    @RequestMapping(value = "/billing", method = RequestMethod.GET)
    public Page<Bill> listBillByPage(Pageable pageable){
        return billingRepository.findAll(pageable);
    }

    @Value("classpath:zalada-pay-form.pdf")
    private Resource payForm;

    //TODO Check email pattern
    @RequestMapping(value = "billing/purchaseOrder", method = RequestMethod.POST)
    public ResponseEntity createPurchaseOrder(@RequestBody Cart cart, @RequestParam String email, @RequestParam String deliveryAddress){
        PurchaseOrder purchaseOrder = new PurchaseOrder(cart);
        purchaseOrder.setPayStatus(0);
        purchaseOrder.setDeliveryAddress(deliveryAddress);
        billingRepository.insert(purchaseOrder);
        return new ResponseEntity<>(purchaseOrder, HttpStatus.OK);
    }
        return billingRepository.findById(id);
    public Bill findBill(@PathVariable String id){
    @RequestMapping(value = "/billing/{id}", method = RequestMethod.GET)
    }

    @RequestMapping(value = "billing/purchaseOrder", method = RequestMethod.PATCH)
    public ResponseEntity<String> updatePurchaseOrder(@RequestBody PurchaseOrder purchaseOrder){
        if(purchaseOrder.getPayStatus() == null && purchaseOrder.getId() != null){
            billingRepository.updateStatus(purchaseOrder);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "billing/payslip/{poNumber}", method = RequestMethod.PATCH)
    public void payPurchase(@PathVariable String poNumber){

    }

    @RequestMapping(value="billing/payslip/{poNumber}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getPaySlip(@PathVariable String poNumber){
        ByteArrayOutputStream paySlipFile = null;

        PurchaseOrder purchaseOrder = billingRepository.getPurchaseOrder(poNumber);
        if(purchaseOrder.getId().equals(null)){
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
            return new ResponseEntity<>(e.getMessage().getBytes(), HttpStatus.BAD_REQUEST);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        String filename = "payslip.pdf";
        headers.setContentDispositionFormData(filename, filename);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        return new ResponseEntity<>(paySlipFile.toByteArray(), headers, HttpStatus.OK);
    }
}
