package com.jhzh.wms.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.dao.IlsCellDao;
import com.jhzh.wms.service.IlsCellService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class IlsCellServiceImpl implements IlsCellService {

    @Autowired
    private IlsCellDao IlscellDao;


    @Override
        public Result<?> queryAll(JSONObject jsonObject) {
       /* log.info(jsonObject.toJSONString());
        Map map=jsonObject;*/
        /*
        PageHelper.startPage(1,4);
        Map m=new HashMap();
        PageInfo<IlsCellDto> pageInfo=new PageInfo<IlsCellDto>(dtos);
        m.put("m",pageInfo);
        List<IlsCellDto> ilsCellDtos = IlscellDao.queryCell(new IlsCellDto());
        */

        return null;
    }
}
