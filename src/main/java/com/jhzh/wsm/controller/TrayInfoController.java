package com.jhzh.wsm.controller;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wsm.dto.YxWmsCellDto;
import com.jhzh.wsm.service.TrayInfoService;
import com.jhzh.wsm.utils.result.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
        //獲取前端傳入的數據
        YxWmsCellDto yxWmsCellDto = jsonpObject.toJavaObject(YxWmsCellDto.class);
        //獲取12條數據
        List<YxWmsCellDto> yxWmsCellDtos = trayInfoService.queryTrayInfo(yxWmsCellDto);
        Result<?> result = trayInfoService.updateTrayInfo(yxWmsCellDto, yxWmsCellDtos);
        log.info("saveTrayInfo begin..");
        return Result.success(result);
    }
}
