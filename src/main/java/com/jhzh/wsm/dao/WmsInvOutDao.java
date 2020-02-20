package com.jhzh.wsm.dao;

import com.jhzh.wsm.dto.WmsInvOutBean;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WmsInvOutDao {


    void wmsInvOutSave(WmsInvOutBean wmsInvOutBean);
}
