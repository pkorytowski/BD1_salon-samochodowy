package com.mentorvradmin.demo.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;

public class AuthService {
    static final String SECRET = "MentorVR";
    static final String HEADER = "Authorization";

    public static String generateApiKey(String username){
        String JWT = Jwts.builder()
                .setSubject(username)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
        return JWT;
    }

    public static Authentication getAuthentication(HttpServletRequest request){
        String token = request.getHeader(HEADER);
        if(token != null){
            String user = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().getSubject();

            return user != null ? new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList()) : null;
        }
        return null;
    }
}
