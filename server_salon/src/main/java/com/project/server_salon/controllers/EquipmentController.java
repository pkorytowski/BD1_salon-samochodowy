package com.project.server_salon.controllers;

import com.project.server_salon.objects.Equipment;
import com.project.server_salon.objects.Version;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.sql.*;
import java.util.ArrayList;
import java.util.Objects;

@RequestMapping(path ="/equipment")
@RestController
public class EquipmentController {
    ArrayList<Equipment> equipments = new ArrayList<>();
    Connection c = null;

    @Autowired
    private Environment env;

    public EquipmentController(){}

    public boolean getConn() {
        try{
            c = DriverManager.getConnection(Objects.requireNonNull(env.getProperty("db.url")), env.getProperty("db.user"), env.getProperty("db.password"));
        }
        catch (SQLException e){
            return false;
        }
        return true;
    }

    @GetMapping(path = "/getAll")
    public ArrayList<Equipment> getAll(){

        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Cause description here");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT * FROM salon.wyposazenie_widok", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    equipments.add(new Equipment(rs.getInt("id_wyposazenia"),
                            rs.getString("typ_wyposazenia"),
                            rs.getString("nazwa"),
                            rs.getString("opis"),
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
        return equipments;
    }

    @GetMapping(path = "/getTypes")
    public ArrayList<String> getTypes(){
        ArrayList<String> types = new ArrayList<>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Cause description here");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT typ FROM salon.typ_wyposazenia", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next()) {
                    types.add(rs.getString("typ"));
                }
                rs.close();

                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
                System.exit(1);
            }
        }
        return types;
    }

    @GetMapping(path = "/getVersions")
    public ArrayList<Version> getVersions(){
        ArrayList<Version> versions = new ArrayList<>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Cause description here");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT * FROM salon.wersje_wyposazenia", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next()) {
                    Version ver = new Version(rs.getInt("id_wersje_wyposazenia"),
                                             rs.getString("nazwa"),
                                             rs.getDouble("cena"));
                    try{
                        PreparedStatement stmt2 = c.prepareStatement("SELECT * FROM salon.wyposazenie_widok where id_wyposazenia in (select w.id_wyposazenia from salon.wyposazenie_w_wersji w where w.id_wersje_wyposazenia=?)", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                        stmt2.setInt(1, ver.getId_wersje_wyposazenia());
                        ResultSet rs2 = stmt2.executeQuery();
                        ArrayList<Equipment> eqArr = new ArrayList<>();
                        while (rs2.next()){
                            eqArr.add(new Equipment(rs2.getInt("id_wyposazenia"), rs2.getString("typ_wyposazenia"), rs2.getString("nazwa"), rs2.getString("opis"), rs2.getDouble("cena")));
                        }
                        rs2.close();
                        stmt2.close();
                        ver.setEquipmentList(eqArr);
                        versions.add(ver);
                    }
                    catch (SQLException e){
                        System.out.println(e.getMessage());
                        System.exit(1);
                    }
                }
                rs.close();
                stmt.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
                System.exit(1);
            }
        }
        return versions;
    }


}
