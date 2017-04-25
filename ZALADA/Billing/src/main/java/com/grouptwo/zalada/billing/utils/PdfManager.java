package com.grouptwo.zalada.billing.utils;

import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.AcroFields;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.Set;

public class PdfManager {


    private Resource pdfFile;
    private PdfReader reader;
    private PdfStamper stamper;
    private ByteArrayOutputStream output;

    PdfManager(Resource pdfFile) throws IOException {

        String fileName = pdfFile.getFilename();
        int i = pdfFile.getFilename().lastIndexOf('.');
        if (i > 0 && fileName.substring(i + 1).equals("pdf")) {
            setPdfFile(pdfFile);
        } else {
            throw new IOException("File Type Not Allow");
        }
    }

    private void setPdfFile(Resource pdfFile) {
        this.pdfFile = pdfFile;
    }

    private Resource getPdfFile() {
        return pdfFile;
    }

    private void loadFile() throws IOException {
        setReader(new PdfReader(getPdfFile().getInputStream()));
    }

    void init() throws IOException, DocumentException {
        loadFile();

        setOutput(new ByteArrayOutputStream());

        loadStamper(getOutput());
    }

    private void closeFile() {
        reader.close();
    }

    private void setReader(PdfReader reader) {
        this.reader = reader;
    }

    private PdfReader getReader() {
        return reader;
    }

    void fillForm(String key, String value) throws IOException, DocumentException {
        AcroFields form = stamper.getAcroFields();
        form.setField(key, value);
    }

    private void loadStamper(ByteArrayOutputStream byteArrayOutputStream) throws IOException, DocumentException {
        PdfStamper stamper = new PdfStamper(getReader(), byteArrayOutputStream);
        setStamper(stamper);
    }

    private void setStamper(PdfStamper stamper) {
        this.stamper = stamper;
    }

    PdfStamper getStamper() {
        return stamper;
    }

    private void closeStamper() throws IOException, DocumentException {
        getStamper().close();
    }

    void close() throws IOException, DocumentException {
        closeStamper();
        closeFile();
    }

    private void setOutput(ByteArrayOutputStream output) {
        this.output = output;
    }

    public ByteArrayOutputStream getOutput() {
        return output;
    }


}
