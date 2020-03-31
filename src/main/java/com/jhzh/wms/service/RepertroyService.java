package com.jhzh.wms.service;

import com.jhzh.wms.base.result.Result;

import java.util.Map;

public interface RepertroyService {
    Result<?> queryDynamicRepertroy(Map<String, Object> map);

    Result<?> queryDynamicRepertroyById(Map<String, Object> map);

    Result<?> dynamicRepertroyFirstlayer();
}
