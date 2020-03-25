package com.jhzh.wms.controller;

import com.jhzh.wms.dao.InfNewDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("wms")
public class InfNewsController {
    @Autowired
    private InfNewDao infNewDao;

    @GetMapping(value = "infonews")
    @ResponseBody
    public String infoNews (){
        return infNewDao.getInfNews();
    }
}
