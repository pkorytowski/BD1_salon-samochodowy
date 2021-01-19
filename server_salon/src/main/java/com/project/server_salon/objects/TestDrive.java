package com.project.server_salon.objects;

import java.sql.Timestamp;

public class TestDrive {
    int id_test_drive;
    int id_employee;
    String employeeSurname;
    String employeeName;
    int id_customer;
    String customerSurname;
    String customerName;
    int id_unit;
    Timestamp date;

    public TestDrive(int id_test_drive, int id_employee, String employeeSurname, String employeeName,
                     int id_customer, String customerSurname, String customerName,
                     int id_unit, Timestamp date){
        this.id_test_drive = id_test_drive;
        this.id_employee = id_employee;
        this.employeeSurname = employeeSurname;
        this.employeeName = employeeName;
        this.id_customer = id_customer;
        this.customerSurname = customerSurname;
        this.customerName = customerName;
        this.id_unit = id_unit;
        this.date = date;
    }

    public int getId_test_drive() {
        return id_test_drive;
    }

    public void setId_test_drive(int id_test_drive) {
        this.id_test_drive = id_test_drive;
    }

    public int getId_employee() {
        return id_employee;
    }

    public void setId_employee(int id_employee) {
        this.id_employee = id_employee;
    }

    public String getEmployeeSurname() {
        return employeeSurname;
    }

    public void setEmployeeSurname(String employeeSurname) {
        this.employeeSurname = employeeSurname;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getCustomerSurname() {
        return customerSurname;
    }

    public void setCustomerSurname(String customerSurname) {
        this.customerSurname = customerSurname;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
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

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }
}
