package com.grouptwo.zalada.member.config;

import com.auth0.spring.security.api.Auth0SecurityConfig;
import com.grouptwo.zalada.member.domain.Auth0Client;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;


@Configuration
@EnableWebSecurity(debug = true)
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class Auth0Config extends Auth0SecurityConfig {

    @Bean
    public Auth0Client auth0Client() {
        return new Auth0Client(clientId, issuer);
    }

    @Override
    protected void authorizeRequests(final HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/member/signin").permitAll()
                .anyRequest().authenticated();
    }

}
