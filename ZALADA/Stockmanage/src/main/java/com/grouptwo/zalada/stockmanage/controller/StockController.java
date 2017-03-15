package com.grouptwo.zalada.stockmanage.controller;

import com.grouptwo.zalada.stockmanage.domain.Product;
import com.grouptwo.zalada.stockmanage.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

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

    @RequestMapping(value = "/product/", method = RequestMethod.GET)
    public ArrayList findProductByPage(@RequestParam(required = false, name = "page")Integer page,
                                       @RequestParam(required = false, defaultValue = "10", name = "size") Integer size) {
        if(page == null){
            return (ArrayList) stockRepository.findAllProdcut();
        }
        Pageable pageable = new PageRequest(page, size);
        return stockRepository.findAllProduct(pageable);
    }

    @RequestMapping(value = "/product", method = RequestMethod.POST)
    public void insertProduct(@RequestBody Product product) {
        stockRepository.insertProduct(product);
    }

    @RequestMapping(value = "/product/{id}", method = RequestMethod.GET)
    public Product findProduct(@PathVariable String id) {
        return stockRepository.findProductById(id);
    }

    @RequestMapping(value = "/product/{id}", method = RequestMethod.PUT)
    public void updateProduct(@PathVariable  String id, @RequestBody Product upDateProduct) {
        stockRepository.updateProduct(id, upDateProduct);
    }

    @RequestMapping(value = "/product/{id}", method = RequestMethod.DELETE)
    public void deleteProduct(@PathVariable String id){
        stockRepository.deleteProduct(id);
    }

    @RequestMapping(value = "/category", method =  RequestMethod.GET)
    public ArrayList findAllCategory(@RequestParam(required = false, name = "page")Integer page,
                                     @RequestParam(required = false, defaultValue = "10", name = "size") Integer size) {
        if(page == null){
            return (ArrayList) stockRepository.findAllCategory();
        }
        Pageable pageable = new PageRequest(page, size);
        return stockRepository.findAllCategory(pageable);
    }
}

