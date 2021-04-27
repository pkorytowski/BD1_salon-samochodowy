package com.mentorvradmin.demo.resource;


import com.mentorvradmin.demo.beans.AuthBean;
import com.mentorvradmin.demo.security.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RequestMapping(path="/auth")
@RestController
public class TokenResource {

    @PostMapping
    public String getToken(@RequestBody AuthBean authBean){

        String key = AuthService.generateApiKey(authBean.getUsername(), authBean.getPassword());
        if (key==null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        return key;
    }
}
