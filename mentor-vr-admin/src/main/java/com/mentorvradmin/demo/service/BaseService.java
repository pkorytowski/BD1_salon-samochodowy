package com.mentorvradmin.demo.service;

import com.mentorvradmin.demo.utils.DataSource;

import java.sql.Connection;
import java.sql.SQLException;

public class BaseService {
    Connection c = null;

    public Boolean getConnection(){

        try{
            c = DataSource.getConnection();
        }
        catch (SQLException e){
            return false;
        }
        return true;
    }


}
