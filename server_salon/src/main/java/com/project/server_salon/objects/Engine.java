package com.project.server_salon.objects;

public class Engine {
    private int id_silnik;
    private String nazwa;
    private double moc;
    private int liczba_cylidnrow;
    private double emisja_co2;
    private double pojemnosc_skokowa;
    private String rodzaj_paliwa;
    private double cena;

    public Engine(int id_silnik, String nazwa, double moc, int liczba_cylidnrow, double emisja_co2, double pojemnosc_skokowa,
                  String rodzaj_paliwa, double cena){
        this.id_silnik = id_silnik;
        this.nazwa = nazwa;
        this.moc = moc;
        this.liczba_cylidnrow = liczba_cylidnrow;
        this.emisja_co2 = emisja_co2;
        this.pojemnosc_skokowa = pojemnosc_skokowa;
        this.rodzaj_paliwa = rodzaj_paliwa;
        this.cena = cena;
    }

    public int getId_silnik() { return id_silnik; }

    public void setId_silnik(int id_silnik) { this.id_silnik = id_silnik; }

    public String getNazwa() { return nazwa; }

    public void setNazwa(String nazwa) { this.nazwa = nazwa; }

    public double getMoc() { return moc; }

    public void setMoc(double moc) { this.moc = moc; }

    public int getLiczba_cylidnrow() { return liczba_cylidnrow; }

    public void setLiczba_cylidnrow(int liczba_cylidnrow) { this.liczba_cylidnrow = liczba_cylidnrow; }

    public double getEmisja_co2() { return emisja_co2; }

    public void setEmisja_co2(double emisja_co2) { this.emisja_co2 = emisja_co2; }

    public double getPojemnosc_skokowa() { return pojemnosc_skokowa; }

    public void setPojemnosc_skokowa(double pojemnosc_skokowa) { this.pojemnosc_skokowa = pojemnosc_skokowa; }

    public String getRodzaj_paliwa() { return rodzaj_paliwa; }

    public void setRodzaj_paliwa(String rodzaj_paliwa) { this.rodzaj_paliwa = rodzaj_paliwa; }

    public double getCena() { return cena; }

    public void setCena(double cena) { this.cena = cena; }


}
