package com.jhzh.wms.controller;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.service.RepertroyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("wms")
@Slf4j
public class RepertroyController {
    @Autowired
    private RepertroyService repertroyService;

    @PostMapping(value = "dynamicRepertroy")
    public Result<?> dynamicRepertroy(@RequestBody JSONObject jsonObject) {
        log.info("DynamicRepertroy begin..");
        Result<?> result = repertroyService.queryDynamicRepertroy(jsonObject);
        log.info("DynamicRepertroy end..");
        return result;
    }
    @PostMapping(value = "dynamicRepertroyById")
    public Result<?> dynamicRepertroyById(@RequestBody JSONObject jsonObject) {
        log.info("dynamicRepertroyById begin..");
        String rowandcol = (String) jsonObject.get("rowandcol");
        jsonObject.put("rowandcol",rowandcol.substring(0,rowandcol.length()-2));
        Result<?> result = repertroyService.queryDynamicRepertroyById(jsonObject);
        log.info("dynamicRepertroyById end..");
        return result;
    }
    @PostMapping(value = "dynamicRepertroyInterlayer")
    public Result<?> dynamicRepertroyInterlayer() {
        log.info("dynamicRepertroyInterlayer begin..");
        Result<?> result = repertroyService.dynamicRepertroyFirstlayer();
        log.info("dynamicRepertroyInterlayer end..");
        return result;
    }

}
