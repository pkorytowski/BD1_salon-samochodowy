package com.project.server_salon.objects;

public class Car {
    int id_car;
    int id_engine;
    int id_version;
    int id_model;
    int year;
    double value;
    int active;

    public Car(int id_car, int id_engine, int id_version, int id_model, int year, double value, int active){
        this.id_car = id_car;
        this.id_engine = id_engine;
        this.id_version = id_version;
        this.id_model = id_model;
        this.year = year;
        this.value = value;
        this.active = active;
    }

    public int getId_car() {
        return id_car;
    }

    public void setId_car(int id_car) {
        this.id_car = id_car;
    }

    public int getId_engine() {
        return id_engine;
    }

    public void setId_engine(int id_engine) {
        this.id_engine = id_engine;
    }

    public int getId_version() {
        return id_version;
    }

    public void setId_version(int id_version) {
        this.id_version = id_version;
    }

    public int getId_model() {
        return id_model;
    }

    public void setId_model(int id_model) {
        this.id_model = id_model;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    public int getActive() {
        return active;
    }

    public void setActive(int active) {
        this.active = active;
    }
}
