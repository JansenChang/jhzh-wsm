package com.jhzh.wms.service;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.result.Result;

public interface WmsInvInService {
    Result<?> queryFreeSpace(JSONObject jsonpObject);

    Result<?> wmsInvIn(JSONObject jsonpObject);

    Result<?> queryStockNum(JSONObject jsonpObject);

    Result<?> invInQueueTask(JSONObject jsonpObject);

    Result<?> invInLongCage(JSONObject jsonObject);

    Result<?> invIn1LCage(JSONObject jsonObject);
}
