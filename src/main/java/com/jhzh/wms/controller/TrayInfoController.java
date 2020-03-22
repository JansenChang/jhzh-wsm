package com.jhzh.wms.controller;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.dto.YxWmsCellDto;
import com.jhzh.wms.service.TrayInfoService;
import com.jhzh.wms.base.result.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class TrayInfoController {

    @Autowired
    private TrayInfoService trayInfoService;


    @RequestMapping(value = "saveTrayInfo", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> saveTrayInfo(@RequestBody  JSONObject  jsonpObject) throws Exception {
        log.info("saveTrayInfo begin..");
        log.info("In Param : \n"+jsonpObject.toJSONString());
        //获取前端传入数据
        YxWmsCellDto yxWmsCellDto = jsonpObject.toJavaObject(YxWmsCellDto.class);
        //获取12条数据
        List<YxWmsCellDto> yxWmsCellDtos = trayInfoService.queryTrayInfo(yxWmsCellDto);
        Result<?> result = trayInfoService.updateTrayInfo(yxWmsCellDto, yxWmsCellDtos);
        log.info("saveTrayInfo begin..");
        return result;
    }
}
