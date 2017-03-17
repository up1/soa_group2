package com.grouptwo.zalada.billing.controller;

import com.grouptwo.zalada.billing.domain.PurchaseOrder;
import com.grouptwo.zalada.billing.exception.QueryException;
import com.grouptwo.zalada.billing.exception.UpdateException;
import com.grouptwo.zalada.billing.repository.BillingRepository;
import com.grouptwo.zalada.billing.repository.SaleRepository;
import com.grouptwo.zalada.billing.utils.EmailValidator;
import com.grouptwo.zalada.billing.utils.PaySlipPdfManager;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.beans.IntrospectionException;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;

@RestController
public class BillingController {

    @Autowired
    private
    BillingRepository billingRepository;

    @Autowired
    SaleRepository saleRepository;

    @Autowired
    private
    EmailValidator emailValidator;

    @Value("classpath:zalada-pay-form.pdf")
    private Resource payForm;

    @RequestMapping(value = "/purchaseorder", method = RequestMethod.GET)
    public ArrayList findAllPurchaseOrder(@RequestParam(required = false, name = "page") Integer page,
                                          @RequestParam(required = false, defaultValue = "10", name = "size") Integer size) {
        if (page == null) {
            return billingRepository.findAllPurchaseOrder();
        }
        Pageable pageable = new PageRequest(page, size);
        return billingRepository.findAllPurchaseOrder(pageable);
    }

    @RequestMapping(value = "/purchaseorder/{id}/cancel", method = RequestMethod.PATCH)
    public ResponseEntity<Object> cancelPurchaseOrder(@PathVariable String id) {
        billingRepository.cancelPurchaseOrder(id);
        return new ResponseEntity<>("purchase cancel success", HttpStatus.OK);
    }

    @RequestMapping(value = "/purchaseorder", method = RequestMethod.POST)
    public ResponseEntity<String> createPurchaseOrder(@RequestBody PurchaseOrder purchaseOrder) {
        if (emailValidator.validate(purchaseOrder.getEmail())) {
            billingRepository.insertPurchaseOrder(purchaseOrder);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>("invalidate email", HttpStatus.BAD_REQUEST);
        }

    }

    @RequestMapping(value = "/purchaseorder/{id}", method = RequestMethod.GET)
    public PurchaseOrder findPurchaseOrder(@PathVariable String id) {
        return billingRepository.findById(id);
    }

    @RequestMapping(value = "/purchaseorder/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> updatePurchaseOrder(@PathVariable String id, @RequestBody PurchaseOrder purchaseOrder) {
        try {
            billingRepository.updatePurchaseOrder(id, purchaseOrder);
            return new ResponseEntity<>("Purchase Order is Updated", HttpStatus.OK);
        } catch (InvocationTargetException | IllegalAccessException | IntrospectionException e) {
            return new ResponseEntity<>("Error Message : " + e.getMessage() +
                    "\n Case : " + e.getCause().toString(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/payslip/{poNumber}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getPaySlip(@PathVariable String poNumber) {
        ByteArrayOutputStream paySlipFile;

        PurchaseOrder purchaseOrder = billingRepository.getPurchaseOrder(poNumber);
        if (purchaseOrder == null) {
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

    @RequestMapping(value = "/payslip/unpaid", method = RequestMethod.GET)
    public ArrayList getUnPaidPaySlip(@RequestParam(required = false, name = "page") Integer page,
                                      @RequestParam(required = false, defaultValue = "10", name = "size") Integer size) {
        if (page == null) {
            return billingRepository.findAllByPayStatus(PurchaseOrder.STATUS_CODE_NOT_PAY);
        }
        Pageable pageable = new PageRequest(page, size);
        return billingRepository.findAllByPayStatus(pageable, PurchaseOrder.STATUS_CODE_NOT_PAY);
    }

    @RequestMapping(value = "/payslip/paid", method = RequestMethod.GET)
    public ArrayList getPaidPaySlip(@RequestParam(required = false, name = "page") Integer page,
                                    @RequestParam(required = false, defaultValue = "10", name = "size") Integer size) {
        if (page == null) {
            return billingRepository.findAllByPayStatus(PurchaseOrder.STATUS_CODE_PAY);
        }
        Pageable pageable = new PageRequest(page, size);
        return billingRepository.findAllByPayStatus(pageable, PurchaseOrder.STATUS_CODE_PAY);
    }

    @RequestMapping(value = "/payslip/outoftime", method = RequestMethod.GET)
    public ArrayList getOutOfDatePaySlip(@RequestParam(required = false, name = "page") Integer page,
                                         @RequestParam(required = false, defaultValue = "10", name = "size") Integer size) {
        if (page == null) {
            return billingRepository.findAllByPayStatus(PurchaseOrder.STATUS_CODE_OUT_OF_TIME);
        }
        Pageable pageable = new PageRequest(page, size);
        return billingRepository.findAllByPayStatus(pageable, PurchaseOrder.STATUS_CODE_OUT_OF_TIME);
    }

    @RequestMapping(value = "/payslip/paid/{poNumber}", method = RequestMethod.GET)
    public ResponseEntity<String> PaidPaySlip(@PathVariable String poNumber) {
        try {
            billingRepository.paidPaySlip(poNumber);
            return new ResponseEntity<>("Thank you for shopping", HttpStatus.OK);
        } catch (QueryException | UpdateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
