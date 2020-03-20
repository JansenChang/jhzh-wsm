package com.jhzh.wms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TrayInfoIndexController {

    @RequestMapping("trayInfoView")
    public String toTrayInfoView(){
        return "check";
    }
}
