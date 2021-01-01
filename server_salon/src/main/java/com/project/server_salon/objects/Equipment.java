package com.project.server_salon.objects;

public class Equipment {
    int id_wyposazenia;
    String typ_wyposazenia;
    String nazwa;
    String opis;
    double cena;

    public Equipment(int id_wyposazenia, String typ_wyposazenia, String nazwa, String opis, double cena){
        this.id_wyposazenia = id_wyposazenia;
        this.typ_wyposazenia = typ_wyposazenia;
        this.nazwa = nazwa;
        this.opis = opis;
        this.cena = cena;
    }

    public int getId_wyposazenia() { return id_wyposazenia; }

    public void setId_wyposazenia(int id_wyposazenia) { this.id_wyposazenia = id_wyposazenia; }

    public String getTyp_wyposazenia() { return typ_wyposazenia; }

    public void setTyp_wyposazenia(String typ_wyposazenia) {this.typ_wyposazenia = typ_wyposazenia; }

    public String getNazwa() { return nazwa; }

    public void setNazwa(String nazwa) { this.nazwa = nazwa; }

    public String getOpis() { return opis; }

    public void setOpis(String opis) { this.opis = opis; }

    public double getCena() { return cena; }

    public void setCena(double cena) { this.cena = cena; }
}
