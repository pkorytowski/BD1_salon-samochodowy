package com.project.server_salon.controllers;

import com.project.server_salon.objects.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.sql.*;
import java.util.ArrayList;
import java.util.Map;
import java.util.Objects;

@RequestMapping(path="/orders")
@RestController
public class OrderController {

    Connection c = null;

    @Autowired
    private Environment env;

    OrderController(){}

    public boolean getConn() {
        try{
            c = DriverManager.getConnection(Objects.requireNonNull(env.getProperty("db.url")), env.getProperty("db.user"), env.getProperty("db.password"));
        }
        catch (SQLException e){
            return false;
        }
        return true;
    }

    @GetMapping("/getActiveOrders")
    public ArrayList<Order> getActiveOrders(){
        ArrayList<Order> orders = new ArrayList<Order>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT * FROM salon.zamowienia_widok where status<>'zakonczono'", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    orders.add(new Order(rs.getInt("id_zamowienia"),
                            new Employee(rs.getInt("id_pracownika"),
                                        rs.getString("imie"),
                                        rs.getString("nazwisko"),
                                        rs.getString("stanowisko"),
                                        rs.getString("email")),
                            new Unit(rs.getInt("id_egzemplarza"),
                                    rs.getInt("id_koloru"),
                                    rs.getString("kolor"),
                                    new CustomerShort(rs.getInt("id_klienta"),
                                            rs.getString("imie_k"),
                                            rs.getString("nazwisko_k"),
                                            rs.getInt("telefon_k"),
                                            rs.getString("email_k")),
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
                                    rs.getString("status_egz"),
                                    rs.getDouble("cena_wyjsciowa")),
                            rs.getString("status"),
                            rs.getDouble("rabat"),
                            rs.getDouble("cena_koncowa")));
                }
                rs.close();
                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return orders;
    }

    @GetMapping("/getReadyOrders")
    public ArrayList<Order> getReadyOrders(){
        ArrayList<Order> orders = new ArrayList<Order>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT * FROM salon.zamowienia_widok z where status='gotowe do odbioru' and not exists (select 1 from salon.pokoj_wydan p where p.id_zamowienia=z.id_zamowienia) ", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    orders.add(new Order(rs.getInt("id_zamowienia"),
                            new Employee(rs.getInt("id_pracownika"),
                                    rs.getString("imie"),
                                    rs.getString("nazwisko"),
                                    rs.getString("stanowisko"),
                                    rs.getString("email")),
                            new Unit(rs.getInt("id_egzemplarza"),
                                    rs.getInt("id_koloru"),
                                    rs.getString("kolor"),
                                    new CustomerShort(rs.getInt("id_klienta"),
                                            rs.getString("imie_k"),
                                            rs.getString("nazwisko_k"),
                                            rs.getInt("telefon_k"),
                                            rs.getString("email_k")),
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
                                    rs.getString("status_egz"),
                                    rs.getDouble("cena_wyjsciowa")),
                            rs.getString("status"),
                            rs.getDouble("rabat"),
                            rs.getDouble("cena_koncowa")));
                }
                rs.close();
                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return orders;
    }
    @GetMapping("/getAll")
    public ArrayList<Order> getAll(){
        ArrayList<Order> orders = new ArrayList<Order>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT * FROM salon.zamowienia_widok", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    orders.add(new Order(rs.getInt("id_zamowienia"),
                            new Employee(rs.getInt("id_pracownika"),
                                    rs.getString("imie"),
                                    rs.getString("nazwisko"),
                                    rs.getString("stanowisko"),
                                    rs.getString("email")),
                            new Unit(rs.getInt("id_egzemplarza"),
                                    rs.getInt("id_koloru"),
                                    rs.getString("kolor"),
                                    new CustomerShort(rs.getInt("id_klienta"),
                                            rs.getString("imie_k"),
                                            rs.getString("nazwisko_k"),
                                            rs.getInt("telefon_k"),
                                            rs.getString("email_k")),
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
                                    rs.getString("status_egz"),
                                    rs.getDouble("cena_wyjsciowa")),
                            rs.getString("status"),
                            rs.getDouble("rabat"),
                            rs.getDouble("cena_koncowa")));
                }
                rs.close();
                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return orders;
    }

    @PostMapping("/getOrder")
    public Order getOrder(@RequestBody Map<String, String> request){
        int id_order;
        Order order = null;
        try{
            id_order = Integer.parseInt(request.get("id_order"));
        }
        catch(Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form");
        }

        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT * FROM salon.zamowienia_widok where id_zamowienia=?", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                stmt.setInt(1, id_order);
                ResultSet rs = stmt.executeQuery();
                if (rs.next())  {
                    order = new Order(rs.getInt("id_zamowienia"),
                            new Employee(rs.getInt("id_pracownika"),
                                    rs.getString("imie"),
                                    rs.getString("nazwisko"),
                                    rs.getString("stanowisko"),
                                    rs.getString("email")),
                            new Unit(rs.getInt("id_egzemplarza"),
                                    rs.getInt("id_koloru"),
                                    rs.getString("kolor"),
                                    new CustomerShort(rs.getInt("id_klienta"),
                                            rs.getString("imie_k"),
                                            rs.getString("nazwisko_k"),
                                            rs.getInt("telefon_k"),
                                            rs.getString("email_k")),
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
                                    rs.getString("status_egz"),
                                    rs.getDouble("cena_wyjsciowa")),
                            rs.getString("status"),
                            rs.getDouble("rabat"),
                            rs.getDouble("cena_koncowa"));
                    rs.close();
                    stmt.close();
                }
                else{
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Order does not exists.");
                }

            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return order;
    }

    @PostMapping("/add")
    public void addOrder(@RequestBody Map<String, String> request){
        int id_employee, id_unit;
        String status;
        double discount;

        try{
            id_unit = Integer.parseInt(request.get("id_unit"));
            id_employee = Integer.parseInt(request.get("id_employee"));
            status = request.get("status");
            discount = Double.parseDouble(request.get("discount"));
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("INSERT INTO salon.zamowienia values (default, ?, ?, ?, ?, 0)");
            stmt.setInt(1, id_employee);
            stmt.setInt(2, id_unit);
            stmt.setString(3, status);
            stmt.setDouble(4, discount);
            int i=stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Order already exists");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
    }

    @PostMapping("/discount")
    public void changeDiscount(@RequestBody Map<String, String> request){
        int id_order;
        double discount;
        try{
            id_order = Integer.parseInt(request.get("id_order"));
            discount = Double.parseDouble(request.get("discount"));
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("UPDATE salon.zamowienia set rabat=? where id_zamowienia = ?");
            stmt.setDouble(1, discount);
            stmt.setInt(2, id_order);
            int i = stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Problem with updating order");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
    }

    @PostMapping("/changeStatus")
    public void changeStatus(@RequestBody Map<String, String> request){
        int id_order;
        String status;
        try{
            id_order = Integer.parseInt(request.get("id_order"));
            status = request.get("status");
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("UPDATE salon.zamowienia set status=? where id_zamowienia = ?");
            stmt.setString(1, status);
            stmt.setInt(2, id_order);
            int i = stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Problem with updating order");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
    }

    @PostMapping("/delete")
    public void delete(@RequestBody Map<String, String> request){
        int id_order;
        try{
            id_order = Integer.parseInt(request.get("id_order"));
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad request form");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("DELETE FROM salon.zamowienia where id_zamowienia=?");
            stmt.setInt(1, id_order);
            int i = stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Problem with deleting order");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
    }
}
