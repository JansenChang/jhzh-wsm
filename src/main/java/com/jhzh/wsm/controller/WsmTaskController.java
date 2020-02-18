package com.jhzh.wsm.controller;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wsm.utils.result.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * WSM 系统状态查询
 */
@Slf4j
@RestController
public class WsmTaskController {

    //立体库任务状态查询接
    @RequestMapping(value = "queryTaskStatus", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> queryTaskStatus(@RequestBody JSONObject jsonpObject) throws Exception {
        log.info("queryTaskStatus begin..");
        log.info("In Param : \n"+jsonpObject.toJSONString());

        log.info("queryTaskStatus begin..");
        return Result.success(null);
    }

     // 立体库库存查询接口
    @RequestMapping(value = "queryInvQty", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> queryInvQty(@RequestBody JSONObject jsonpObject) throws Exception {
        log.info("queryInvQty begin..");
        log.info("In Param : \n"+jsonpObject.toJSONString());

        log.info("queryInvQty begin..");
        return Result.success(null);
    }


}
