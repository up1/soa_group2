package stockmanage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    public ProductController(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    public ProductController(){}

    @RequestMapping(value = "/products",method = RequestMethod.GET)
    public Page<Product> listProductByPage(Pageable pageable){
        return productRepository.findAll(pageable);
    }

    @RequestMapping(value = "/product")
    public void insertProduct(@RequestParam(value = "name") String name, @RequestParam(value = "price") int price){
        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        productRepository.insert(product);
    }
}
