package com.grouptwo.zalada.stockmanage.service;

import com.grouptwo.zalada.stockmanage.config.UploadProperties;
import com.grouptwo.zalada.stockmanage.domain.Product;
import com.grouptwo.zalada.stockmanage.exception.RepositoryException;
import com.grouptwo.zalada.stockmanage.exception.UploadException;
import com.grouptwo.zalada.stockmanage.repository.StockRepository;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private Log log = LogFactory.getLog(UploadService.class.getName());

    @Autowired
    public UploadService(UploadProperties properties, StockRepository stockRepository) {
        this.rootLocation = Paths.get(properties.getLocation());
        this.stockRepository = stockRepository;
    }

    public void uploadImage(MultipartFile file, String productId) throws UploadException {
        try {
            String owner = getUsername();
            if (file.isEmpty()) {
                throw new UploadException("Failed to store empty file " + file.getOriginalFilename());
            }

            Path uploadPath = this.rootLocation.resolve(file.getOriginalFilename());
            Files.copy(file.getInputStream(), uploadPath, REPLACE_EXISTING);

            String fileExtension = FilenameUtils.getExtension(uploadPath.getFileName().toString());

            Path newPath = uploadPath.resolveSibling(productId + "." + fileExtension);
            Files.move(uploadPath, newPath, REPLACE_EXISTING);

            Product product = new Product();
            String imagePath = newPath.toString();
            product.setImagePath(imagePath);
            stockRepository.updateProduct(owner, productId, product);
        } catch (Exception e) {
            log.error(e);
            throw new UploadException("Failed to store file " + file.getOriginalFilename());
        }
    }

    private String getUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    public Resource loadImage(String productId) throws RepositoryException{
        try {
            String owner = getUsername();
            Product product = stockRepository.findProductById(owner, productId);
            if(product == null){
                throw new RepositoryException("Product Not Found");
            }

            String imagePath = product.getImagePath();
            if(imagePath == null){
                throw new RepositoryException("This Product Is Not Has Image");
            }
            String fileName = FileUtils.getFile(imagePath).getName();
            Path file = rootLocation.resolve(fileName);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RepositoryException("Could not read file: " + fileName);
            }
        } catch (MalformedURLException e) {
            log.error(e);
            throw new RepositoryException("Could not read image of Product: " + productId);
        }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    public void init() throws UploadException {
        try {
            Files.createDirectory(rootLocation);
        } catch (IOException e) {
            log.error(e);
            throw new UploadException("Could not initialize storage");
        }
    }

}
