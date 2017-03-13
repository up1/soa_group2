package com.grouptwo.zalada.billing.utils;

import com.grouptwo.zalada.billing.domain.PurchaseOrder;
import com.grouptwo.zalada.billing.utils.PdfManager;
import org.springframework.core.io.Resource;

import java.io.IOException;

/**
 * Created by new_z on 12/03/2017.
 */
public class PaySlipPdfManager extends PdfManager

{
    public PaySlipPdfManager(Resource pdfFile) throws IOException {
        super(pdfFile);
    }

    public void fillForm(PurchaseOrder purchaseOrder) throws IOException {
        fillForm("invoiceId", purchaseOrder.getId());
    }
}
