package com.grouptwo.zalada.sale.controller;

import com.grouptwo.zalada.sale.domain.Category;
import com.grouptwo.zalada.sale.domain.Product;
import com.grouptwo.zalada.sale.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "*")
public class SaleController {

    @Autowired
    private SaleRepository saleRepository;

    public SaleController(SaleRepository saleRepository) {
        this.saleRepository = saleRepository;
    }

    public SaleController() {

    }

    @RequestMapping(value = "/sale", method = RequestMethod.GET)
    public ArrayList findProductByPage(@RequestParam(required = false, name = "page")Integer page,
                                       @RequestParam(required = false, defaultValue = "10", name = "size") Integer size) {
        if(page == null){
            return (ArrayList) saleRepository.findAllProduct();
        }
        Pageable pageable = new PageRequest(page, size);
        return saleRepository.findAllProduct(pageable);
    }

    @RequestMapping(value = "/sale/{id}", method = RequestMethod.GET)
    public Product findProduct(@PathVariable String id) {
        return saleRepository.findProductById(id);
    }

    @RequestMapping(value = "sale/category/{categoryName}", method = RequestMethod.GET)
    public ArrayList findProductByCategory(@RequestParam(required = false, name = "page") Integer page,
                                           @RequestParam(required = false, defaultValue = "10", name = "size") Integer size,
                                           @PathVariable String categoryName) {
        if(page == null){
            return (ArrayList) saleRepository.findAllProductByCategory(categoryName);
        }
        Pageable pageable = new PageRequest(page, size);
        return saleRepository.findAllProductByCategory(pageable, categoryName);
    }


}
