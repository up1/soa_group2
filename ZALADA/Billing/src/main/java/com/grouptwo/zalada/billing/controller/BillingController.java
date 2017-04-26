package com.grouptwo.zalada.billing.controller;

import com.grouptwo.zalada.billing.domain.PurchaseOrder;
import com.grouptwo.zalada.billing.exception.QueryException;
import com.grouptwo.zalada.billing.exception.UpdateException;
import com.grouptwo.zalada.billing.repository.BillingRepository;
import com.grouptwo.zalada.billing.repository.SaleRepository;
import com.grouptwo.zalada.billing.utils.EmailValidator;
import com.grouptwo.zalada.billing.utils.PaySlipPdfManager;
import com.itextpdf.text.DocumentException;
import org.apache.juli.logging.Log;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.beans.IntrospectionException;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
public class BillingController {

    private final Logger logger;
    @Autowired
    private BillingRepository billingRepository;

    @Autowired
    SaleRepository saleRepository;

    @Autowired
    private EmailValidator emailValidator;

    @Value("classpath:zalada-pay-form.pdf")
    private Resource payForm;

    public BillingController(){
        logger = Logger.getLogger(BillingController.class.getName());
    }

    @RequestMapping(value = "/purchaseorder", method = RequestMethod.GET)
    public ArrayList findAllPurchaseOrder(@RequestParam(required = false, name = "page") Integer page,
                                          @RequestParam(required = false, defaultValue = "10", name = "size") Integer size) {

        String buyer = getUsername();

        if (page == null) {
            return billingRepository.findAllPurchaseOrder(buyer);
        }
        Pageable pageable = new PageRequest(page, size);
        return billingRepository.findAllPurchaseOrder(buyer, pageable);
    }

    private String getUsername(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @RequestMapping(value = "/purchaseorder/{id}/cancel", method = RequestMethod.PATCH)
    public ResponseEntity<Object> cancelPurchaseOrder(@PathVariable String id) {

        String buyer = getUsername();

        try {
            billingRepository.cancelPurchaseOrder(buyer, id);
        }catch (UpdateException e) {
            return new ResponseEntity<>("e", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("purchase cancel success", HttpStatus.OK);
    }

    @RequestMapping(value = "/purchaseorder", method = RequestMethod.POST)
    public ResponseEntity<String> createPurchaseOrder(@RequestBody PurchaseOrder purchaseOrder) {

        String buyer = getUsername();

        purchaseOrder.setBuyer(buyer);

        if (emailValidator.validate(purchaseOrder.getEmail())) {
            billingRepository.insertPurchaseOrder(purchaseOrder);
            return new ResponseEntity<>(purchaseOrder.getId(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("invalid email format", HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/purchaseorder/{id}", method = RequestMethod.GET)
    public PurchaseOrder findPurchaseOrder(@PathVariable String id) {

        String buyer = getUsername();

        return billingRepository.findById(buyer, id);
    }

    @RequestMapping(value = "/purchaseorder/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> updatePurchaseOrder(@PathVariable String id, @RequestBody PurchaseOrder purchaseOrder) {
        try {

            String buyer = getUsername();

            billingRepository.updatePurchaseOrder(buyer, id, purchaseOrder);
            return new ResponseEntity<>("Purchase Order is Updated", HttpStatus.OK);
        } catch (InvocationTargetException | IllegalAccessException | IntrospectionException e) {
            logger.log(Level.WARNING, e.getMessage());
            return new ResponseEntity<>("Error Message : " + e.getMessage() +
                    "\n Case : " + e.getCause().toString(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/payslip/{poNumber}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getPaySlip(@PathVariable String poNumber) {
        ByteArrayOutputStream paySlipFile;

        String buyer = getUsername();

        PurchaseOrder purchaseOrder = billingRepository.getPurchaseOrder(buyer, poNumber);
        if (purchaseOrder == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            PaySlipPdfManager pdfManager = new PaySlipPdfManager(payForm);
            pdfManager.fillForm(purchaseOrder);
            paySlipFile = pdfManager.getOutput();
        } catch (IOException | DocumentException e) {
            logger.log(Level.WARNING, e.getMessage());
            return new ResponseEntity<>(e.getMessage().getBytes(), HttpStatus.INTERNAL_SERVER_ERROR);
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

        String buyer = getUsername();

        if (page == null) {
            return billingRepository.findAllByPayStatus(buyer, PurchaseOrder.STATUS_CODE_NOT_PAY);
        }
        Pageable pageable = new PageRequest(page, size);
        return billingRepository.findAllByPayStatus(buyer, pageable, PurchaseOrder.STATUS_CODE_NOT_PAY);
    }

    @RequestMapping(value = "/payslip/paid", method = RequestMethod.GET)
    public ArrayList getPaidPaySlip(@RequestParam(required = false, name = "page") Integer page,
                                    @RequestParam(required = false, defaultValue = "10", name = "size") Integer size) {

        String buyer = getUsername();

        if (page == null) {
            return billingRepository.findAllByPayStatus(buyer, PurchaseOrder.STATUS_CODE_PAY);
        }
        Pageable pageable = new PageRequest(page, size);
        return billingRepository.findAllByPayStatus(buyer, pageable, PurchaseOrder.STATUS_CODE_PAY);
    }

    @RequestMapping(value = "/payslip/outoftime", method = RequestMethod.GET)
    public ArrayList getOutOfDatePaySlip(@RequestParam(required = false, name = "page") Integer page,
                                         @RequestParam(required = false, defaultValue = "10", name = "size") Integer size) {

        String buyer = getUsername();

        if (page == null) {
            return billingRepository.findAllByPayStatus(buyer, PurchaseOrder.STATUS_CODE_OUT_OF_TIME);
        }
        Pageable pageable = new PageRequest(page, size);
        return billingRepository.findAllByPayStatus(buyer, pageable, PurchaseOrder.STATUS_CODE_OUT_OF_TIME);
    }

    @RequestMapping(value = "/payslip/paid/{poNumber}", method = RequestMethod.PATCH)
    public ResponseEntity<String> paidPaySlip(@PathVariable String poNumber) {
        try {
            billingRepository.paidPaySlip(poNumber);
            return new ResponseEntity<>("Thank you for shopping", HttpStatus.OK);
        } catch (QueryException | UpdateException e) {
            logger.log(Level.WARNING, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
