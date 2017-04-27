package com.grouptwo.zalada.member;

import com.grouptwo.zalada.member.domain.Authenticated;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

public class JwtBuilder {



    private static final String SECRET_KEY = "pOnAm2017";
    private static final Long EXPIRATION_TIME = 600000L;

    private JwtBuilder(){}

    public static String build(String username){

        Claims claims = Jwts.claims().setSubject(username);

        Long now = System.currentTimeMillis();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    public static Authentication parse(HttpServletRequest request) {
        String token = request.getHeader("Authorization");

        if(token != null) {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token.replace("Bearer" + " ", ""));

            Claims body = claims.getBody();

            String username = body.getSubject();

            if(username != null) {
                return new Authenticated(username);
            }
        }

        return null;
    }

}
