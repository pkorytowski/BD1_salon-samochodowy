package com.project.server_salon.controllers;

import com.project.server_salon.objects.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.sql.*;
import java.util.ArrayList;
import java.util.Map;
import java.util.Objects;

@RequestMapping(path="/cars")
@RestController
public class CarsController {
    ArrayList<Car> cars = new ArrayList<>();
    Connection c = null;

    @Autowired
    private Environment env;

    public CarsController(){}

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
    public ArrayList<Car> getAll(){

        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error with connection with db");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT id_samochodu, id_silnik, id_wersje_wyposazenia, id_modelu, rok_modelowy, cena, aktywny FROM salon.samochody", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    cars.add(new Car(rs.getInt("id_samochodu"),
                            rs.getInt("id_silnik"),
                            rs.getInt("id_wersje_wyposazenia"),
                            rs.getInt("id_modelu"),
                            rs.getInt("rok_modelowy"),
                            rs.getDouble("cena"),
                            rs.getInt("aktywny")));
                }
                rs.close();
                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
                System.exit(1);
            }
        }
        return cars;
    }

    @GetMapping("/getActive")
    public ArrayList<Car> getActive(){

        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error with connection with db");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT id_samochodu, id_silnik, id_wersje_wyposazenia, id_modelu, rok_modelowy, cena, aktywny FROM salon.samochody where aktywny=1", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    cars.add(new Car(rs.getInt("id_samochodu"),
                            rs.getInt("id_silnik"),
                            rs.getInt("id_wersje_wyposazenia"),
                            rs.getInt("id_modelu"),
                            rs.getInt("rok_modelowy"),
                            rs.getDouble("cena"),
                            rs.getInt("aktywny")));
                }
                rs.close();
                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
                System.exit(1);
            }
        }
        return cars;
    }

    @PostMapping("/add")
    public void add(@RequestBody Map<String, String> request){
        int id_engine, id_version, id_model, year;

        try{
            id_engine = Integer.parseInt(request.get("id_engine"));
            id_version = Integer.parseInt(request.get("id_version"));
            id_model = Integer.parseInt(request.get("id_model"));
            year = Integer.parseInt(request.get("year"));

        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("INSERT INTO salon.samochody values (default, ?, ?, ?, ?, 0, 1)");
            stmt.setInt(1, id_engine);
            stmt.setInt(2, id_version);
            stmt.setInt(3, id_model);
            stmt.setInt(4, year);
            int i=stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Car already exists");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
    }

    @PostMapping(path = "/activate")
    public void activate(@RequestBody Map<String, String> request){

        int id_samochodu, state;
        try{
            id_samochodu = Integer.parseInt(request.get("id_samochodu"));
            state = Integer.parseInt(request.get("state"));
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad shape of request" + e.getMessage());
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("UPDATE salon.samochody set aktywny=? where id_samochodu=?");
            stmt.setInt(1, state);
            stmt.setInt(2, id_samochodu);
            int i = stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Problem with updating a car");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }

    @PostMapping(path = "/delete")
    public void delete(@RequestBody Map<String, String> request){

        int id_samochodu;
        try{
            id_samochodu = Integer.parseInt(request.get("id_samochodu"));
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad shape of request" + e.getMessage());
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("DELETE FROM salon.samochody where id_samochodu=?");
            stmt.setInt(1, id_samochodu);
            int i = stmt.executeUpdate();
                if(i!=1){
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Car does not exists");
                }
            }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }


}