package com.jhzh.wsm.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wsm.dao.PutInStorageDao;
import com.jhzh.wsm.dto.WmsInvInBean;
import com.jhzh.wsm.service.PutInStorageService;
import com.jhzh.wsm.utils.result.Result;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;
import java.util.UUID;

/**
 * WSM入库查询接口业务处理类
 */
@Log4j
@Service
public class PutInStorageServiceImpl implements PutInStorageService {
    @Autowired
    private PutInStorageDao putInStorageDao;

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
    public Result<?> wmsInvIn(JSONObject jsonpObject) {
        WmsInvInBean wmsInvInBean = jsonpObject.toJavaObject(WmsInvInBean.class);
        wmsInvInBean.setId(UUID.randomUUID().toString().replaceAll("-",""));
        wmsInvInBean.setUnt(9);
        wmsInvInBean.setApp(900);
        wmsInvInBean.setDeptid(145);
        List<WmsInvInBean>wmsInvInBeanList=new ArrayList<>();
        WmsInvInBean date=new WmsInvInBean();
        List<WmsInvInBean.ItemListBean> itemList = wmsInvInBean.getItemList();
        for (WmsInvInBean.ItemListBean itemListBean : itemList) {
            date=wmsInvInBean;
            date.setIsMultiPalForLot(itemListBean.getIsMultiPalForLot());
            date.setItemCode(itemListBean.getItemCode());
            date.setLotCode(itemListBean.getLotCode());
            date.setQuantity(itemListBean.getQuantity());
            date.setShelfLay(itemListBean.getShelfLay());
            date.setStockNo(itemListBean.getStockNo());
            date.setWipEntityId(itemListBean.getWipEntityId());
            date.setQuantity(itemListBean.getQuantity());
            date.setIsMultiPalForLot(0);
            date.setLotCode(".");
            wmsInvInBeanList.add(date);
            putInStorageDao.wmsInvInSave(date);
        }

        return Result.success(jsonpObject);
    }

    @Override
    public Result<?> queryStockNum(JSONObject jsonpObject) {
       return Result.success("物品正在如库");
    }
}
