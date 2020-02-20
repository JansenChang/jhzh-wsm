package com.jhzh.wsm.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wsm.dao.WmsInvOutDao;
import com.jhzh.wsm.dto.WmsInvOutBean;
import com.jhzh.wsm.service.WmsInvOutService;
import com.jhzh.wsm.utils.result.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class WmsInvOutServiceImpl implements WmsInvOutService {

    @Autowired
    private WmsInvOutDao wmsInvOutDao;


    @Override
    public Result<?> wmsInvOut(JSONObject jsonpObject) {
        WmsInvOutBean wmsInvOutBean = jsonpObject.toJavaObject(WmsInvOutBean.class);
        wmsInvOutBean.setId(UUID.randomUUID().toString().replaceAll("-",""));
        wmsInvOutBean.setUnt(9);
        wmsInvOutBean.setApp(900);
        wmsInvOutBean.setDeptid(145);
        wmsInvOutDao.wmsInvOutSave(wmsInvOutBean);
        return Result.success(jsonpObject);
    }
}
