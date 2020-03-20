package com.jhzh.wms.dao;

import com.jhzh.wms.dto.WmsInvOutDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface WmsInvOutDao {


    void insertWmsInvOut(WmsInvOutDto wmsInvOutDto);

    void updateStatus(@Param("key") String key);

    List<WmsInvOutDto> queryWmsInvOut(WmsInvOutDto wmsInvOutDto);
}
