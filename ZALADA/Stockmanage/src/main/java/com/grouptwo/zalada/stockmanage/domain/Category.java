package com.grouptwo.zalada.stockmanage.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "category")
public class Category {

    public static final String COLLECTION_NAME = "category";
    @Id
    private String id;
    private String name;
    private ArrayList<String> parents;
    private ArrayList<String> childs;

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

    public ArrayList<String> getParents() {
        return parents;
    }

    public void setParents(ArrayList<String> parents) {
        this.parents = parents;
    }

    public ArrayList<String> getChilds() {
        return childs;
    }

    public void setChilds(ArrayList<String> childs) {
        this.childs = childs;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", parents=" + parents +
                ", childs=" + childs +
                '}';
    }
}
