package com.jhzh.wms.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
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
@RequestMapping
@Slf4j
public class WcsMsgController {
    @Autowired
    private UsrlogDao usrlogDao;

    @RequestMapping(value = "wcsMsg", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> wcsmsg() throws Exception {
        Integer pagenum = 1;
        Integer pagesize = 10;
        PageHelper.startPage(pagenum,pagesize);
        List<Map<String,Object>> maps=usrlogDao.getWcsMsg();
        PageInfo<Map<String, Object>> pageInfo=new PageInfo<>(maps);
        return Result.success(pageInfo);
    }
}
