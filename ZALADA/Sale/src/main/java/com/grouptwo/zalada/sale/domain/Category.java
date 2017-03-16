package com.grouptwo.zalada.sale.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "category")
public class Category {

    @Id
    private String id;
    private String name;
    private ArrayList<String> childs;
    private ArrayList<String> parents;

    public static final String COLLECTION_NAME = "category";

    public Category(){}

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

    public ArrayList<String> getChilds() {
        return childs;
    }

    public void setChilds(ArrayList<String> childs) {
        this.childs = childs;
    }

    public ArrayList<String> getParents() {
        return parents;
    }

    public void setParents(ArrayList<String> parents) {
        this.parents = parents;
    }

    @Override
    public String toString(){
        return "Category{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", parents=" + parents +
                ", childs=" + childs +
                '}';
    }

}
