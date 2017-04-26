package com.grouptwo.zalada.sale;

import com.grouptwo.zalada.sale.domain.Authenticated;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;

public class JwtBuilder {

    public static final String SECRETKEY = "pOnAm2017";
    public static final Long EXPIRATIONTIME = 600000L;

    private JwtBuilder(){
        //not called
    }

    public static Authentication build(HttpServletRequest request) {
        String token = request.getHeader("Authorization");

        if(token != null) {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(SECRETKEY)
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