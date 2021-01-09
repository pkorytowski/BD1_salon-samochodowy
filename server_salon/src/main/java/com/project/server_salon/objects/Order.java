package com.project.server_salon.objects;

public class Order {
    int id_order;
    int id_employee;
    int id_customer;
    int id_unit;
    String status;
    double discount;
    double value;

    public Order(int id_order, int id_employee, int id_customer, int id_unit,
                 String status, double discount, double value){
        this.id_order = id_order;
        this.id_employee = id_employee;
        this.id_customer = id_customer;
        this.id_unit = id_unit;
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

    public int getId_employee() {
        return id_employee;
    }

    public void setId_employee(int id_employee) {
        this.id_employee = id_employee;
    }

    public int getId_customer() {
        return id_customer;
    }

    public void setId_customer(int id_customer) {
        this.id_customer = id_customer;
    }

    public int getId_unit() {
        return id_unit;
    }

    public void setId_unit(int id_unit) {
        this.id_unit = id_unit;
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
