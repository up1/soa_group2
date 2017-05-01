package com.grouptwo.zalada.sale.config;

import com.grouptwo.zalada.sale.filter.JwtFilter;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


@Configuration
@EnableWebSecurity(debug = true)
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();


        http.authorizeRequests()
                .antMatchers("/sale", "/sale/**").permitAll()
                .antMatchers(HttpMethod.POST, "/cart").permitAll()
                .antMatchers(HttpMethod.GET, "/cart/{cartId}").permitAll()
                .antMatchers(HttpMethod.POST, "/cart/{cartId}").permitAll()
                .antMatchers(HttpMethod.DELETE, "/cart/{cartId}").permitAll()
                .antMatchers(HttpMethod.PATCH, "/cart/{cartId}/{productId}").permitAll()
                .anyRequest().authenticated();
        JwtFilter.registerFilter(http);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
    }
}