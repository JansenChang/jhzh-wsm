package com.jhzh.wms.service;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.result.Result;

public interface InvQtyService {
    Result<?> queryInvQty(JSONObject jsonObject);
}
