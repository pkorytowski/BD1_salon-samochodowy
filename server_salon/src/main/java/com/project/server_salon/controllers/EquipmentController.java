package com.project.server_salon.controllers;

import com.project.server_salon.objects.Equipment;
import com.project.server_salon.objects.EquipmentInVersion;
import com.project.server_salon.objects.Version;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.sql.*;
import java.util.*;

@RequestMapping(path ="/equipment")
@RestController
public class EquipmentController {

    Connection c = null;

    public EquipmentController(){}

    public boolean getConn() {
        try{
            c = DataSource.getConnection();
        }
        catch (SQLException e){
            return false;
        }
        return true;
    }

    @GetMapping(path = "/getAll")
    public ArrayList<Equipment> getAll(){
        ArrayList<Equipment> equipments = new ArrayList<>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Cause description here");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT * FROM salon.wyposazenie_widok", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next())  {
                    equipments.add(new Equipment(rs.getInt("id_wyposazenia"),
                            rs.getInt("typ_wyposazenia"),
                            rs.getString("nazwa"),
                            rs.getString("opis"),
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
                c.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return types;
    }

    @GetMapping(path = "/getVersions")
    public ArrayList<Version> getVersions(){
        ArrayList<Version> versions = new ArrayList<>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Cannot connect to db.");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT * FROM salon.wersje_wyposazenia", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next()) {
                    Version ver = new Version(rs.getInt("id_wersje_wyposazenia"),
                                             rs.getString("nazwa"),
                                             rs.getDouble("cena"),
                                             rs.getInt("aktywna"));
                    try{
                        PreparedStatement stmt2 = c.prepareStatement("SELECT * FROM salon.wyposazenie_widok where id_wyposazenia in (select w.id_wyposazenia from salon.wyposazenie_w_wersji w where w.id_wersje_wyposazenia=?)", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                        stmt2.setInt(1, ver.getId_version());
                        ResultSet rs2 = stmt2.executeQuery();
                        ArrayList<Equipment> eqArr = new ArrayList<>();
                        while (rs2.next()){
                            eqArr.add(new Equipment(rs2.getInt("id_wyposazenia"), rs2.getInt("typ_wyposazenia"), rs2.getString("nazwa"), rs2.getString("opis"), rs2.getDouble("cena")));
                        }
                        rs2.close();
                        stmt2.close();
                        ver.setEquipmentList(eqArr);
                        versions.add(ver);
                    }
                    catch (SQLException e){
                        System.out.println(e.getMessage() + ", " + e.getCause());
                    }
                }
                rs.close();
                stmt.close();
                c.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return versions;
    }

    @GetMapping(path = "/getActiveVersions")
    public ArrayList<Version> getActiveVersions(){
        ArrayList<Version> versions = new ArrayList<>();
        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Cannot connect to db.");
        }

        if (c!=null){
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT * FROM salon.wersje_wyposazenia where aktywna=1", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                ResultSet rs = stmt.executeQuery();
                while (rs.next()) {
                    Version ver = new Version(rs.getInt("id_wersje_wyposazenia"),
                            rs.getString("nazwa"),
                            rs.getDouble("cena"),
                            rs.getInt("aktywna"));
                    try{
                        PreparedStatement stmt2 = c.prepareStatement("SELECT * FROM salon.wyposazenie_widok where id_wyposazenia in (select w.id_wyposazenia from salon.wyposazenie_w_wersji w where w.id_wersje_wyposazenia=?)", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                        stmt2.setInt(1, ver.getId_version());
                        ResultSet rs2 = stmt2.executeQuery();
                        ArrayList<Equipment> eqArr = new ArrayList<>();
                        while (rs2.next()){
                            eqArr.add(new Equipment(rs2.getInt("id_wyposazenia"), rs2.getInt("typ_wyposazenia"), rs2.getString("nazwa"), rs2.getString("opis"), rs2.getDouble("cena")));
                        }
                        rs2.close();
                        stmt2.close();
                        ver.setEquipmentList(eqArr);
                        versions.add(ver);
                    }
                    catch (SQLException e){
                        System.out.println(e.getMessage() + ", " + e.getCause());
                    }
                }
                rs.close();
                stmt.close();
                c.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return versions;
    }

    @GetMapping(path = "/getVersion")
    @ResponseBody
    public Version getVersion(@RequestParam int id_version){
        Version version = null;

        if(!getConn()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Cannot connect to db.");
        }

        if (c!=null) {
            try{
                PreparedStatement stmt = c.prepareStatement("SELECT * FROM salon.wersje_wyposazenia where id_wersje_wyposazenia=?", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                stmt.setInt(1, id_version);
                ResultSet rs = stmt.executeQuery();
                if (rs.next()) {
                    version = new Version(rs.getInt("id_wersje_wyposazenia"),
                            rs.getString("nazwa"),
                            rs.getDouble("cena"),
                            rs.getInt("aktywna"));
                    try{
                        PreparedStatement stmt2 = c.prepareStatement("SELECT * FROM salon.wyposazenie_widok where id_wyposazenia in (select w.id_wyposazenia from salon.wyposazenie_w_wersji w where w.id_wersje_wyposazenia=?)", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                        stmt2.setInt(1, version.getId_version());
                        ResultSet rs2 = stmt2.executeQuery();
                        ArrayList<Equipment> eqArr = new ArrayList<>();
                        while (rs2.next()){
                            eqArr.add(new Equipment(rs2.getInt("id_wyposazenia"), rs2.getInt("typ_wyposazenia"), rs2.getString("nazwa"), rs2.getString("opis"), rs2.getDouble("cena")));
                        }
                        rs2.close();
                        stmt2.close();
                        version.setEquipmentList(eqArr);
                    }
                    catch (SQLException e){
                        System.out.println(e.getMessage() + ", " + e.getCause());
                    }
                }
                rs.close();
                stmt.close();
                c.close();
            }
            catch (SQLException e){
                System.out.println(e.getMessage());
            }
        }
        return version;
    }

    @PostMapping(path = "/addNewVersion")
    public void addNewVersion(@RequestBody Map<String, Object> request){
        String name;
        List<Map<String, Integer>> equipmentResponseList;
        List<EquipmentInVersion> equipmentList = new ArrayList<>();
        int id;
        try{
            name = request.get("name").toString();
            equipmentResponseList = (List<Map<String, Integer>>) request.get("equipment");
            for(Map<String, Integer> item: equipmentResponseList){
                EquipmentInVersion eq = new EquipmentInVersion(item.get("id_wyposazenia"), item.get("typ_wyposazenia"));
                equipmentList.add(eq);
            }
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad shape of request" + e.getMessage());
        }

        if(isValidInput(equipmentList)){
            try{
                if(!getConn()){
                    throw new Exception();
                }
                c.setAutoCommit(false);
                PreparedStatement stmt = c.prepareStatement("Insert INTO salon.wersje_wyposazenia values (default, ?, 0, 1)");
                stmt.setString(1, name);
                int i = stmt.executeUpdate();
                if(i == 1){
                    stmt = c.prepareStatement("SELECT id_wersje_wyposazenia from salon.wersje_wyposazenia where nazwa=?", ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
                    stmt.setString(1, name);
                    ResultSet rs = stmt.executeQuery();
                    if(rs.next()){
                        id = rs.getInt("id_wersje_wyposazenia");

                        for(EquipmentInVersion eq:equipmentList){
                            stmt = c.prepareStatement("INSERT INTO salon.wyposazenie_w_wersji values (default, ?, ?)");
                            stmt.setInt(1, id);
                            stmt.setInt(2, eq.getId_wyposazenia());
                            int j = stmt.executeUpdate();
                            if(j!=1){
                                c.rollback();
                                throw new ResponseStatusException(HttpStatus.CONFLICT, "Problem with inserting equipment");
                            }

                        }
                        rs.close();
                        stmt.close();
                        c.commit();
                    }
                    else{
                        c.rollback();
                    }

                }
                else{
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Version already exists");
                }
                c.close();
            }
            catch (Exception e){
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
            }
        }
    }

    @PostMapping(path = "/activate")
    public void activateVersion(@RequestBody Map<String, String> request){

        int id, state;
        try{
            id = Integer.parseInt(request.get("id"));
            state = Integer.parseInt(request.get("state"));
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad shape of request" + e.getMessage());
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("UPDATE salon.wersje_wyposazenia set aktywna=? where id_wersje_wyposazenia=?");
            stmt.setInt(1, state);
            stmt.setInt(2, id);
            int i = stmt.executeUpdate();
            if(i!=1){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Problem with updating equipment");
            }
            stmt.close();
            c.close();
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }

    @PostMapping(path = "/delete")
    public void deleteVersion(@RequestBody Map<String, String> request){

        int id;
        try{
            id = Integer.parseInt(request.get("id"));
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad shape of request" + e.getMessage());
        }

        try{
            if(!getConn()){
                throw new Exception();
            }
            PreparedStatement stmt = c.prepareStatement("DELETE FROM salon.wyposazenie_w_wersji where id_wersje_wyposazenia=?");
            stmt.setInt(1, id);
            int i = stmt.executeUpdate();
            if(i==0){
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Version does not exists");
            }
            else{
                stmt = c.prepareStatement("DELETE FROM salon.wersje_wyposazenia where id_wersje_wyposazenia=?");
                stmt.setInt(1, id);
                i = stmt.executeUpdate();
                if(i!=1){
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Version does not exists");
                }
            }
            stmt.close();
            c.close();
        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e.getCause());
        }
    }

    boolean isValidInput(List<EquipmentInVersion> equipment){
        Set<Integer> typesOfEquipment = new HashSet<>();
        for(EquipmentInVersion eq: equipment){
            typesOfEquipment.add(eq.getTyp_wyposazenia());
        }
        return equipment.size() == typesOfEquipment.size();
    }

}
