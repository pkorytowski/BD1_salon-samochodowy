package com.project.server_salon.objects;

public class Model {
    private int id_modelu;
    private String nazwa;
    private String typ_nadwozia;
    private double cena_bazowa;

    public Model(int id_modelu, String nazwa, String typ_nadwozia, double cena_bazowa){
        this.id_modelu = id_modelu;
        this.nazwa = nazwa;
        this.typ_nadwozia = typ_nadwozia;
        this.cena_bazowa = cena_bazowa;
    }

    public int getId_modelu(){ return id_modelu; }

    public void setId_modelu(int id_modelu){ this.id_modelu=id_modelu; }

    public String getNazwa(){ return nazwa; }

    public void setNazwa(String nazwa){ this.nazwa=nazwa; }

    public String getTyp_nadwozia(){ return typ_nadwozia; }

    public void setTyp_nadwozia(String typ_nadwozia){ this.typ_nadwozia=typ_nadwozia; }

    public double getCena_bazowa(){ return cena_bazowa; }

    public void setCena_bazowa(double cena_bazowa){ this.cena_bazowa=cena_bazowa; }


}
