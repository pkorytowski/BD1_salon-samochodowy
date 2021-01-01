package com.project.server_salon.objects;

public class Employee {
    private int id_pracownika;
    private String name;
    private String surname;
    private String position;
    private String email;

    public Employee(){}

    public Employee(int id_pracownika, String name, String surname, String position, String email){
        this.id_pracownika = id_pracownika;
        this.name = name;
        this.surname = surname;
        this.position = position;
        this.email = email;
    }

    public void setId_pracownika(int id_pracownika){ this.id_pracownika=id_pracownika; }

    public int getId_pracownika(){ return id_pracownika; }

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return name;
    }

    public void setSurname(String surname){ this.surname = surname; }

    public String getSurname(){
        return surname;
    }

    public void setPosition(String position){
        this.position = position;
    }

    public String getPosition(){
        return position;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getEmail(){
        return email;
    }


}
