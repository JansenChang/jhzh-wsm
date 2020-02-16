package com.jhzh.wsm.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.jhzh.wsm.dao.TestDao;
import com.jhzh.wsm.dto.User;
import com.jhzh.wsm.dto.YxLasPart;
import com.jhzh.wsm.http.HttpAPIService;
import com.jhzh.wsm.http.HttpResult;
import com.jhzh.wsm.http.ResultMsg;
import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sun.reflect.annotation.ExceptionProxy;

import javax.annotation.Resource;
import java.sql.SQLOutput;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
public class HttpClientController {

    @Resource
    private HttpAPIService httpAPIService;

    @Resource
    private TestDao testDao;

    @RequestMapping("")
    public ResultMsg test() throws Exception {
        //String str = httpAPIService.doGet("http://www.baidu.com");
        //System.out.println(str);
        //List<Map<String, Object>> test = testDao.test();
        String json="{taskId: 12322, taskSource: 1234214, locator : 21424214, shelfCode : 124214 }";
       /* ;
        //TODO 请求
        HttpResult httpResult = httpAPIService.doPostJson("http://10.10.90.170:8080/103/wms/wmsInvInResult", json);
        String s = httpResult.toString();
        //System.out.println(jsonpObject.toString());
        System.out.println(s);

        ,
	    unt,
	    app,
	    dptid,
	    partid,
	    partcode,
	    atlast,
	    atlastdate,
	    partdesc,
	    parttype,
	    partstore ,
	    partunit,
	    partlifeday,
	    partactive


        */
        log.info("1213123");
        YxLasPart yxLasPart = new YxLasPart();
        yxLasPart.setId(new Long(1231123));

        testDao.insert(yxLasPart);
        List<YxLasPart>  yxLasParts=testDao.sel();
        System.out.println(yxLasParts);
        /*for (YxLasPart lasPart : yxLasParts) {
            lasPart.getAtlastdate();
        }*/
        String s = JSON.toJSONStringWithDateFormat(yxLasParts,"yyyy-MM-dd HH:mm:ss", SerializerFeature.WriteNullStringAsEmpty);
        System.out.println(s);
        return new ResultMsg(0, "芯板入库 WMS 接受成功!", "测试");
    }

    @RequestMapping(value = "SNYLLK.svc/Api/PallentIN", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public ResultMsg SNYLLKApiPallentIN(@RequestBody JSONObject jsonpObject) throws Exception {
        //TODO 入库
         testDao.test();
        String json="";
        //TODO 请求
        HttpResult httpResult = httpAPIService.doPostJson("http://10.10.90.170:8080/103/wms/wmsInvInResult", json);
        String s = httpResult.toString();
        System.out.println(jsonpObject.toString());
        System.out.println(s);
        return new ResultMsg(0, "芯板入库 WMS 接受成功!", "测试");
    }
}
