package com.grouptwo.zalada.stockmanage.controller;

import com.grouptwo.zalada.stockmanage.domain.Product;
import com.grouptwo.zalada.stockmanage.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class StockController {

    @Autowired
    private StockRepository stockRepository;

    public StockController(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    public StockController() {
    }

    @RequestMapping(value = "/product", method = RequestMethod.GET)
    public Page<Product> listProductByPage(Pageable pageable) {
        return stockRepository.findAll(pageable);
    }

    @RequestMapping(value = "/product", method = RequestMethod.POST)
    public void insertProduct(@RequestBody Product product) {
        stockRepository.insert(product);
    }

    @RequestMapping(value = "/product/{id}", method = RequestMethod.GET)
    public Product findProduct(@PathVariable String id) {
        return stockRepository.findById(id);
    }

    @RequestMapping(value = "/product/{id}", method = RequestMethod.PUT)
    public void updateProduct(@PathVariable  String id, @RequestBody Product upDateProduct) {
        stockRepository.update(id, upDateProduct);
    }
}

