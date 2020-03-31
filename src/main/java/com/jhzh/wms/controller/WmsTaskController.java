package com.jhzh.wms.controller;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.dto.TaskStatusDto;
import com.jhzh.wms.service.InvQtyService;
import com.jhzh.wms.service.WmsTaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * WSM 系统状态查询
 */
@Slf4j
@RestController
public class WmsTaskController {

    @Autowired
    private WmsTaskService wmsTaskService;
    @Autowired
    private InvQtyService invQtyService;

    //立体库任务状态查询接口
    @RequestMapping(value = "wms/QueryTaskStatus", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> queryTaskStatus(@RequestBody JSONObject jsonpObject) throws Exception {
        log.info("立体库任务状态查询接口 begin..");
        String taskId = jsonpObject.get("taskId").toString();
        log.info(jsonpObject.toJSONString());
        List<TaskStatusDto> taskStatusDtos = wmsTaskService.queryTaskStatus(taskId);
        log.info("立体库任务状态查询接口 end..");
        return Result.success(taskStatusDtos.get(0));
    }

     // 立体库库存查询接口
    @RequestMapping(value = "wms/queryInvQty", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> queryInvQty(@RequestBody JSONObject jsonObject) throws Exception {
        log.info("queryInvQty begin..");
        log.info("In Param : \n"+jsonObject.toJSONString());
        Result<?> result = invQtyService.queryInvQty(jsonObject);
        log.info("queryInvQty end..");
        return result;
    }


}
