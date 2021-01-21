package com.project.server_salon.objects;

public class Model {
    private int id_model;
    private String name;
    private String chassis;
    String description;
    int length;
    int width;
    int height;
    int boot_size;
    private double value;

    public Model(int id_model, String name, String chassis, String description, int length, int width, int height, int boot_size, double value){
        this.id_model = id_model;
        this.name = name;
        this.chassis = chassis;
        this.description = description;
        this.length = length;
        this.width = width;
        this.height = height;
        this.boot_size = boot_size;
        this.value = value;
    }

    public int getId_model(){ return id_model; }

    public void setId_model(int id_model){ this.id_model = id_model; }

    public String getName(){ return name; }

    public void setName(String name){ this.name = name; }

    public String getChassis(){ return chassis; }

    public void setChassis(String chassis){ this.chassis = chassis; }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getBoot_size() {
        return boot_size;
    }

    public void setBoot_size(int boot_size) {
        this.boot_size = boot_size;
    }

    public double getValue(){ return value; }

    public void setValue(double value){ this.value = value; }


}
