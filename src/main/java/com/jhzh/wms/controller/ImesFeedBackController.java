package com.jhzh.wms.controller;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.http.HttpResult;
import com.jhzh.wms.service.ImesFeedBackService;
import com.jhzh.wms.base.result.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;

/**
 * IMES反馈接口
 */
@Slf4j
@PropertySource("classpath:imesurlconfig.properties")
@RestController
public class ImesFeedBackController {
    @Resource
    private HttpResult.HttpAPIService httpAPIService;
    @Value("${wmsInvInResultUrl}")
    private String wmsInvInResultUrl;
    @Value("${wmsInvOutResultUrl}")
    private String wmsInvOutResultUrl;
    @Value("${queryItemInfoUrl}")
    private String queryItemInfoUrl;
    @Value("${queryItemBomInfoUrl}")
    private String queryItemBomInfoUrl;
    @Value("${queryWoPlanInfoUrl}")
    private String queryWoPlanInfoUrl;
    @Autowired
    private ImesFeedBackService ImesFeedBackservice;

    //物资编码查询接口
    @RequestMapping(value = "wms/queryItemInfo", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> queryItemInfo(@RequestBody JSONObject jsonpObject) throws Exception {
        log.info("queryItemInfo begin..");
        log.info("In Param : \n"+jsonpObject.toJSONString());
        HashMap<String,Object> map=new HashMap<>();
        ImesFeedBackservice.queryItemInfo(map);
        /*Result<?> result=putInStorageService.queryFreeSpace(jsonpObject);*/
        String s="{\"organizationId\": \"142\",\"itemCode\": \"301103680\",\"lastUpdateDateFrom\": \"1900-01-01 00:00:00\",\"lastUpdateDateTo\": \"2020-01-01 00:00:00\",\"lineNumber\": \"1\",\"lineTotal\": \"2000\" } ";
        HttpResult httpResult = httpAPIService.doPostJson(queryItemInfoUrl, s);
        log.info(httpResult.getBody());
        JSONObject jsonObject=JSONObject.parseObject(httpResult.getBody()) ;
        log.info("queryItemInfo end..");
        return Result.success(jsonObject);
    }

     //物资BOM查询接口
    @RequestMapping(value = "queryItemBomInfo", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> queryItemBomInfo(@RequestBody JSONObject jsonpObject) throws Exception {
        log.info("queryItemBomInfo begin..");
        log.info("In Param : \n"+jsonpObject.toJSONString());
        /*Result<?> result=putInStorageService.queryFreeSpace(jsonpObject);*/
        HttpResult httpResult = httpAPIService.doPostJson(queryItemBomInfoUrl, jsonpObject.toJSONString());
        log.info(httpResult.toString());
        log.info("queryItemBomInfo end..");
        return Result.success(httpResult.getBody());
    }

     //工序计划待产查询接口
    @RequestMapping(value = "queryWoPlanInfo", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> queryWoPlanInfo(@RequestBody JSONObject jsonpObject) throws Exception {
        log.info("queryWoPlanInfo begin..");
        log.info("In Param : \n"+jsonpObject.toJSONString());
        /*Result<?> result=putInStorageService.queryFreeSpace(jsonpObject);*/
        HttpResult httpResult = httpAPIService.doPostJson(queryWoPlanInfoUrl, jsonpObject.toJSONString());
        log.info(httpResult.toString());
        log.info("queryWoPlanInfo end..");
        return Result.success(httpResult.getBody());
    }

    //入库反馈接口
    @RequestMapping(value = "wmsInvInResult", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> wmsInvInResult(@RequestBody JSONObject jsonpObject) throws Exception {
        log.info("wmsInvInResult begin..");
        log.info("In Param : \n"+jsonpObject.toJSONString());
        /*Result<?> result=putInStorageService.queryFreeSpace(jsonpObject);*/
        HttpResult httpResult = httpAPIService.doPostJson(wmsInvInResultUrl, jsonpObject.toJSONString());
        log.info(httpResult.toString());
        log.info("wmsInvInResult end..");
        return Result.success(httpResult.getBody());
    }



    //出库反馈接口
    @RequestMapping(value = "wmsInvOutResult", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> wmsInvOutResult(@RequestBody JSONObject jsonpObject) throws Exception {
        log.info("wmsInvOutResult begin..");
        log.info("In Param : \n"+jsonpObject.toJSONString());
        /*Result<?> result=putInStorageService.queryFreeSpace(jsonpObject);*/
        HttpResult httpResult = httpAPIService.doPostJson(wmsInvOutResultUrl, jsonpObject.toJSONString());
        log.info(httpResult.toString());
        log.info("wmsInvOutResult end..");
        return Result.success(httpResult.getBody());
    }
}
