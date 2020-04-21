package com.jhzh.wms.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.dao.PutInStorageDao;
import com.jhzh.wms.dao.WmsInvOutDao;
import com.jhzh.wms.dto.FlowRecordDto;
import com.jhzh.wms.service.FlowRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class FlowRecordServiceImpl implements FlowRecordService {
    @Autowired
    private PutInStorageDao putInStorageDao;
    @Autowired
    private WmsInvOutDao wmsInvOutDao;

    @Override
    public Result<?> wmsInvInFlow(JSONObject jsonObject) {
        Integer pagenum = (Integer) jsonObject.get("pagenum");
        Integer pagesize = (Integer) jsonObject.get("pagesize");
        PageHelper.startPage(pagenum,pagesize);
        Map map=jsonObject;
        List<FlowRecordDto> maps = putInStorageDao.queryWmsInvInFlow(map);
        PageInfo<FlowRecordDto> pageInfo=new PageInfo<>(maps);
        return Result.success(pageInfo);
    }

    @Override
    public Result<?> wmsInvOutFlow(JSONObject jsonObject) {
        Integer pagenum = (Integer) jsonObject.get("pagenum");
        Integer pagesize = (Integer) jsonObject.get("pagesize");
        PageHelper.startPage(pagenum,pagesize);
        Map map=jsonObject;
        List<Map<String, Object>> maps =wmsInvOutDao.queryWmsInvOutFlow(map);
        PageInfo<Map<String, Object>> pageInfo=new PageInfo<>(maps);
        return Result.success(pageInfo);
    }


}
