package com.project.server_salon.controllers;

import com.project.server_salon.objects.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.sql.*;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RequestMapping(path="/login")
@RestController
public class LoginController {

    @Autowired
    private Environment env;

    @PostMapping("/seller")
    public User loginSeller(@RequestBody Map<String, String> request) {
       return login(request, "ROLE_SELLER");
    }

    @PostMapping("/manager")
    public User loginManager(@RequestBody Map<String, String> request) {
        return login(request, "ROLE_MANAGER");
    }

    @PostMapping("/client")
    public User loginClient(@RequestBody Map<String, String> request) {
        return login(request, "ROLE_CLIENT");
    }


    public User login(Map<String, String> request, String role) {
        String username = request.get("user");
        String pwd = request.get("password");

        Connection c = null;
        try{
            c = DriverManager.getConnection(Objects.requireNonNull(env.getProperty("db.url")), env.getProperty("db.user"), env.getProperty("db.password"));
        }
        catch (SQLException e){
            return null;
        }
        String query;

        switch (role){
            case "ROLE_SELLER":
                query = "SELECT email, haslo FROM salon.pracownicy p WHERE p.email=? and p.stanowisko='sprzedawca'";
                break;
            case "ROLE_MANAGER":
                query = "SELECT email, haslo FROM salon.pracownicy p WHERE p.email=? and p.stanowisko='kierownik'";
                break;
            case "ROLE_CLIENT":
                query = "SELECT email, haslo FROM salon.klienci k WHERE k.email=?";
                break;
            default:
                query = "";
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Bad rights");
        }


        if(c != null) {
            try {
                PreparedStatement stmt = c.prepareStatement(query, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
                stmt.setString(1, username);
                ResultSet rs = stmt.executeQuery();
                if (rs.next()) {
                    String pass = rs.getString("haslo");
                    if(pass.equals(pwd)){
                        String token = getJWTToken(username, role);
                        User user = new User();
                        user.setUser(username);
                        user.setToken(token);
                        return user;
                    }
                    else{
                        System.out.println("nie pasi");
                    }
                }
                else{
                    System.out.println("nie ma wiersza");
                }
            } catch (SQLException e) {
                System.out.println(e.getMessage());
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
            }
        }
        return null;
    }

    private String getJWTToken(String username, String role) {
        String secretKey = "mySecretKey";
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList(role);

        String token = Jwts
                .builder()
                .setId("Bazy")
                .setSubject(username)
                .claim("authorities",
                        grantedAuthorities.stream()
                                .map(GrantedAuthority::getAuthority)
                                .collect(Collectors.toList()))
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 600000))
                .signWith(SignatureAlgorithm.HS512,
                        secretKey.getBytes()).compact();

        return "Bazy " + token;
    }
}
