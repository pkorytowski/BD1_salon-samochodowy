package com.project.server_salon.controllers;

import com.project.server_salon.objects.Release;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.sql.*;
import java.util.ArrayList;
import java.util.Map;
import java.util.Objects;

@RequestMapping(path="/release-room")
@RestController
public class ReleaseRoomController {

    Connection c = null;

    @Autowired
    private Environment env;

    public ReleaseRoomController(){}

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
    public ArrayList<Release> getAll(){
        ArrayList<Release> releases = new ArrayList<>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT id_pokoj_wydan, id_pracownika, id_zamowienia, data FROM salon.pokoj_wydan", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    releases.add(new Release(rs.getInt("id_pokoj_wydan"),
                            rs.getInt("id_pracownika"),
                            rs.getInt("id_zamowienia"),
                            rs.getTimestamp("data")));
                }
                rs.close();
                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return releases;
    }

    @PostMapping("/getWithParam")
    public ArrayList<Release> getWithParam(@RequestBody Map<String, String> request){
        ArrayList<Release> releases = new ArrayList<>();
        int value;
        String key;
        try{
            value = Integer.parseInt(request.get("value"));
            key = request.get("key");
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form.");
        }
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT id_pokoj_wydan, id_pracownika, id_zamowienia, data FROM salon.pokoj_wydan where ? = ?", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                stmt.setString(1, key);
                stmt.setInt(2, value);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    releases.add(new Release(rs.getInt("id_pokoj_wydan"),
                            rs.getInt("id_pracownika"),
                            rs.getInt("id_zamowienia"),
                            rs.getTimestamp("data")));
                }
                rs.close();
                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return releases;
    }

    @PostMapping("/getByDate")
    public ArrayList<Release> getByDate(@RequestBody Map<String, String> request){
        ArrayList<Release> releases = new ArrayList<>();
        Timestamp ts;
        try{
            ts = Timestamp.valueOf(request.get("date"));
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form.");
        }
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT id_pokoj_wydan, id_pracownika, id_zamowienia, data FROM salon.pokoj_wydan where data = ?", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                stmt.setTimestamp(1, ts);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    releases.add(new Release(rs.getInt("id_pokoj_wydan"),
                            rs.getInt("id_pracownika"),
                            rs.getInt("id_zamowienia"),
                            rs.getTimestamp("data")));
                }
                rs.close();
                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return releases;
    }

    @PostMapping("/getWithParamByDate")
    public ArrayList<Release> getWithParamByDate(@RequestBody Map<String, String> request){
        ArrayList<Release> releases = new ArrayList<>();
        String key;
        int value;
        Timestamp ts;
        try{
            key = request.get("key");
            value = Integer.parseInt(request.get("value"));
            ts = Timestamp.valueOf(request.get("date"));
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form.");
        }
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT id_pokoj_wydan, id_pracownika, id_zamowienia, data FROM salon.pokoj_wydan where data = ? and ? = ?", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                stmt.setTimestamp(1, ts);
                stmt.setString(2, key);
                stmt.setInt(3, value);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    releases.add(new Release(rs.getInt("id_pokoj_wydan"),
                            rs.getInt("id_pracownika"),
                            rs.getInt("id_zamowienia"),
                            rs.getTimestamp("data")));
                }
                rs.close();
                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return releases;
    }

    @PostMapping("/add")
    public void addTestDrive(@RequestBody Map<String, String> request){
        int id_employee, id_order;
        Timestamp date;

        try{
            id_employee = Integer.parseInt(request.get("id_employee"));
            id_order = Integer.parseInt(request.get("id_order"));
            date = Timestamp.valueOf(request.get("date"));
        }
        catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("INSERT INTO salon.pokoj_wydan values (default, ?, ?, ?)");
            stmt.setInt(1, id_employee);
            stmt.setInt(2, id_order);
            stmt.setTimestamp(3, date);
            int i=stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "A conflict occured");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
    }

}
