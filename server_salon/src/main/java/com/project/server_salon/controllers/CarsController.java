package com.project.server_salon.controllers;

import com.project.server_salon.objects.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.sql.*;
import java.util.ArrayList;
import java.util.Map;

@RequestMapping(path="/cars")
@RestController
public class CarsController {
    Connection c = null;

    public CarsController(){}

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
    public ArrayList<Car> getAll(){
        ArrayList<Car> cars = new ArrayList<>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error with connection with db");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT * FROM salon.samochody_widok", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    cars.add(new Car(rs.getInt("id_samochodu"),
                            rs.getInt("id_silnik"),
                            rs.getString("silnik"),
                            rs.getInt("id_wersje_wyposazenia"),
                            rs.getString("wersja"),
                            rs.getInt("id_modelu"),
                            rs.getString("model"),
                            rs.getInt("rok_modelowy"),
                            rs.getDouble("cena"),
                            rs.getInt("aktywny")));
                }
                rs.close();
                stmt.close();
                c.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return cars;
    }

    @GetMapping("/getActive")
    public ArrayList<Car> getActive(){
        ArrayList<Car> cars = new ArrayList<>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error with connection with db");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT * FROM salon.samochody_widok where aktywny=1", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    cars.add(new Car(rs.getInt("id_samochodu"),
                            rs.getInt("id_silnik"),
                            rs.getString("silnik"),
                            rs.getInt("id_wersje_wyposazenia"),
                            rs.getString("wersja"),
                            rs.getInt("id_modelu"),
                            rs.getString("model"),
                            rs.getInt("rok_modelowy"),
                            rs.getDouble("cena"),
                            rs.getInt("aktywny")));
                }
                rs.close();
                stmt.close();
                c.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return cars;
    }

    @GetMapping("/getFullInfo")
    public ArrayList<CarFull> getFullInfo(){
        ArrayList<CarFull> cars = new ArrayList<>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error with connection with db");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT s.*, m.*, e.id_silnik, e.nazwa as nazwa_s, e.moc, e.liczba_cylindrow, e.emisja_co2, e.pojemnosc_skokowa, e.rodzaj_paliwa, e.cena as cena_s FROM salon.samochody_widok s join salon.modele m on s.id_modelu=m.id_modelu join salon.silnik e on e.id_silnik=s.id_silnik where aktywny=1", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    cars.add(new CarFull(rs.getInt("id_samochodu"),
                            rs.getInt("id_silnik"),
                            new Engine(rs.getInt("id_silnik"),
                                    rs.getString("nazwa_s"),
                                    rs.getDouble("moc"),
                                    rs.getInt("liczba_cylindrow"),
                                    rs.getDouble("emisja_co2"),
                                    rs.getDouble("pojemnosc_skokowa"),
                                    rs.getString("rodzaj_paliwa"),
                                    rs.getDouble("cena_s")),
                            rs.getInt("id_wersje_wyposazenia"),
                            rs.getString("wersja"),
                            rs.getInt("id_modelu"),
                            new Model(rs.getInt("id_modelu"),
                                    rs.getString("nazwa"),
                                    rs.getString("typ_nadwozia"),
                                    rs.getString("opis"),
                                    rs.getInt("dlugosc"),
                                    rs.getInt("szerokosc"),
                                    rs.getInt("wysokosc"),
                                    rs.getInt("pojemnosc_bagaznika"),
                                    rs.getDouble("cena_bazowa")),
                            rs.getInt("rok_modelowy"),
                            rs.getDouble("cena"),
                            rs.getInt("aktywny")));
                }
                rs.close();
                stmt.close();
                c.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
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
            stmt.close();
            c.close();
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }
    }

    @PostMapping(path = "/activate")
    public void activate(@RequestBody Map<String, String> request){

        int id_samochodu, state;
        try{
            id_samochodu = Integer.parseInt(request.get("id_car"));
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
            stmt.close();
            c.close();
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }

    @PostMapping(path = "/delete")
    public void delete(@RequestBody Map<String, String> request){

        int id_samochodu;
        try{
            id_samochodu = Integer.parseInt(request.get("id_car"));
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad shape of request" + e.getMessage());
        }

        try{
            if(!getConn()){
                throw new SQLException();
            }
            PreparedStatement stmt = c.prepareStatement("DELETE FROM salon.samochody where id_samochodu=?");
            stmt.setInt(1, id_samochodu);
            int i = stmt.executeUpdate();
            System.out.println(i);
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Car does not exist");
            }
            stmt.close();
            c.close();
        }
        catch (SQLException e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
        throw new ResponseStatusException(HttpStatus.OK);
    }



    @GetMapping("/getColors")
    public ArrayList<Color> getAllColors(){
        ArrayList<Color> colors = new ArrayList<>();

        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error with connection with db");
        }
        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT * FROM salon.kolory", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    colors.add(new Color(rs.getInt("id_koloru"),
                            rs.getString("nazwa"),
                            rs.getString("typ"),
                            rs.getDouble("cena")));
                }
                rs.close();
                stmt.close();
                c.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());

            }
        }
        return colors;
    }

}
