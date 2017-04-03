package com.grouptwo.zalada.member.domain;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class User {

    private String username;
    private String name;
    private String gender;
    private String birthDate;
    private String address;
    private String email;
    private String tel;

    public static final String COLLECTION_NAME = "user";

    public User() {
    }

    public User(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    @Override
    public String toString() {
        return "{" +
                "\"username\":\"" + username + "\"" +
                ", \"name\":\"" + name + "\"" +
                ", \"gender\":\"" + gender + "\"" +
                ", \"birthDate\":\"" + birthDate + "\"" +
                ", \"address\":\"" + address + "\"" +
                ", \"email\":\"" + email + "\"" +
                ", \"tel\":\"" + tel + "\"" +
                '}';
    }
}