package com.project.server_salon.controllers;

import com.project.server_salon.objects.Employee;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.sql.*;
import java.util.ArrayList;
import java.util.Map;

@RequestMapping(path="/employees")
@RestController
public class EmployeeController {
    Connection c = null;

    public EmployeeController(){}

    public boolean getConn() {
        try{
            c = DataSource.getConnection();
        }
        catch (SQLException e){
            return false;
        }
        return true;
    }


    @GetMapping("/getAll")
    public ArrayList<Employee> getAll(){
        ArrayList<Employee> employees = new ArrayList<>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Cause description here");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT id_pracownika, imie, nazwisko, stanowisko, email FROM salon.pracownicy", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    employees.add(new Employee(rs.getInt("id_pracownika"),
                                               rs.getString("imie"),
                                               rs.getString("nazwisko"),
                                               rs.getString("stanowisko"),
                                               rs.getString("email")));
                }
                rs.close();
                stmt.close();
                c.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return employees;
    }

    @GetMapping("/getSellers")
    public ArrayList<Employee> getSellers(){
        ArrayList<Employee> employees = new ArrayList<>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Cause description here");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT id_pracownika, imie, nazwisko, stanowisko, email FROM salon.pracownicy where stanowisko='sprzedawca'", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    employees.add(new Employee(rs.getInt("id_pracownika"),
                            rs.getString("imie"),
                            rs.getString("nazwisko"),
                            rs.getString("stanowisko"),
                            rs.getString("email")));
                }
                rs.close();
                stmt.close();
                c.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return employees;
    }

    @PostMapping("/add")
    public void addEmployee(@RequestBody Map<String, String> request){
       String name, surname, position, email, password;
        try{
           name = request.get("name");
           surname = request.get("surname");
           position = request.get("position");
           email = request.get("email");
           password = request.get("password");
       }
       catch (Exception e){
           throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form");
       }

        try{
           if(!getConn()){
               throw new Exception();
           }
            PreparedStatement stmt = c.prepareStatement("INSERT INTO salon.pracownicy values (default, ?, ?, ?, ?, ?)");
            stmt.setString(1, name);
            stmt.setString(2, surname);
            stmt.setString(3, position);
            stmt.setString(4, email);
            stmt.setString(5, password);
            int i=stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
            }
            stmt.close();
            c.close();
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }

    }

    @PostMapping("/update")
    public void updateEmployee(@RequestBody Map<String, String> request){
        String name, surname, position, email;
        int id_employee;
        try{
            id_employee = Integer.parseInt(request.get("id_employee"));
            name = request.get("name");
            surname = request.get("surname");
            position = request.get("position");
            email = request.get("email");
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("UPDATE salon.pracownicy set imie=?, nazwisko=?, stanowisko=?, email=? where id_pracownika=?");
            stmt.setString(1, name);
            stmt.setString(2, surname);
            stmt.setString(3, position);
            stmt.setString(4, email);
            stmt.setInt(5, id_employee);
            int i=stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Problem with updating");
            }
            stmt.close();
            c.close();
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }

    }

    @PostMapping("/delete")
    public void deleteEmployee(@RequestBody Map<String, Integer> request){
        int id_employee;
        try{
            id_employee = request.get("id_employee");
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong request form");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("DELETE FROM salon.pracownicy WHERE id_pracownika=?");
            stmt.setInt(1, id_employee);
            int i=stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "User does not exist");
            }
            stmt.close();
            c.close();
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }

    }

}
