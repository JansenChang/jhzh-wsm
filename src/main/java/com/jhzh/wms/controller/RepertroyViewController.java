package com.jhzh.wms.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
public class RepertroyViewController {



    @RequestMapping(value = "/monitor")
    public String monitor() throws Exception {
        return "dphmap/monitor";
    }

     @RequestMapping(value = "/whcell_10f")
    public String whcell_10f() throws Exception {
        return "dphmap/whcell_10f";
    }

     @RequestMapping(value = "/whcell_15f")
    public String whcell_15f() throws Exception {
        return "dphmap/whcell_15f";
    }
}
