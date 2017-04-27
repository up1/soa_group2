package com.grouptwo.zalada.member;

import com.grouptwo.zalada.member.domain.Authenticated;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;

public class JwtBuilder {



    private static final String SECRET_KEY = "pOnAm2017";
    private static final Long EXPIRATION_TIME = 600000L;
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
