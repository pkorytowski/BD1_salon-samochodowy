package com.project.server_salon.objects;

public class Color {
    int id_color;
    String name;
    String type;
    double value;

    public Color(int id_color, String name, String type, double value){
        this.id_color = id_color;
        this.name = name;
        this.type = type;
        this.value = value;
    }

    public int getId_color() {
        return id_color;
    }

    public void setId_color(int id_color) {
        this.id_color = id_color;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
