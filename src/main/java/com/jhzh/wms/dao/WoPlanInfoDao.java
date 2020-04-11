package com.jhzh.wms.dao;

import com.jhzh.wms.dto.WoPlanInfoDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface WoPlanInfoDao {

    void  insertWoPlanInfo(WoPlanInfoDto woPlanInfoDto);

    List<WoPlanInfoDto> queryWipEntity(WoPlanInfoDto woPlanInfoDto);

    List<WoPlanInfoDto> queryWipEntityById(@Param("wipEntityId") Integer wipEntityId);

    void updateStatus(@Param("taskid") String taskid);
}
