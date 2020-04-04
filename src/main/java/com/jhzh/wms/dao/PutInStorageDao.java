package com.jhzh.wms.dao;

import com.jhzh.wms.dto.WmsInvInDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface PutInStorageDao {
    void insertWmsInvIn(WmsInvInDto wmsInvInDto);

    List<WmsInvInDto> QueryWarehouseFinish();

    void updateStatus(@Param("key") String key,@Param("status")Long status);

    List<WmsInvInDto> queryItemCode(@Param("itemCode") String itemCode);

     List<WmsInvInDto> queryWmsInvInForTaskId(@Param("taskId") String taskId);

     List<Map<String, Object>> queryWmsInvInFlow(Map map);



}
