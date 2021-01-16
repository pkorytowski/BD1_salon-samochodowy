package com.project.server_salon.objects;

public class Employee {
    private int id_employee;
    private String name;
    private String surname;
    private String position;
    private String email;

    public Employee(){}

    public Employee(int id_employee, String name, String surname, String position, String email){
        this.id_employee = id_employee;
        this.name = name;
        this.surname = surname;
        this.position = position;
        this.email = email;
    }

    public void setId_employee(int id_employee){ this.id_employee=id_employee; }

    public int getId_employee(){ return id_employee; }

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
