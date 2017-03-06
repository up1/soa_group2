package stockmanage;

import org.springframework.data.annotation.Id;

public class Product {

    @Id
    private String id;
    private String name;
    private String detail;
    private int price;
    private int amount;
    private String owner;
    private String saleDate;
    private String editDate;


    public Product(){}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getSaleDate() {
        return saleDate;
    }

    public void setSaleDate(String saleDate) {
        this.saleDate = saleDate;
    }

    public String getEditDate() {
        return editDate;
    }

    public void setEditDate(String editDate) {
        this.editDate = editDate;
    }


    @Override
    public String toString() {
        return String.format(
                "Stock.Product[id=%s, name='%s', detail='%s', price=%s, amount=%s, owner='%s', saleDate='%s', editDate='%s']",
                id, name, detail, price, amount, owner, saleDate, editDate);
    }
}
