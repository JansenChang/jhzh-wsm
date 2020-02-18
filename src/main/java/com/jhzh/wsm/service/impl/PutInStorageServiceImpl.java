package com.jhzh.wsm.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wsm.service.PutInStorageService;
import com.jhzh.wsm.utils.result.Result;
import lombok.extern.log4j.Log4j;
import org.springframework.stereotype.Service;

import java.util.TreeMap;

/**
 * WSM入库查询接口业务处理类
 */
@Log4j
@Service
public class PutInStorageServiceImpl implements PutInStorageService {

    @Override
    public Result<?> queryFreeSpace(JSONObject jsonpObject) {
        TreeMap<String,Object> resultData =new TreeMap<>();
        resultData.put("locator","987987");
        resultData.put("memoInfo1","");
        resultData.put("memoInfo2","");
        resultData.put("memoInfo3","");
        resultData.put("memoInfo4","");
        resultData.put("memoInfo5","");
        return Result.success(resultData);
    }

    @Override
    public Result<?> StorMaterialInformation(JSONObject jsonpObject) {

        return Result.success("物品正在入库");
    }

    @Override
    public Result<?> queryStockNum(JSONObject jsonpObject) {
       return Result.success("物品正在如库");
    }
}
