package com.grouptwo.zalada.member.domain;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "login")
public class Login {

    private String username;
    private String password;

    public static final String COLLECTION_NAME = "login";

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
