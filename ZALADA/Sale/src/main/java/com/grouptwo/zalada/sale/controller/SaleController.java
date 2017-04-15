package com.grouptwo.zalada.sale.controller;

import com.grouptwo.zalada.sale.domain.Cart;
import com.grouptwo.zalada.sale.domain.Product;
import com.grouptwo.zalada.sale.domain.PurchaseOrder;
import com.grouptwo.zalada.sale.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
            return new ResponseEntity<>(saleRepository.insertCart(userType), HttpStatus.CREATED);
        }else if(userType == 1){
            return new ResponseEntity<>(saleRepository.insertCart(userType, userName), HttpStatus.CREATED);
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

    @RequestMapping(value = "/buyhistory", method = RequestMethod.POST)
    public ResponseEntity<String> insertPurchaseOrder(@RequestBody PurchaseOrder purchaseOrder){
        return saleRepository.insertPurchaseOrder(purchaseOrder);
    }

    @RequestMapping(value = "/buyhistory/{memberId}", method = RequestMethod.GET)
    public ArrayList findPurchaseOrderList(@PathVariable String memberId,
                                           @RequestParam(required = false, name = "page")Integer page,
                                           @RequestParam(required = false, defaultValue = "10", name = "size") Integer size){
        if(page == null){
            return saleRepository.findPurchaseOrderList(memberId);
        }
        Pageable pageable = new PageRequest(page, size);
        return saleRepository.findPurchaseOrderList(pageable, memberId);
    }

    @RequestMapping(value = "/buyhistory/{memberId}/{poNumber}", method = RequestMethod.GET)
    public PurchaseOrder findPurchaseOrder(@PathVariable String memberId,
                                           @PathVariable String poNumber){
        return saleRepository.findPurchaseOrder(memberId, poNumber);
    }

    @RequestMapping(value = "/salehistory", method = RequestMethod.POST)
    public ResponseEntity<ArrayList> queryPurchaseOrder(@RequestBody PurchaseOrder purchaseOrder){
        return saleRepository.queryPurchaseOrder(purchaseOrder);
    }

    @RequestMapping(value = "/salehistory/member/{owner}", method = RequestMethod.GET)
    public ArrayList findSaleHistoryListByOwner(@PathVariable String owner,
                                                         @RequestParam(required = false, name = "page")Integer page,
                                                         @RequestParam(required = false, defaultValue = "10", name = "size") Integer size){
        if(page == null){
            return (ArrayList) saleRepository.findSaleHistoryListByOwner(owner);
        }
        Pageable pageable = new PageRequest(page, size);
        return saleRepository.findSaleHistoryListByOwner(pageable, owner);
    }

    @RequestMapping(value = "/salehistory/product/{productId}", method = RequestMethod.GET)
    public ArrayList findSaleHistoryListByProduct(@PathVariable String productId,
                                         @RequestParam(required = false, name = "page")Integer page,
                                         @RequestParam(required = false, defaultValue = "10", name = "size") Integer size){
        if(page == null){
            return (ArrayList) saleRepository.findSaleHistoryListByProduct(productId);
        }
        Pageable pageable = new PageRequest(page, size);
        return saleRepository.findSaleHistoryListByProduct(pageable, productId);
    }
}
