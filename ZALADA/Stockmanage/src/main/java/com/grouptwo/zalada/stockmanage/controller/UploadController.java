package com.grouptwo.zalada.stockmanage.controller;


import com.grouptwo.zalada.stockmanage.exception.RepositoryException;
import com.grouptwo.zalada.stockmanage.exception.RequestException;
import com.grouptwo.zalada.stockmanage.exception.UploadException;
import com.grouptwo.zalada.stockmanage.service.UploadService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Controller
@CrossOrigin(origins = "*")
public class UploadController {

    private final UploadService uploadService;
    private Log log = LogFactory.getLog(UploadController.class.getName());

    @Autowired
    public UploadController(UploadService uploadService) {
        this.uploadService = uploadService;

    }

    @RequestMapping(value = "/product/image", method = RequestMethod.POST)
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("productId") String productId) {
        try {
            uploadService.uploadImage(file, productId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (UploadException e) {
            return new ResponseEntity<>(e.getMessage() + "\n" + e.getCause(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/product/image/", method = RequestMethod.GET)
    public ResponseEntity downloadImage(@RequestParam String productId) {
        Resource file;
        try {
            file = uploadService.loadImage(productId);
            return ResponseEntity
                    .ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                    .body(file);
        } catch (UploadException e) {
            return new ResponseEntity<>(e.getMessage() + "\n" + e.getCause(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (RepositoryException | RequestException e) {
            return new ResponseEntity<>(e.getMessage() + "\n" + e.getCause(), HttpStatus.BAD_REQUEST);
        }
    }
}
