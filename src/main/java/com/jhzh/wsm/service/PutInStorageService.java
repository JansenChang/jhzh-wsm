package com.jhzh.wsm.service;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wsm.utils.result.Result;

public interface PutInStorageService {
    Result<?> queryFreeSpace(JSONObject jsonpObject);

    Result<?> wmsInvIn(JSONObject jsonpObject);

    Result<?> queryStockNum(JSONObject jsonpObject);
}
