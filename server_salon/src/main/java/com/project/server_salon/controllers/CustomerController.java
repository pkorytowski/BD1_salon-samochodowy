package com.project.server_salon.controllers;

import com.project.server_salon.objects.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.sql.*;
import java.util.ArrayList;
import java.util.Map;
import java.util.Objects;

@RequestMapping(path="/customers")
@RestController
public class CustomerController {
    Connection c = null;

    @Autowired
    private Environment env;

    public CustomerController(){}

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
    public ArrayList<Customer> getAll(){
        ArrayList<Customer> customers = new ArrayList<>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT id_klienta, imie, nazwisko, nazwa, NIP, ulica, nr_domu, kod_pocztowy, miejscowosc, telefon, email FROM salon.klienci", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    customers.add(new Customer(rs.getInt("id_klienta"),
                            rs.getString("imie"),
                            rs.getString("nazwisko"),
                            rs.getString("nazwa"),
                            rs.getString("NIP"),
                            rs.getString("ulica"),
                            rs.getString("nr_domu"),
                            rs.getString("kod_pocztowy"),
                            rs.getString("miejscowosc"),
                            rs.getInt("telefon"),
                            rs.getString("email")));
                }
                rs.close();
                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return customers;
    }

    @PostMapping("/getInfo")
    public Customer getInfo(@RequestBody Map<String, String> request){
        int id_customer;
        Customer customer = null;
        try{
            id_customer = Integer.parseInt(request.get("id_customer"));
        }
        catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form");
        }

        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT id_klienta, imie, nazwisko, nazwa, NIP, ulica, nr_domu, kod_pocztowy, miejscowosc, telefon, email FROM salon.klienci where id_klienta=?", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                stmt.setInt(1, id_customer);
                ResultSet rs = stmt.executeQuery();
                if (rs.next())  {
                    customer = new Customer(rs.getInt("id_klienta"),
                            rs.getString("imie"),
                            rs.getString("nazwisko"),
                            rs.getString("nazwa"),
                            rs.getString("NIP"),
                            rs.getString("ulica"),
                            rs.getString("nr_domu"),
                            rs.getString("kod_pocztowy"),
                            rs.getString("miejscowosc"),
                            rs.getInt("telefon"),
                            rs.getString("email"));
                    rs.close();
                    stmt.close();
                }
                else {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "User does not exist");
                }

            }
            catch (SQLException e){
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
            }
        }

        return customer;

    }

    @PostMapping("/add")
    public void addCustomer(@RequestBody Map<String, String> request){
        String firstName, surname, companyName, NIP, street, flatNumber, postalCode, city, email, password;
        int phoneNumber;

        try{
            firstName = request.get("firstName");
            surname = request.get("surname");
            companyName = request.get("companyName");
            NIP = request.get("NIP");
            street = request.get("street");
            flatNumber = request.get("flatNumber");
            postalCode = request.get("postalCode");
            city = request.get("city");
            phoneNumber = Integer.parseInt(request.get("phoneNumber"));
            email = request.get("email");
            password = request.get("password");
        }
        catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("INSERT INTO salon.klienci values (default, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            stmt.setString(1, firstName);
            stmt.setString(2, surname);
            stmt.setString(3, companyName);
            stmt.setString(4, NIP);
            stmt.setString(5, street);
            stmt.setString(6, flatNumber);
            stmt.setString(7, postalCode);
            stmt.setString(8, city);
            stmt.setInt(9, phoneNumber);
            stmt.setString(10, email);
            stmt.setString(11, password);
            int i=stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
    }

    @PostMapping("/update")
    public void updateCustomer(@RequestBody Map<String, String> request){
        int id_customer;
        String key;
        String value;
        try{
            id_customer = Integer.parseInt(request.get("id_customer"));
            key = request.get("key");
            value = request.get("value");
        }
        catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("UPDATE salon.klienci set ? = ? where id_klienta = ?");
            stmt.setString(1, key);
            stmt.setString(2, value);
            stmt.setInt(3, id_customer);
            int i = stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "User does not exists");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
    }

    @PostMapping("/delete")
    public void deleteEmployee(@RequestBody Map<String, Integer> request){
        int id_customer;
        try{
            id_customer = request.get("id_customer");
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong request form");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("DELETE FROM salon.klienci WHERE id_klienta=?");
            stmt.setInt(1, id_customer);
            int i=stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "User does not exist");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }

    }

}
