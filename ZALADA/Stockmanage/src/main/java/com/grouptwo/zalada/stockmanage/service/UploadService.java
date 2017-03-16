package com.grouptwo.zalada.stockmanage.service;

import com.grouptwo.zalada.stockmanage.config.UploadProperties;
import com.grouptwo.zalada.stockmanage.domain.Product;
import com.grouptwo.zalada.stockmanage.exception.RepositoryException;
import com.grouptwo.zalada.stockmanage.exception.RequestException;
import com.grouptwo.zalada.stockmanage.exception.UploadException;
import com.grouptwo.zalada.stockmanage.repository.StockRepository;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
public class UploadService {

    private final Path rootLocation;
    private final StockRepository stockRepository;

    @Autowired
    public UploadService(UploadProperties properties, StockRepository stockRepository) {
        this.rootLocation = Paths.get(properties.getLocation());
        this.stockRepository = stockRepository;
    }

    public void uploadImage(MultipartFile file, String productId) throws UploadException {
        try {
            if (file.isEmpty()) {
                throw new UploadException("Failed to store empty file " + file.getOriginalFilename());
            }

            //Upload a file
            Path uploadPath = this.rootLocation.resolve(file.getOriginalFilename());
            Files.copy(file.getInputStream(), uploadPath, REPLACE_EXISTING);

            //Get uploaded file's extension
            String fileExtension = FilenameUtils.getExtension(uploadPath.getFileName().toString());

            //Rename file to productId + uploaded file's extension
            Path newPath = uploadPath.resolveSibling(productId + "." + fileExtension);
            Files.move(uploadPath, newPath);

            //update product information
            Product product = new Product();
            String imagePath = newPath.toString();
            product.setImagePath(imagePath);
            stockRepository.updateProduct(productId, product);
        } catch (IOException e) {
            throw new UploadException("Failed to store file " + file.getOriginalFilename(), e);
        }
    }

    public Resource loadImage(String productId) throws UploadException, RepositoryException, RequestException {
        try {
            Product product = stockRepository.findProductById(productId);
            if(product == null){
                throw new RepositoryException("Product Not Found");
            }

            String imagePath = product.getImagePath();
            if(imagePath == null){
                throw new RequestException("This Product Is Not Has Image");
            }
            String fileName = FileUtils.getFile(imagePath).getName();
            Path file = rootLocation.resolve(fileName);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new UploadException("Could not read file: " + fileName);

            }
        } catch (MalformedURLException e) {
            throw new UploadException("Could not read image of Product: " + productId, e);
        }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    public void init() throws UploadException {
        try {
            Files.createDirectory(rootLocation);
        } catch (IOException e) {
            throw new UploadException("Could not initialize storage", e);
        }
    }

}
