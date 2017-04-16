package com.grouptwo.zalada.member.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grouptwo.zalada.member.domain.SignIn;
import com.grouptwo.zalada.member.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
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
import java.util.Date;
import java.util.HashMap;

import static com.grouptwo.zalada.member.JwtBuilder.expirationTime;
import static com.grouptwo.zalada.member.JwtBuilder.secretKey;

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

        Claims claims = Jwts.claims().setSubject(signIn.getUsername());

        Long now = System.currentTimeMillis();
        String JWT = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + expirationTime))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();

        request.setAttribute("accessToken", JWT);

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
