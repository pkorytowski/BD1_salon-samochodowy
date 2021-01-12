package com.project.server_salon.objects;

public class EquipmentInVersion {
    private int id_wyposazenia;
    private int typ_wyposazenia;

    public EquipmentInVersion(int id_wyposazenia, int typ_wyposazenia){
        this.id_wyposazenia = id_wyposazenia;
        this.typ_wyposazenia = typ_wyposazenia;
    }

    public int getId_wyposazenia() { return id_wyposazenia; }

    public void setId_wyposazenia(int id_wyposazenia) { this.id_wyposazenia = id_wyposazenia; }

    public int getTyp_wyposazenia() { return typ_wyposazenia; }

    public void setTyp_wyposazenia(int typ_wyposazenia) { this.typ_wyposazenia = typ_wyposazenia; }

}

