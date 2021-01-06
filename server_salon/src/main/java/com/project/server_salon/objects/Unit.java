package com.project.server_salon.objects;

public class Unit {
    int id_unit;
    int id_car;
    int id_color;
    String status;
    double value;

    public Unit(int id_unit, int id_car, int id_color, String status, double value){
        this.id_unit = id_unit;
        this.id_car = id_car;
        this.id_color = id_color;
        this.status = status;
        this.value = value;
    }

    public int getId_unit() {
        return id_unit;
    }

    public void setId_unit(int id_unit) {
        this.id_unit = id_unit;
    }

    public int getId_car() {
        return id_car;
    }

    public void setId_car(int id_car) {
        this.id_car = id_car;
    }

    public int getId_color() {
        return id_color;
    }

    public void setId_color(int id_color) {
        this.id_color = id_color;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
