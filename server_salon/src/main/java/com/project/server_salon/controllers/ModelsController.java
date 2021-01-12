package com.project.server_salon.controllers;

import com.project.server_salon.objects.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.sql.*;
import java.util.ArrayList;
import java.util.Map;
import java.util.Objects;

@RequestMapping(path="/models")
@RestController
public class ModelsController {
    Connection c = null;

    @Autowired
    private Environment env;

    public ModelsController(){}

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
    public ArrayList<Model> getAll(){
        ArrayList<Model> models = new ArrayList<>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Cause description here");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT id_modelu, nazwa, typ_nadwozia, cena_bazowa FROM salon.modele", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    models.add(new Model(rs.getInt("id_modelu"),
                            rs.getString("nazwa"),
                            rs.getString("typ_nadwozia"),
                            rs.getDouble("cena_bazowa")));
                }
                rs.close();

                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
                System.exit(1);
            }
        }
        return models;
    }

    @PostMapping( "/add")
    public void addModel(@RequestBody Map<String, Object> request){
        String name, chassis;
        double value;
        try{
            name = request.get("name").toString();
            chassis = request.get("chassis").toString();
            value = Double.parseDouble(request.get("value").toString());
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cause description here");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("INSERT INTO salon.modele values (default, ?, ?, ?)");
            stmt.setString(1, name);
            stmt.setString(2, chassis);
            stmt.setDouble(3, value);
            int i=stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Model already exists");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }

    }

    @PostMapping("/delete")
    public void deleteModel(@RequestBody Map<String, Integer> request){
        int id_modelu;
        try{
            id_modelu = request.get("id_modelu");
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong request form");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("DELETE FROM salon.modele WHERE id_modelu=?");
            stmt.setInt(1, id_modelu);
            int i=stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Model does not exist");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }

    }

    @PostMapping("/update")
    public void updateModel(@RequestBody Map<String, Object> request){
        int id_modelu;
        String name, chassis;
        double value;
        try{
            id_modelu = Integer.parseInt(request.get("id").toString());
            name = request.get("name").toString();
            chassis = request.get("chassis").toString();
            value = Double.parseDouble(request.get("value").toString());
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong request form");
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("UPDATE salon.modele set nazwa=?, typ_nadwozia=?, cena_bazowa=? where id_modelu=?");
            stmt.setString(1, name);
            stmt.setString(2, chassis);
            stmt.setDouble(3, value);
            stmt.setInt(4, id_modelu);

            int i=stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Model does not exist");
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Problem with connection with db");
        }

    }



}

