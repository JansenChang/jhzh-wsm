package com.jhzh.wms.controller;


import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.service.FlowRecordService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 流水记录接口
 */
@RestController
@RequestMapping("wms")
@Slf4j
public class FlowRecordController {

    @Autowired
    private FlowRecordService flowRecordService;

    /**
     * 入库流水查询
     * @param jsonObject
     * @return
     */
    @PostMapping(value = "wmsInvInFlow")
    public Result<?> wmsInvInFlow(@RequestBody JSONObject jsonObject) {
        log.info("wmsInvInFlow begin..");
        Result<?> result = flowRecordService.wmsInvInFlow(jsonObject);
        log.info("wmsInvInFlow end..");
        return result;
    }

}
