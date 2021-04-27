package com.mentorvradmin.demo.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;

public class AuthService {
    static final String SECRET = "MentorVR";
    static final String HEADER = "Authorization";
    static final String USERNAME = "Mentor";
    static final String PASSWORD = "VR";

    public static String generateApiKey(String username, String password){
        if (username.equals(USERNAME) && password.equals(PASSWORD)){
            String JWT = Jwts.builder()
                    .setSubject(username)
                    .signWith(SignatureAlgorithm.HS256, SECRET)
                    .compact();
            return JWT;
        }

        return null;

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
