package com.project.server_salon.objects;

public class Order {
    int id_order;
    Employee employee;
    CustomerShort customer;
    Unit unit;
    String status;
    double discount;
    double value;

    public Order(int id_order, Employee employee, Unit unit,
                 String status, double discount, double value){
        this.id_order = id_order;
        this.employee = employee;
        this.unit = unit;
        this.status = status;
        this.discount = discount;
        this.value = value;
    }

    public int getId_order() {
        return id_order;
    }

    public void setId_order(int id_order) {
        this.id_order = id_order;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee Employee) {
        this.employee = employee;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
