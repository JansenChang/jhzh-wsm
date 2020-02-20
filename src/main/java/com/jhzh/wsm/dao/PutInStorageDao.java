package com.jhzh.wsm.dao;

import com.jhzh.wsm.dto.WmsInvInBean;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PutInStorageDao {
    void wmsInvInSave(WmsInvInBean wmsInvInBean);
}
