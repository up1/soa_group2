package com.grouptwo.zalada.sale.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "category")
public class Category {

    @Id
    private String id;
    private String name;
    private List<String> parents;
    private List<String> children;

    public static final String COLLECTION_NAME = "category";

    public Category(){
        //Constructor needed for spring
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getchildren() {
        return children;
    }

    public void setchildren(List<String> children) {
        this.children = children;
    }

    public List<String> getParents() {
        return parents;
    }

    public void setParents(List<String> parents) {
        this.parents = parents;
    }

    @Override
    public String toString(){
        return "Category{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", parents=" + parents +
                ", children=" + children +
                '}';
    }

}
