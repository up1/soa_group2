package com.grouptwo.zalada.billing.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.Authentication;
import com.grouptwo.zalada.billing.domain.Authenticated;

import javax.servlet.http.HttpServletRequest;

public class JwtBuilder {

    public static String secretKey = "pOnAm2017";

    public static Authentication build(HttpServletRequest request) {
        String token = request.getHeader("Authorization");

        if(token != null) {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey)
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
