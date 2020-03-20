package com.jhzh.wms.controller;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.service.PutInStorageService;
import com.jhzh.wms.base.result.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * WSM入库查询接口
 */
@Slf4j
@RestController
public class PutInStorageController {

    @Autowired
    private PutInStorageService putInStorageService;

    //入库口空闲状态查询接口(wmsInStatus)
    @RequestMapping(value = "wms/wmsInStatus", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> wmsInStatus(@RequestBody JSONObject jsonpObject) throws Exception {
        log.info("WsmInStatus begin..");
        log.info("In Param : \n"+jsonpObject.toJSONString());
        Result<?> result=putInStorageService.queryFreeSpace(jsonpObject);
        log.info("WsmInStatus end..");
        return result;
    }
    // 入库接口(wmsInvIn)
    @RequestMapping(value = "wms/WmsInvIn", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> wmsInvIn(@RequestBody JSONObject jsonpObject) throws Exception {
        log.info("WmsInvIn begin..");
        log.info("In Param : \n"+jsonpObject.toJSONString());
        Result<?> result=putInStorageService.wmsInvIn(jsonpObject);
        log.info("WmsInvIn begin..");
        return result;
    }
    //工单配套拣选后总盘数查询接口(wmsWoTStockNum)
    @RequestMapping(value = "wms/wmsWoTStockNum", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> wmsWoTStockNum(@RequestBody JSONObject jsonpObject) throws Exception {
        log.info("wmsWoTStockNum begin..");
        log.info("In Param : \n"+jsonpObject.toJSONString());
        Result<?> result=putInStorageService.queryStockNum(jsonpObject);
        log.info("wmsWoTStockNum begin..");
        return result;
    }


}
