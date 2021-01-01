package com.project.server_salon;

import com.project.server_salon.auth.JWTAuthorizationFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@SpringBootApplication
public class ServerSalonApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerSalonApplication.class, args);
    }

    @EnableWebSecurity
    @Configuration
    class WebSecurityConfig extends WebSecurityConfigurerAdapter {

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.csrf().disable()
                    .addFilterAfter(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
                    .authorizeRequests()
                    .antMatchers(HttpMethod.POST, "/models/add").hasRole("MANAGER")
                    .antMatchers(HttpMethod.POST, "/models/delete").hasRole("MANAGER")
                    .antMatchers(HttpMethod.POST, "/engines/add").hasRole("MANAGER")
                    .antMatchers(HttpMethod.POST, "/engines/delete").hasRole("MANAGER")
                    .antMatchers(HttpMethod.POST, "/login/*").permitAll()
                    .anyRequest().authenticated();
        }
    }

}
