package com.jhzh.wms.dao;

import com.jhzh.wms.dto.WmsInvOutDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface WmsInvOutDao {


    void insertWmsInvOut(WmsInvOutDto wmsInvOutDto);

    void updateStatus(@Param("key") String key);

    List<WmsInvOutDto> queryWmsInvOut(WmsInvOutDto wmsInvOutDto);

    List<Map<String, Object>> queryWmsInvOutFlow(Map map);
}
