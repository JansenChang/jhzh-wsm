package com.jhzh.wms.service;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.result.Result;

public interface WmsInvOutService {
    Result<?> wmsInvOut(JSONObject jsonpObject);

    Result<?> invOutqueueTask(JSONObject jsonpObject);
}
