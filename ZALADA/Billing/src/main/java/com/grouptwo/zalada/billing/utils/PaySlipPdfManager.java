package com.grouptwo.zalada.billing.utils;

import com.grouptwo.zalada.billing.domain.PurchaseOrder;
import com.grouptwo.zalada.billing.exception.PaySlipException;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.pdf.Barcode128;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class PaySlipPdfManager extends PdfManager {
    private Log log;

    public PaySlipPdfManager(Resource pdfFile) throws IOException {
        super(pdfFile);
        log = LogFactory.getLog(PaySlipPdfManager.class.getName());
    }

    public void fillForm(PurchaseOrder purchaseOrder) throws PaySlipException {
        try{
            init();

            fillForm("poNumber", purchaseOrder.getId());
            fillForm("buyer", purchaseOrder.getBillingName());
            fillForm("buyDate", getDate(purchaseOrder.getBuyDate()));
            fillForm("payScheduled", getDate(purchaseOrder.getPayScheduled()));
            fillForm("tel", purchaseOrder.getTel());
            fillForm("email", purchaseOrder.getEmail());
            fillForm("totalPrice", purchaseOrder.getTotalPrice().toString() + " บาท");
            addBarcode(purchaseOrder.getId());

            getStamper().setFormFlattening(true);
            close();
        } catch (IOException | DocumentException e){
            log.info(e);
            throw new PaySlipException(e.getMessage());
        }
    }

    private void addBarcode(String poNumber) {
        try {
            Barcode128 code128 = new Barcode128();
            code128.setCode(poNumber.trim());
            code128.setCodeType(Barcode128.CODE128);
            Image code128Image = code128.createImageWithBarcode(getStamper().getOverContent(1), null, null);
            code128Image.setAbsolutePosition(150, 450);
            code128Image.scalePercent(125);

            getStamper().getOverContent(1).addImage(code128Image);
        } catch (Exception ex) {
            log.error(ex);
        }
    }

    private String getDate(Long timeStamp){
        Date date = new java.util.Date(timeStamp * 1000);
        LocalDate localDate = date.toInstant().atZone(ZoneId.of("Asia/Bangkok")).toLocalDate();
        return localDate.getDayOfMonth() + "/" + localDate.getMonthValue() + "/" + localDate.getYear();
    }
}
