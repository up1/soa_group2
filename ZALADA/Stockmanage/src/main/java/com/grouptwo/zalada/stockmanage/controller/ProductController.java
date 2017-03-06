package com.grouptwo.zalada.stockmanage.controller;

import com.grouptwo.zalada.stockmanage.domain.Product;
import com.grouptwo.zalada.stockmanage.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {
<<<<<<< HEAD
=======

>>>>>>> origin/zalada-service-stockmanage

    @Autowired
    private ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductController() {
    }

    @RequestMapping(value = "/product", method = RequestMethod.GET)
    public Page<Product> listProductByPage(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @RequestMapping(value = "/product", method = RequestMethod.POST)
    public void insertProduct(@RequestBody Product product) {
        productRepository.insert(product);
    }

    @RequestMapping(value = "/product/{id}", method = RequestMethod.GET)
    public Product findProduct(@PathVariable String id) {
        return productRepository.findById(id);
    }

    @RequestMapping(value = "/product/{id}", method = RequestMethod.PUT)
    public void updateProduct(@PathVariable  String id, @RequestBody Product upDateProduct) {
        productRepository.update(id, upDateProduct);
    }
}

