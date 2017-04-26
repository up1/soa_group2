package com.grouptwo.zalada.stockmanage.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "category")
public class Category {

    @Id
    private String id;
    private String name;

    private ArrayList<String> children;
    private ArrayList<String> parents;


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

    public ArrayList<String> getChildren() {
        return children;
    }

    public void setChildren(ArrayList<String> children) {
        this.children = children;
    }

    public ArrayList<String> getParents() {
        return parents;
    }

    public void setParents(ArrayList<String> parents) {
        this.parents = parents;
    }

    @Override
    public String toString(){
        return "{" +
                "\"id\":\"" + id + "\"" +
                ", \"name\":\"" + name + "\"" +
                ", \"parents\":" + parents +
                ", \"children\":" + children +
                '}';
    }

}
