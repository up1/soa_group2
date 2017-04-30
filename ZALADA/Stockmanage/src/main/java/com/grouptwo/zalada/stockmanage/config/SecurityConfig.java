package com.grouptwo.zalada.stockmanage.config;

import com.grouptwo.zalada.stockmanage.filter.JwtFilter;
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
public class SecurityConfig extends WebSecurityConfigurerAdapter  {


    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.headers().cacheControl();

        http.csrf().disable();

        http.authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/category/*").permitAll()
                .antMatchers(HttpMethod.GET, "/product/image/").permitAll()
                .anyRequest().authenticated();
        JwtFilter.registerFilter(http);
    }


    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
    }

}
