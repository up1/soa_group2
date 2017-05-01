package com.grouptwo.zalada.stockmanage.controller;

import com.grouptwo.zalada.stockmanage.domain.Category;
import com.grouptwo.zalada.stockmanage.domain.Product;
import com.grouptwo.zalada.stockmanage.exception.RepositoryException;
import com.grouptwo.zalada.stockmanage.repository.StockRepository;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class StockController {

    @Autowired
    private StockRepository stockRepository;

    private Log log = LogFactory.getLog(StockController.class.getName());

    public StockController(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    public StockController() {
        // For Spring Boot
    }

    @RequestMapping(value = "/product", method = RequestMethod.GET)
    public List findProductByPage(@RequestParam(required = false, name = "page") Integer page,
                                  @RequestParam(required = false, defaultValue = "10", name = "size") Integer size) {

        String owner = getUsername();
        if (page == null) {
            return stockRepository.findAllProduct(owner);
        }
        Pageable pageable = new PageRequest(page, size);
        return stockRepository.findAllProduct(owner, pageable);
    }

    private String getUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @RequestMapping(value = "/product", method = RequestMethod.POST)
    public ResponseEntity<String> insertProduct(@RequestBody Product product) {
        String owner = getUsername();
        try {
            stockRepository.insertProduct(owner, product);
        } catch (RepositoryException e) {
            log.error(e);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(product.getId(), HttpStatus.OK);
    }

    @RequestMapping(value = "/product/{id}", method = RequestMethod.GET)
    public Product findProduct(@PathVariable String id) {
        String owner = getUsername();
        return stockRepository.findProductById(owner, id);
    }

    @RequestMapping(value = "/product/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> updateProduct(@PathVariable String id, @RequestBody Product upDateProduct) {

        String owner = getUsername();
        try {
            stockRepository.updateProduct(owner, id, upDateProduct);
        } catch (Exception e) {
            log.error(e);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @RequestMapping(value = "/product/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteProduct(@PathVariable String id) {
        String owner = getUsername();
        try {
            stockRepository.deleteProduct(owner, id);
        } catch (Exception e) {
            log.error(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @RequestMapping(value = "product/category/{categoryName}", method = RequestMethod.GET)
    public List findProductByCategory(@RequestParam(required = false, name = "page") Integer page,
                                      @RequestParam(required = false, defaultValue = "10", name = "size") Integer size,
                                      @PathVariable String categoryName) {
        String owner = getUsername();

        if (page == null) {
            return stockRepository.findAllProductByCategory(owner, categoryName);
        }
        Pageable pageable = new PageRequest(page, size);
        return stockRepository.findAllProductByCategory(owner, pageable, categoryName);
    }

    @RequestMapping(value = "/category", method = RequestMethod.POST)
    public ResponseEntity<String> insertCategory(@RequestBody Category category) {
        stockRepository.insertCategory(category);
        return new ResponseEntity<>(category.getId(), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/category", method = RequestMethod.GET)
    public List findCategoryByPage(@RequestParam(required = false, name = "page") Integer page,
                                   @RequestParam(required = false, defaultValue = "10", name = "size") Integer size) {
        if (page == null) {
            return stockRepository.findAllCategory();
        }
        Pageable pageable = new PageRequest(page, size);
        return stockRepository.findAllCategory(pageable);
    }

    @RequestMapping(value = "/category/{name}", method = RequestMethod.GET)
    public Category findCategory(@PathVariable String name) {
        return stockRepository.findCategoryByName(name);
    }

    @RequestMapping(value = "/category/{name}", method = RequestMethod.PUT)
    public void updateCategory(@PathVariable String name, @RequestBody Category updateCategory) {
        stockRepository.updateCategory(name, updateCategory);
    }

    @RequestMapping(value = "category/{name}", method = RequestMethod.DELETE)
    public void removeCategory(@PathVariable String name) {
        stockRepository.deleteCategory(name);
    }
}

