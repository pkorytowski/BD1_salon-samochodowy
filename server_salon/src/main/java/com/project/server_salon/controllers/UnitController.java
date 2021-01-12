package com.project.server_salon.controllers;

import com.project.server_salon.objects.Car;
import com.project.server_salon.objects.Unit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.sql.*;
import java.util.ArrayList;
import java.util.Map;
import java.util.Objects;

@RequestMapping(path ="/units")
@RestController
public class UnitController {
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
        ArrayList<Unit> units = new ArrayList<>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error with connection with db");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT * FROM salon.egzemplarz_widok", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    units.add(new Unit(rs.getInt("id_egzemplarza"),
                            rs.getInt("id_koloru"),
                            rs.getString("kolor"),
                            new Car(rs.getInt("id_samochodu"),
                                    rs.getInt("id_silnik"),
                                    rs.getString("silnik"),
                                    rs.getInt("id_wersje_wyposazenia"),
                                    rs.getString("wersja"),
                                    rs.getInt("id_modelu"),
                                    rs.getString("model"),
                                    rs.getInt("rok_modelowy"),
                                    rs.getDouble("cena"),
                                    rs.getInt("aktywny")),
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

    @PostMapping("/add")
    public void addUnit(@RequestBody Map<String, String> request){
        int id_car, id_color;
        String status;

        try{
            id_car = Integer.parseInt(request.get("id_car"));
            id_color = Integer.parseInt(request.get("id_color"));
            status = request.get("status");
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form");
        }
        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("INSERT INTO salon.egzemplarz values (default, ?, ?, ?, 0)");
            stmt.setInt(1, id_car);
            stmt.setInt(2, id_color);
            stmt.setString(3, status);
            int i=stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Unit already exists");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
    }

    @PostMapping("/delete")
    public void delete(@RequestBody Map<String, String> request){

        int id_unit;
        try{
            id_unit = Integer.parseInt(request.get("id_unit"));
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad shape of request" + e.getMessage());
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("DELETE FROM salon.egzemplarz where id_egzemplarza=?");
            stmt.setInt(1, id_unit);
            int i = stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Can't delete unit");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }

    @PostMapping("/update")
    public void update(@RequestBody Map<String, String> request){
        int id_unit;
        String status;
        try{
            id_unit = Integer.parseInt(request.get("id_unit"));
            status = request.get("status");
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("UPDATE salon.egzemplarz set status = ? where id_egzemplarza = ?");
            stmt.setString(1, status);
            stmt.setInt(2, id_unit);
            int i = stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Unit does not exists");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }

    }


}
