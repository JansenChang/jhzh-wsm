package com.jhzh.wms.controller;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.http.HttpResult;
import com.jhzh.wms.base.init.PickTask;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.base.utils.EmptyUtils;
import com.jhzh.wms.service.ImesFeedBackService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Controller
public class WoPlayInfoController {
    @Autowired
    private ImesFeedBackService imesFeedBackService;
    @Resource
    private HttpResult.HttpAPIService httpAPIService;
    @Value("${queryWoPlanInfoUrl}")
    private String queryWoPlanInfoUrl;
    @Autowired
    private PickTask pickTask;

    @ResponseBody
    @RequestMapping(value = "/woPlayInfo", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> woPlayInfo( @RequestBody JSONObject jsonpObject) {
        Map<String,Object> map=jsonpObject;
        map.put("wipEntityId",jsonpObject.get("wipEntityId"));
        map.put("itemCode","");
        map.put("organizationId", "142");
        map.put("deptCode", "LMT");
        map.put("lastUpdateDateTo", "9999-12-31 00:00:00");
        map.put("lastUpdateDateFrom", "1990-01-01 00:00:00");
        map.put("lineTotal", "2000");
        map.put("lineNumber", "1");
        String JSONString = JSONObject.toJSONString(map);
        JSONObject resultData = httpAPIService.getResultData(queryWoPlanInfoUrl, JSONString);
        String uuid=null;
        if (resultData.size()!=0){
             uuid = imesFeedBackService.QueryWoPlanInfo(map);
        }
        if(EmptyUtils.isNotEmpty(uuid)){
             return Result.success(resultData);
        }
         return Result.success(null);
    }
    @ResponseBody
    @RequestMapping(value = "/woPlayInfo2", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Result<?> woPlayInfo2( @RequestBody JSONObject jsonpObject) {
        Map<String,Object> map=jsonpObject;
        map.put("wipEntityId",jsonpObject.get("wipEntityId"));
        map.put("itemCode","");
        map.put("organizationId", "142");
        map.put("deptCode", "LMT");
        map.put("lastUpdateDateTo", "9999-12-31 00:00:00");
        map.put("lastUpdateDateFrom", "1990-01-01 00:00:00");
        map.put("lineTotal", "2000");
        map.put("lineNumber", "1");
        String JSONString = JSONObject.toJSONString(map);
        JSONObject resultData = httpAPIService.getResultData(queryWoPlanInfoUrl, JSONString);
        String uuid=null;
        Map<String, Object> objectMap=new HashMap<>();
        if (resultData.size()!=0){
          objectMap = pickTask.woPlanInfo(map);
        }
        if("1".equals(objectMap.get("success"))){
             resultData.put("msg","配套成功！");
             resultData.put("success",objectMap.get("success"));
             return Result.success(resultData);
        }else if("0".equals(objectMap.get("success"))){
            resultData.put("msg",objectMap.get("msg"));
            resultData.put("success",objectMap.get("success"));
            return Result.success(resultData);
        }
        return Result.success(null);
    }
     @RequestMapping(value = "/woPlayInfoView")
     public String woPlayInfoView() throws Exception {
        return "woplaninfo";
     }
     @RequestMapping(value = "/woPlayInfoView2")
     public String woPlayInfoView2() throws Exception {
        return "woplaninfo2";
     }

}
