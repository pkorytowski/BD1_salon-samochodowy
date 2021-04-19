package com.mentorvradmin.demo.resource;


import com.mentorvradmin.demo.security.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping(path="/generate")
public class TokenResource {

    @PostMapping
    public String getToken(@RequestBody String username){
        return AuthService.generateApiKey(username);
    }
}
