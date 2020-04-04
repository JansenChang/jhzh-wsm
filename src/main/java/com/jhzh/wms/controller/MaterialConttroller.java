package com.jhzh.wms.controller;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.service.MaterialService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@Slf4j
public class MaterialConttroller {

    @Autowired
    private MaterialService materialService;

    @PostMapping(value = "innerMaterial")
    public Result<?> innerMaterial(@RequestBody JSONObject jsonObject) {
        log.info("innerMaterial begin..");
        Integer areano=15;
        Result<?> result = materialService.queryMaterialAll(jsonObject,areano);
        log.info("innerMaterial end..");
        return result;
    }

    @PostMapping(value = "outerMaterial")
    public Result<?> outerMaterial(@RequestBody JSONObject jsonObject) {
        log.info("outerMaterial begin..");
        Integer areano=10;
        Result<?> result = materialService.queryMaterialAll(jsonObject, areano);
        log.info("outerMaterial end..");
        return result;
    }

}
