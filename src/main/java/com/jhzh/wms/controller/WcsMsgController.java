package com.jhzh.wms.controller;

import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.dao.UsrlogDao;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("wms")
@Slf4j
public class WcsMsgController {
    @Autowired
    private UsrlogDao usrlogDao;

    @RequestMapping(value = "wcsMsg", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> wcsmsg() throws Exception {
        List<Map> maps=usrlogDao.getWcsMsg();
        return null;
    }
}
