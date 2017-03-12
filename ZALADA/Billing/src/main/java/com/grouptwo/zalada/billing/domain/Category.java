package com.grouptwo.zalada.billing.domain;

import java.util.ArrayList;

public class Category {

    private String id;
    private String current;
    private ArrayList<String> parents;
    private ArrayList<String> childs;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCurrent() {
        return current;
    }

    public void setCurrent(String current) {
        this.current = current;
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
                ", current='" + current + '\'' +
                ", parents=" + parents +
                ", childs=" + childs +
                '}';
    }
}
