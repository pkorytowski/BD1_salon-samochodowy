package com.mentorvradmin.demo.beans;

import java.util.Date;

public class RoomBean {
    private String name;
    private int usersCount;
    private Date startTime;

    public RoomBean(String name, int usersCount, Date startTime){
        this.name = name;
        this.usersCount = usersCount;
        this.startTime = startTime;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setUsersCount(int usersCount) {
        this.usersCount = usersCount;
    }

    public int getUsersCount() {
        return usersCount;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getStartTime() {
        return startTime;
    }
}
