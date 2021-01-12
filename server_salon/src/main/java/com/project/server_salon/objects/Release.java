package com.project.server_salon.objects;

import java.sql.Timestamp;

public class Release {
    int id_release;
    int id_employee;
    int id_order;
    Timestamp date;

    public Release(int id_release, int id_employee, int id_order, Timestamp date){
        this.id_release = id_release;
        this.id_employee = id_employee;
        this.id_order = id_order;
        this.date = date;
    }

    public int getId_release() {
        return id_release;
    }

    public void setId_release(int id_release) {
        this.id_release = id_release;
    }

    public int getId_employee() {
        return id_employee;
    }

    public void setId_employee(int id_employee) {
        this.id_employee = id_employee;
    }

    public int getId_order() {
        return id_order;
    }

    public void setId_order(int id_order) {
        this.id_order = id_order;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }
}
