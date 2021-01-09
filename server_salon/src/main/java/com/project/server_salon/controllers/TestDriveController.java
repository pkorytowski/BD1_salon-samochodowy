package com.project.server_salon.controllers;

import com.project.server_salon.objects.TestDrive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.sql.*;
import java.util.ArrayList;
import java.util.Map;
import java.util.Objects;

@RequestMapping(path="/test_drive")
@RestController
public class TestDriveController {
    ArrayList<TestDrive> testDrives = new ArrayList<>();
    Connection c = null;

    @Autowired
    private Environment env;

    public TestDriveController(){}

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
    public ArrayList<TestDrive> getAll(){
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT id_jazda_probna, id_pracownika, id_klienta, id_egzemplarza, data FROM salon.jazda_probna", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    testDrives.add(new TestDrive(rs.getInt("id_jazda_probna"),
                            rs.getInt("id_pracownika"),
                            rs.getInt("id_klienta"),
                            rs.getInt("id_egzemplarza"),
                            rs.getTimestamp("data")));
                }
                rs.close();
                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return testDrives;
    }

    @PostMapping("/getWithParam")
    public ArrayList<TestDrive> getWithParam(@RequestBody Map<String, String> request){
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
                PreparedStatement stmt = c.prepareStatement("SELECT id_jazda_probna, id_pracownika, id_klienta, id_egzemplarza, data FROM salon.jazda_probna where ? = ?", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                stmt.setString(1, key);
                stmt.setInt(2, value);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    testDrives.add(new TestDrive(rs.getInt("id_jazda_probna"),
                            rs.getInt("id_pracownika"),
                            rs.getInt("id_klienta"),
                            rs.getInt("id_egzemplarza"),
                            rs.getTimestamp("data")));
                }
                rs.close();
                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return testDrives;
    }

    @PostMapping("/getByDate")
    public ArrayList<TestDrive> getByDate(@RequestBody Map<String, String> request){
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
                PreparedStatement stmt = c.prepareStatement("SELECT id_jazda_probna, id_pracownika, id_klienta, id_egzemplarza, data FROM salon.jazda_probna where data = ?", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                stmt.setTimestamp(1, ts);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    testDrives.add(new TestDrive(rs.getInt("id_jazda_probna"),
                            rs.getInt("id_pracownika"),
                            rs.getInt("id_klienta"),
                            rs.getInt("id_egzemplarza"),
                            rs.getTimestamp("data")));
                }
                rs.close();
                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return testDrives;
    }

    @PostMapping("/getWithParamByDate")
    public ArrayList<TestDrive> getWithParamByDate(@RequestBody Map<String, String> request){
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
                PreparedStatement stmt = c.prepareStatement("SELECT id_jazda_probna, id_pracownika, id_klienta, id_egzemplarza, data FROM salon.jazda_probna where data = ? and ? = ?", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                stmt.setTimestamp(1, ts);
                stmt.setString(2, key);
                stmt.setInt(3, value);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    testDrives.add(new TestDrive(rs.getInt("id_jazda_probna"),
                            rs.getInt("id_pracownika"),
                            rs.getInt("id_klienta"),
                            rs.getInt("id_egzemplarza"),
                            rs.getTimestamp("data")));
                }
                rs.close();
                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return testDrives;
    }

    @PostMapping("/add")
    public void addTestDrive(@RequestBody Map<String, String> request){
        int id_employee, id_customer, id_unit;
        Timestamp date;

        try{
            id_employee = Integer.parseInt(request.get("id_employee"));
            id_customer = Integer.parseInt(request.get("id_customer"));
            id_unit = Integer.parseInt(request.get("id_unit"));
            date = Timestamp.valueOf(request.get("date"));
        }
        catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("INSERT INTO salon.jazda_probna values (default, ?, ?, ?, ?)");
            stmt.setInt(1, id_employee);
            stmt.setInt(2, id_customer);
            stmt.setInt(3, id_unit);
            stmt.setTimestamp(4, date);
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
