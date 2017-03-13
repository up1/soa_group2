package com.grouptwo.zalada.billing.utils;

import com.grouptwo.zalada.billing.domain.PurchaseOrder;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentCatalog;
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm;
import org.apache.pdfbox.pdmodel.interactive.form.PDField;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.io.OutputStream;

public class PdfManager {


    private Resource pdfFile;
    private PDDocument pdfDocument;

    private PDAcroForm getAcroForm() {
        return acroForm;
    }

    private PDAcroForm acroForm;

    public PdfManager(Resource pdfFile) throws IOException {
        String fileName = pdfFile.getFilename();
        int i = pdfFile.getFilename().lastIndexOf('.');
        if (i > 0 && fileName.substring(i+1).equals("pdf")) {
            setPdfFile(pdfFile);
        }else {
            throw new IOException("File Type Not Allow");
        }

    }

    public void getFieldsName(){
        PDAcroForm acroForm = getAcroForm();
        for(PDField field :acroForm.getFields()){
            System.out.println(field.getPartialName());
        }
    }

    public void loadForm(){
        PDDocumentCatalog docCatalog = getPdfDocument().getDocumentCatalog();
        setAcroForm(docCatalog.getAcroForm());
    }

    public void loadFile() throws IOException {
        setPdfDocument(PDDocument.load(pdfFile.getInputStream()));
    }

    public void close() throws IOException {
        pdfDocument.close();
    }

    public ByteArrayOutputStream getFile() throws IOException {
        ByteArrayOutputStream  file = new ByteArrayOutputStream();
        pdfDocument.save(file);
        return file;
    }

    public void fillForm(String fieldName, String value) throws IOException {
        PDField field = getAcroForm().getField( fieldName );
        if( field != null ) {
            field.setValue(value);
        }
        else {
            System.err.println( "No field found with name:" + fieldName );
        }
    }

    public Resource getPdfFile() {
        return pdfFile;
    }

    private void setPdfFile(Resource pdfFile) {
        this.pdfFile = pdfFile;
    }

    private PDDocument getPdfDocument() {
        return pdfDocument;
    }

    private void setPdfDocument(PDDocument pdfDocument) {
        this.pdfDocument = pdfDocument;
    }

    private void setAcroForm(PDAcroForm acroForm) {
        this.acroForm = acroForm;
    }
}
