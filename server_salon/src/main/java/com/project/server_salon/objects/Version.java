package com.project.server_salon.objects;

import java.util.ArrayList;

public class Version {
    int id_version;
    String name;
    double value;
    int active;
    ArrayList<Equipment> equipmentList;

    public Version(int id_version, String name, double value, int active){
        this.id_version = id_version;
        this.name = name;
        this.value = value;
        this.active = active;
    }

    public int getId_version() { return id_version; }

    public void setId_version(int id_version) { this.id_version = id_version; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public double getValue() { return value; }

    public void setValue(double value) { this.value = value; }

    public int getActive() { return active; }

    public void setActive(int active) { this.active = active; }

    public ArrayList<Equipment> getEquipmentList() { return equipmentList; }

    public void setEquipmentList(ArrayList<Equipment> equipmentList) { this.equipmentList = equipmentList; }
}
