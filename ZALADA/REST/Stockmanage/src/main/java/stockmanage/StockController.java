package stockmanage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by new_z on 05/03/2017.
 */

@RestController
@CrossOrigin(origins = "localhost:9000")
public class StockController {

    @Autowired
    private final StockRepoitory stockRepoitory;

    public StockController(StockRepoitory stockRepoitory) {
        this.stockRepoitory = stockRepoitory;
    }
}
