package com.grouptwo.zalada.member.domain;

import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "signin")
public class SignIn {

    private String username;
    private String password;
    private List<String> role;

    public SignIn(String username, String password){
        this.username = username;
        this.password = password;
    }

    public SignIn(){
        //Constructor for Spring
    }

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

    public List<String> getRole() {
        return role;
    }

    public void setRole(List<String> role) {
        this.role = role;
    }
}
