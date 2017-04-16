package com.grouptwo.zalada.sale.controller;

import com.grouptwo.zalada.sale.domain.Cart;
import com.grouptwo.zalada.sale.domain.Category;
import com.grouptwo.zalada.sale.domain.Product;
import com.grouptwo.zalada.sale.domain.PurchaseOrder;
import com.grouptwo.zalada.sale.repository.SaleRepository;
import jdk.nashorn.internal.ir.RuntimeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

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

    @RequestMapping(value = "/sale/category/{categoryName}", method = RequestMethod.GET)
    public ArrayList findProductByCategory(@RequestParam(required = false, name = "page") Integer page,
                                           @RequestParam(required = false, defaultValue = "10", name = "size") Integer size,
                                           @PathVariable String categoryName) {
        if(page == null){
            return (ArrayList) saleRepository.findAllProductByCategory(categoryName);
        }
        Pageable pageable = new PageRequest(page, size);
        return saleRepository.findAllProductByCategory(pageable, categoryName);
    }

    @RequestMapping(value = "/cart", method = RequestMethod.POST)
    public ResponseEntity<String> insertCart(@RequestParam(name = "userType") Integer userType,
                                             @RequestParam(required = false, name = "userName") String userName){
        if(userName == null && userType == 0){
            return saleRepository.insertCart(userType);
        }else if(userType == 1){
            return saleRepository.insertCart(userType, userName);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/cart/{cartId}", method = RequestMethod.GET)
    public Cart findCart(@PathVariable String cartId){
        return saleRepository.findCartById(cartId);
    }

    @RequestMapping(value = "/cart/{cartId}", method = RequestMethod.POST)
    public void addCart(@PathVariable String cartId,
                        @RequestParam(name = "productId") String productId,
                        @RequestParam(name = "amount") Integer amount) {
        saleRepository.addCart(cartId, productId, amount);
    }

    @RequestMapping(value = "/cart/{cartId}", method = RequestMethod.PUT)
    public void updateCart(@PathVariable String cartId,
                           @RequestBody Cart updateCart){
        saleRepository.updateCart(cartId, updateCart);
    }

    @RequestMapping(value = "/cart/{cartId}/{productId}", method = RequestMethod.PATCH)
    public void updateAmount(@PathVariable String cartId,
                             @PathVariable String productId,
                             @RequestParam(name = "amount") Integer amount){
        saleRepository.updateAmount(cartId, productId, amount);
    }
}
