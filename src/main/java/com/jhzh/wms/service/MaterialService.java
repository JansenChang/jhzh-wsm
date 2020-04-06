package com.jhzh.wms.service;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.result.Result;

import java.util.Map;

public interface MaterialService {


    Result<?> queryMaterialAll(JSONObject jsonObject, Integer areano);

    Result<?> updateLocked(Map<String,Object> map);
}
