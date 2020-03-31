package com.jhzh.wms.service.impl;

import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.dao.IlsCellDao;
import com.jhzh.wms.service.RepertroyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class RepertroyServiceImpl implements RepertroyService {
    @Autowired
    private IlsCellDao IlscellDao;

    @Override
    public Result<?> queryDynamicRepertroy(Map<String, Object> map) {
        List<Map> ilsCellDtoList= IlscellDao.queryDynamicRepertroy(map);
        return Result.success(ilsCellDtoList);
    }

    @Override
    public Result<?> queryDynamicRepertroyById(Map<String, Object> map) {
        List<Map> ilsCellDtoList= IlscellDao.queryDynamicRepertroyById(map);
        return Result.success(ilsCellDtoList);
    }

    @Override
    public Result<?> dynamicRepertroyFirstlayer() {
        List<String> firstLayer= IlscellDao.dynamicRepertroyFirstlayer();
        return Result.success(firstLayer);
    }
}
