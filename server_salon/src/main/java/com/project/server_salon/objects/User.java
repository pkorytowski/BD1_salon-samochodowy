package com.project.server_salon.objects;

public class User {
    private int user;
    private String token;
    private String role;

    public void setUser(int user){ this.user = user; }

    public int getUser(){ return user; }

    public void setToken(String token){ this.token = token; }

    public String getToken(){ return token; }

    public void setRole(String role){ this.role = role; }

    public String getRole(){ return role; }
}
