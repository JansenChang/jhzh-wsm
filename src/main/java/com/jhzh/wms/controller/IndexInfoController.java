package com.jhzh.wms.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
public class IndexInfoController {

     @RequestMapping(value = "/indexinfo")
     public String woPlayInfoView() throws Exception {
        return "index";
    }
    @RequestMapping(value = "/choose")
     public String choose() throws Exception {
        return "choose";
    }
}
