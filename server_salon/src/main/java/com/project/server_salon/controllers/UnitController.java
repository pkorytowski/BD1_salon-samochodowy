package com.project.server_salon.controllers;

import com.project.server_salon.objects.Unit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.sql.*;
import java.util.ArrayList;
import java.util.Objects;

@RequestMapping(path ="/units")
@RestController
public class UnitController {
    ArrayList<Unit> units = new ArrayList<>();
    Connection c;

    @Autowired
    private Environment env;

    public UnitController(){}

    public boolean getConn() {
        try{
            c = DriverManager.getConnection(Objects.requireNonNull(env.getProperty("db.url")), env.getProperty("db.user"), env.getProperty("db.password"));
        }
        catch (SQLException e){
            return false;
        }
        return true;
    }

    @GetMapping("/getUnits")
    public ArrayList<Unit> getAll(){

        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error with connection with db");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT id_egzemplarza, id_samochodu, id_koloru, status, cena_wyjsciowa FROM salon.egzemplarz", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    units.add(new Unit(rs.getInt("id_egzemplarza"),
                            rs.getInt("id_samochodu"),
                            rs.getInt("id_koloru"),
                            rs.getString("status"),
                            rs.getDouble("cena_wyjsciowa")));
                }
                rs.close();
                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
                System.exit(1);
            }
        }
        return units;
    }



}
