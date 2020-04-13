package com.jhzh.wms.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.http.HttpResult;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.dto.ItemBomInfoDto;
import com.jhzh.wms.service.ItemBomInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping
@Slf4j
public class ItemBomInfoController {
	@Resource
	private ItemBomInfoService itemBomInfoService;
	@Resource
	    private HttpResult.HttpAPIService httpAPIService;
	    @Value("${queryWoPlanInfoUrl}")
	    private String queryWoPlanInfoUrl;
	    @Value("${queryItemBomInfoUrl}")
	    private String queryItemBomInfoUrl;


	@PostMapping(value = "queryItemBomInfo")
    public Result<?> queryItemBomInfo(@RequestBody JSONObject jsonObject) {
		log.info("queryItemBomInfo begin..");
		Map<String,Object> map=jsonObject;
        map.put("wipEntityId",jsonObject.get("wipEntityId"));
        map.put("itemCode","");
        map.put("organizationId", "142");
        map.put("deptCode", "LMT");
        map.put("lastUpdateDateTo", "9999-12-31 00:00:00");
        map.put("lastUpdateDateFrom", "1990-01-01 00:00:00");
        map.put("lineTotal", "2000");
        map.put("lineNumber", "1");
        String JSONString = JSONObject.toJSONString(map);
        JSONObject resultData = httpAPIService.getResultData(queryWoPlanInfoUrl, JSONString);
		if (resultData.size()!=0){
			JSONArray itemList = resultData.getJSONArray("itemList");
            if (itemList.size() == 1) {
                JSONObject json = (JSONObject) itemList.get(0);
                String itemCode = (String) json.get("itemCode");
                HashMap map1=new HashMap();
                map1.put("organizationId", "142");
                map1.put("itemCode", itemCode);
                //根据物资编码获取物资组件信息
                ItemBomInfoDto itemBomInfoDto = httpAPIService.getResultData(queryItemBomInfoUrl, JSONObject.toJSONString(map1), ItemBomInfoDto.class);
                resultData.put("bomlist", itemBomInfoDto);
            }
		}

        log.info("queryItemBomInfo end..");
		return Result.success(resultData);
	}
}
