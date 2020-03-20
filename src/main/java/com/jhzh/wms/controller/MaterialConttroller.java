package com.jhzh.wms.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.service.IlsCellService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("wms")
@Slf4j
public class MaterialConttroller {

    @Resource
    private IlsCellService ilsCellService;

    @PostMapping(value = "innerMaterial", produces = "application/json;charset=UTF-8")
    public Result<?> innerMaterial(@RequestBody JSONObject jsonObject) {
        log.info("innerMaterial begin..");
       Result<?> result= ilsCellService.queryAll(jsonObject);
       log.info("innerMaterial end..");
        return result;
    }
    @PostMapping(value = "outerMaterial", produces = "application/json;charset=UTF-8")
    public Map<String,Object> outerMaterial(@RequestBody JSONObject jsonObject) {
        PageHelper.startPage(1,4);
        Map m=new HashMap();
        log.info("queryTaskStatus begin..");
        /*  List<IlsCellDto>dtos= ilsCellService.queryAll(jsonObject);
        PageInfo<IlsCellDto> pageInfo=new PageInfo<IlsCellDto>(dtos);
        m.put("m",pageInfo);*/
        log.info("queryTaskStatus end..");
        return m;
    }
}
