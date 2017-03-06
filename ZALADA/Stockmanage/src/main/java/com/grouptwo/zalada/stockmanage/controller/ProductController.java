package com.grouptwo.zalada.stockmanage.controller;

import com.grouptwo.zalada.stockmanage.domain.Product;
import com.grouptwo.zalada.stockmanage.repository.ProductRepository;
import com.grouptwo.zalada.stockmanage.repository.ProductRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProductController implements ProductRepositoryCustom {

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
        return productRepository.findOne(id);
    }

    @RequestMapping(value = "/product/{id}", method = RequestMethod.PUT)
    @Override
    public void updateProduct(@PathVariable  String id, @RequestBody Product upDateProduct) {
        if (!upDateProduct.getId().equals(id) && !productRepository.exists(id))
            return;
        Long timestamp = System.currentTimeMillis() / 1000L;

        upDateProduct.setEditDate(timestamp);

        productRepository.save(upDateProduct);
    }
}
