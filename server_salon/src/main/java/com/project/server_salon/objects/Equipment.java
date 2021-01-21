package com.project.server_salon.objects;

public class Equipment {
    int id_equipment;
    int type;
    String name;
    String description;
    double value;

    public Equipment(int id_equipment, int type, String name, String description, double value){
        this.id_equipment = id_equipment;
        this.type = type;
        this.name = name;
        this.description = description;
        this.value = value;
    }

    public int getId_equipment() { return id_equipment; }

    public void setId_equipment(int id_equipment) { this.id_equipment = id_equipment; }

    public int getType() { return type; }

    public void setType(int type) {this.type = type; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public double getValue() { return value; }

    public void setValue(double value) { this.value = value; }
}
