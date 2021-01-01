package com.project.server_salon.objects;

import java.util.ArrayList;

public class Version {
    int id_wersje_wyposazenia;
    String nazwa;
    double cena;
    ArrayList<Equipment> equipmentList;

    public Version(int id_wersje_wyposazenia, String nazwa, double cena){
        this.id_wersje_wyposazenia = id_wersje_wyposazenia;
        this.nazwa = nazwa;
        this.cena = cena;
    }

    public int getId_wersje_wyposazenia() { return id_wersje_wyposazenia; }

    public void setId_wersje_wyposazenia(int id_wersje_wyposazenia) { this.id_wersje_wyposazenia = id_wersje_wyposazenia; }

    public String getNazwa() { return nazwa; }

    public void setNazwa(String nazwa) { this.nazwa = nazwa; }

    public double getCena() { return cena; }

    public void setCena(double cena) { this.cena = cena; }

    public ArrayList<Equipment> getEquipmentList() { return equipmentList; }

    public void setEquipmentList(ArrayList<Equipment> equipmentList) { this.equipmentList = equipmentList; }
}
