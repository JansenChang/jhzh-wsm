package com.jhzh.wsm.service;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wsm.utils.result.Result;

public interface WmsInvOutService {
    Result<?> wmsInvOut(JSONObject jsonpObject);
}
