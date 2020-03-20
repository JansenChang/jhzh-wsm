package com.jhzh.wms.service;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.result.Result;

public interface PutInStorageService {
    Result<?> queryFreeSpace(JSONObject jsonpObject);

    Result<?> wmsInvIn(JSONObject jsonpObject);

    Result<?> queryStockNum(JSONObject jsonpObject);
}
