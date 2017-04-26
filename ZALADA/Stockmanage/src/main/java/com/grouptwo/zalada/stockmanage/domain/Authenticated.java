package com.grouptwo.zalada.stockmanage.domain;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class Authenticated implements Authentication {

    private String username;
    private boolean isAuthenticated = true;

    public Authenticated(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getDetails() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return null;
    }

    @Override
    public boolean isAuthenticated() {
        return isAuthenticated;
    }

    @Override
    public void setAuthenticated(boolean b){
        this.isAuthenticated = b;
    }

    @Override
    public String getName() {
        return username;
    }
}
