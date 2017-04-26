package com.grouptwo.zalada.sale.domain;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Collections;


public class Authenticated implements Authentication {

    private String username;
    private boolean user_authenticated = true;

    public Authenticated(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public Object getCredentials() {
        return Collections.emptyList();
    }

    @Override
    public Object getDetails() {
        return Collections.emptyList();
    }

    @Override
    public Object getPrincipal() {
        return Collections.emptyList();
    }

    @Override
    public boolean isAuthenticated() {
        return user_authenticated;
    }

    @Override
    public void setAuthenticated(boolean b) throws IllegalArgumentException {
        this.user_authenticated = b;
    }

    @Override
    public String getName() {
        return username;
    }
}