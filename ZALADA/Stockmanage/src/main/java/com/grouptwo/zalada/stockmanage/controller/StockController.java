package com.grouptwo.zalada.stockmanage.controller;

import com.google.common.annotations.GwtCompatible;
import com.grouptwo.zalada.stockmanage.domain.Category;
import com.grouptwo.zalada.stockmanage.domain.Product;
import com.grouptwo.zalada.stockmanage.repository.StockRepository;
import jdk.nashorn.internal.ir.RuntimeNode;
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

    @RequestMapping(value = "/product", method = RequestMethod.GET)
    public ArrayList findProductByPage(@RequestParam(required = false, name = "page")Integer page,
                                       @RequestParam(required = false, defaultValue = "10", name = "size") Integer size) {
        if(page == null){
            return (ArrayList) stockRepository.findAllProduct();
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

    @RequestMapping(value = "product/category/{categoryName}", method = RequestMethod.GET)
    public ArrayList findProductByCategory(@RequestParam(required = false, name = "page") Integer page,
                                       @RequestParam(required = false, defaultValue = "10", name = "size") Integer size,
                                           @PathVariable String categoryName) {
        if(page == null){
            return (ArrayList) stockRepository.findAllProductByCategory(categoryName);
        }
        Pageable pageable = new PageRequest(page, size);
        return stockRepository.findAllProductByCategory(pageable, categoryName);
    }

    @RequestMapping(value = "/category", method = RequestMethod.POST)
    public void insertCategory(@RequestBody Category category) { stockRepository.insertCategory(category); }

    @RequestMapping(value = "/category", method =  RequestMethod.GET)
    public ArrayList findCategoryByPage(@RequestParam(required = false, name = "page")Integer page,
                                       @RequestParam(required = false, defaultValue = "10", name = "size") Integer size) {
        if(page == null){
            return (ArrayList) stockRepository.findAllCategory();
        }
        Pageable pageable = new PageRequest(page, size);
        return stockRepository.findAllCategory(pageable);
    }

    @RequestMapping(value = "/category/{name}", method = RequestMethod.GET)
    public Category findCategory(@PathVariable String name) { return stockRepository.findCategoryByName(name); }

    @RequestMapping(value = "/category/{name}", method = RequestMethod.PUT)
    public void updateCategory(@PathVariable String name, @RequestBody Category updateCategory) {
        stockRepository.updateCategory(name, updateCategory);
    }

    @RequestMapping(value = "category/{name}", method = RequestMethod.DELETE)
    public void removeCategory(@PathVariable String name) {
        stockRepository.deleteCategory(name);
    }
}
