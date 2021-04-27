package com.mentorvradmin.demo.resource;


import com.mentorvradmin.demo.beans.RoomBean;
import com.mentorvradmin.demo.service.RoomService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping(path="/rooms")
@RestController
public class RoomResource {

    @GetMapping
    public List<RoomBean> getRoomsList(){

        return new RoomService().getRoomsList();
    }
}
