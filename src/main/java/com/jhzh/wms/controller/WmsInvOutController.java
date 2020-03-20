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
    @RequestMapping(value = "wms/WmsInvOut", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> wmsInvOut(@RequestBody JSONObject jsonpObject) throws Exception {
        log.info("wmsInvOut begin..");
        log.info("In Param : \n" + jsonpObject.toJSONString());
        Result<?> result = wmsInvOutService.wmsInvOut(jsonpObject);
        log.info("wmsInvOut begin..");
        return result;
    }
}
