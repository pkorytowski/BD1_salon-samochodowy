package com.project.server_salon.objects;

public class Engine {
    private int id_engine;
    private String name;
    private double power;
    private int cylinders;
    private double co2_emission;
    private double displacement;
    private String fuel;
    private double value;

    public Engine(int id_engine, String name, double power, int cylinders, double co2_emission, double displacement,
                  String fuel, double value){
        this.id_engine = id_engine;
        this.name = name;
        this.power = power;
        this.cylinders = cylinders;
        this.co2_emission = co2_emission;
        this.displacement = displacement;
        this.fuel = fuel;
        this.value = value;
    }

    public int getId_engine() { return id_engine; }

    public void setId_engine(int id_engine) { this.id_engine = id_engine; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public double getPower() { return power; }

    public void setPower(double power) { this.power = power; }

    public int getCylinders() { return cylinders; }

    public void setCylinders(int cylinders) { this.cylinders = cylinders; }

    public double getCo2_emission() { return co2_emission; }

    public void setCo2_emission(double co2_emission) { this.co2_emission = co2_emission; }

    public double getDisplacement() { return displacement; }

    public void setDisplacement(double displacement) { this.displacement = displacement; }

    public String getFuel() { return fuel; }

    public void setFuel(String fuel) { this.fuel = fuel; }

    public double getValue() { return value; }

    public void setValue(double value) { this.value = value; }


}
