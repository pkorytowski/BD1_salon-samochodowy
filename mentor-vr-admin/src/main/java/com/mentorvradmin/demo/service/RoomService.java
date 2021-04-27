package com.mentorvradmin.demo.service;

import com.mentorvradmin.demo.beans.RoomBean;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class RoomService extends BaseService{

    public List<RoomBean> getRoomsList(){
        if(!getConnection()){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error with connection with db");
        }

        List<RoomBean> rooms = new ArrayList<>();

        try{
            PreparedStatement stmt = c.prepareStatement("SELECT * FROM rooms",  ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
            ResultSet rs = stmt.executeQuery();
            while (rs.next())  {
                rooms.add(new RoomBean(
                        rs.getString("name"),
                        rs.getInt("people"),
                        rs.getTimestamp("start_time")
                ));
            }
            rs.close();
            stmt.close();
            c.close();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
        return rooms;
    }
}
