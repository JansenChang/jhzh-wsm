package com.jhzh.wms.controller;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.service.WmsInvOutService;
import com.jhzh.wms.base.result.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * WSM 芯板出库交互接口
 */
@Slf4j
@RestController
public class WmsInvOutController {
    @Autowired
    private WmsInvOutService wmsInvOutService;

    //芯板出库
    @RequestMapping(value = "/WmsInvOut", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> wmsInvOut(@RequestBody JSONObject jsonpObject) throws Exception {
        log.info("芯板出库请求 begin..");
        log.info("请求参数 : \n" + jsonpObject.toJSONString());
        Result<?> result = wmsInvOutService.invOutqueueTask(jsonpObject);
        log.info("芯板出库请求 End..");
        return result;
    }
}
