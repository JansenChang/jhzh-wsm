package com.jhzh.wms.service;

import com.jhzh.wms.base.result.Result;

import java.util.Map;

public interface RepertroyService {
    Result<?> queryDynamicRepertroy();

    Result<?> queryDynamicRepertroyById(Map<String, Object> map);

    Result<?> dynamicRepertroyFirstlayer();

    Result<?> updateRepertroy(Map<String, Object> map);

    Result<?> getCabinetData();

    Result<?> getCageData();

	Result<?> getChoose();

}
