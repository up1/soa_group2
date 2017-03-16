package com.grouptwo.zalada.sale.controller;

import com.grouptwo.zalada.sale.domain.Category;
import com.grouptwo.zalada.sale.domain.Product;
import com.grouptwo.zalada.sale.repository.SaleRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "*")
public class SaleController {

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

    /*  insert */
    @RequestMapping(value = "/product", method = RequestMethod.POST)
    public void insertProduct(@RequestBody Product product) {
        saleRepository.insertProduct(product);
    }

    @RequestMapping(value = "/category", method = RequestMethod.POST)
    public void insertCategory(@RequestBody Category category) { saleRepository.insertCategory(category); }


}
