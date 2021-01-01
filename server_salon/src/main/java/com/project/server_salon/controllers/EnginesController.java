package com.project.server_salon.controllers;


import com.project.server_salon.objects.Engine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.sql.*;
import java.util.ArrayList;
import java.util.Map;
import java.util.Objects;

@RequestMapping(path = "/engines")
@RestController
public class EnginesController {
    ArrayList<Engine> engines = new ArrayList<>();
    Connection c = null;

    @Autowired
    private Environment env;

    public EnginesController(){}

    public boolean getConn() {
        try{
            c = DriverManager.getConnection(Objects.requireNonNull(env.getProperty("db.url")), env.getProperty("db.user"), env.getProperty("db.password"));
        }
        catch (SQLException e){
            return false;
        }
        return true;
    }

    @GetMapping("/getAll")
    public ArrayList<Engine> getAll(){

        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Cause description here");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT id_silnik, nazwa, moc, liczba_cylindrow, emisja_co2, pojemnosc_skokowa, rodzaj_paliwa, cena FROM salon.silnik", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    engines.add(new Engine(rs.getInt("id_silnik"),
                            rs.getString("nazwa"),
                            rs.getDouble("moc"),
                            rs.getInt("liczba_cylindrow"),
                            rs.getDouble("emisja_co2"),
                            rs.getDouble("pojemnosc_skokowa"),
                            rs.getString("rodzaj_paliwa"),
                            rs.getDouble("cena")));
                }
                rs.close();

                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
                System.exit(1);
            }
        }
        return engines;
    }

    @PostMapping( "/add")
    public void addEngine (@RequestBody Map<String, Object> request){
        String name, fuel;
        int cylinders;
        double power, emission, displacement, value;
        try{
            name = request.get("name").toString();
            power = Double.parseDouble(request.get("power").toString());
            cylinders = Integer.parseInt(request.get("cylinders").toString());
            emission = Double.parseDouble(request.get("emission").toString());
            displacement = Double.parseDouble(request.get("displacement").toString());
            fuel = request.get("emission").toString();
            value = Double.parseDouble(request.get("value").toString());
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cause description here");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("INSERT INTO salon.silnik values (default, ?, ?, ?, ?, ?, ?, ?)");
            stmt.setString(1, name);
            stmt.setDouble(2, power);
            stmt.setInt(3, cylinders);
            stmt.setDouble(4, emission);
            stmt.setDouble(5, displacement);
            stmt.setString(6, fuel);
            stmt.setDouble(7, value);
            int i=stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Engine already exists");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }

    }

    @PostMapping("/delete")
    public void deleteEngine(@RequestBody Map<String, Integer> request){
        int id_silnik;
        try{
            id_silnik = request.get("id_silnik");
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong request form");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("DELETE FROM salon.silnik WHERE id_silnik=?");
            stmt.setInt(1, id_silnik);
            int i=stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Engine does not exist");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }

    }

    @PostMapping("/update")
    public void updateEngine(@RequestBody Map<String, Object> request){
        String name, fuel;
        int id_engine, cylinders;
        double power, emission, displacement, value;
        try{
            id_engine = Integer.parseInt(request.get("id_engine").toString());
            name = request.get("name").toString();
            power = Double.parseDouble(request.get("power").toString());
            cylinders = Integer.parseInt(request.get("cylinders").toString());
            emission = Double.parseDouble(request.get("emission").toString());
            displacement = Double.parseDouble(request.get("displacement").toString());
            fuel = request.get("emission").toString();
            value = Double.parseDouble(request.get("value").toString());
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong request form");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("UPDATE salon.silnik set nazwa=?, moc=?, liczba_cylindrow=?, emisja_co2=?, pojemnosc_skokowa=?, rodzaj_paliwa=?, cena=? where id_silnik=?");
            stmt.setString(1, name);
            stmt.setDouble(2, power);
            stmt.setInt(3, cylinders);
            stmt.setDouble(4, emission);
            stmt.setDouble(5, displacement);
            stmt.setString(6, fuel);
            stmt.setDouble(7, value);
            stmt.setInt(8, id_engine);

            int i=stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Engine does not exist");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }

    }

}
