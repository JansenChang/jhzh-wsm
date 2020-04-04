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
@RequestMapping
@Slf4j
public class RepertroyController {
    @Autowired
    private RepertroyService repertroyService;

    @PostMapping(value = "dynamicRepertroy")
    public Result<?> dynamicRepertroy() {
        Result<?> result = repertroyService.queryDynamicRepertroy();
        return result;
    }
    @PostMapping(value = "dynamicRepertroyById")
    public Result<?> dynamicRepertroyById(@RequestBody JSONObject jsonObject) {
        String rowandcol = (String) jsonObject.get("rowandcol");
        jsonObject.put("rowandcol",rowandcol.substring(0,rowandcol.length()-2));
        Result<?> result = repertroyService.queryDynamicRepertroyById(jsonObject);
        return result;
    }
    @PostMapping(value = "dynamicRepertroyInterlayer")
    public Result<?> dynamicRepertroyInterlayer() {
        Result<?> result = repertroyService.dynamicRepertroyFirstlayer();
        return result;
    }
    @PostMapping(value = "updateRepertroy")
    public Result<?> updateRepertroy(@RequestBody JSONObject jsonObject) {
        log.info("updateRepertroy begin..");
        Result<?> result = repertroyService.updateRepertroy(jsonObject);
        log.info("updateRepertroy end..");
        return result;
    }
}
