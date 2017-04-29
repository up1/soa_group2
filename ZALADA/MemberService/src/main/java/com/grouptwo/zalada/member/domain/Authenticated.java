package com.grouptwo.zalada.member.domain;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Collections;


public class Authenticated implements Authentication {

    private String username;
    private boolean userAuthenticated = true;

    public Authenticated(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
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
        return userAuthenticated;
    }

    @Override
    public void setAuthenticated(boolean b) {
        this.userAuthenticated = b;
    }

    @Override
    public String getName() {
        return username;
    }
}
