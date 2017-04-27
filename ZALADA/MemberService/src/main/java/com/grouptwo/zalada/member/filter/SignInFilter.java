package com.grouptwo.zalada.member.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grouptwo.zalada.member.JwtBuilder;
import com.grouptwo.zalada.member.domain.SignIn;
import com.grouptwo.zalada.member.repository.MemberRepository;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

public class SignInFilter extends AbstractAuthenticationProcessingFilter {

    private final MemberRepository repository;

    public SignInFilter(String url, AuthenticationManager authenticationManager, MemberRepository repository) {
        super(new AntPathRequestMatcher(url, "POST"));
        setAuthenticationManager(authenticationManager);

        this.repository = repository;
    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, ServletException, IOException {
        SignIn credentials = new ObjectMapper().readValue(httpServletRequest.getInputStream(), SignIn.class);

        String hashPassword = DigestUtils.sha256Hex(credentials.getPassword());

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(credentials.getUsername(), hashPassword);

        return getAuthenticationManager().authenticate(token);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        String username = authResult.getName();


        SignIn signIn = repository.getAuth(username);
        if (signIn == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        String jwt = JwtBuilder.build(signIn.getUsername());

        request.setAttribute("access_token", jwt);
        request.setAttribute("username", username);

        chain.doFilter(request, response);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        PrintWriter writer = response.getWriter();

        HashMap<String, Object> mappingResponse = new HashMap<String, Object>() {{
            put("error", failed.getMessage());
        }};
        ObjectMapper mapper = new ObjectMapper();

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        writer.println(mapper.writeValueAsString(mappingResponse));
    }
}
