package com.jhzh.wms.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.dao.IlsCellDao;
import com.jhzh.wms.service.MaterialService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    private IlsCellDao IlscellDao;


    @Override
        public Result<?> queryMaterialAll(JSONObject jsonObject, Integer areano) {
        Integer pagenum = (Integer) jsonObject.get("pagenum");
        Integer pagesize = (Integer) jsonObject.get("pagesize");
        PageHelper.startPage(pagenum,pagesize);
        Map map=jsonObject;
        map.put("areano",areano);
        List<Map<String, Object>> maps = IlscellDao.queryMaterial(map);
        PageInfo<Map<String, Object>> pageInfo=new PageInfo<>(maps);
        return Result.success(pageInfo);
    }

    @Override
    public Result<?> updateLocked(Map<String, Object> map) {
        return Result.success(IlscellDao.updateLocked(map));
    }



}
