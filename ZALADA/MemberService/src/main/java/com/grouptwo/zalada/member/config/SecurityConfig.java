package com.grouptwo.zalada.member.config;

import com.grouptwo.zalada.member.CustomMongoSecurityService;
import com.grouptwo.zalada.member.filter.JwtFilter;
import com.grouptwo.zalada.member.filter.SignInFilter;
import com.grouptwo.zalada.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Created by new_z on 12/04/2017.
 */
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CustomMongoSecurityService customMongoSecurityService;

    /**
     * Config web & mapping filter
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();


        http.authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers(HttpMethod.POST, "/member/signin").permitAll()
                .anyRequest().authenticated();

        http.addFilterBefore(new SignInFilter("/member/signin", authenticationManager(), memberRepository), UsernamePasswordAuthenticationFilter.class);
        JwtFilter.registerFilter(http);
    }

    /**
     * Config authentication (user queries) => for authenticate
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customMongoSecurityService);
    }
}
