package com.grouptwo.zalada.stockmanage.repository;

import com.grouptwo.zalada.stockmanage.domain.Product;

public interface ProductRepositoryCustom {
    public void updateProduct(String id, Product product);
}
