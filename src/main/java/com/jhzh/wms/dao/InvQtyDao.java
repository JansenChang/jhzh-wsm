package com.jhzh.wms.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface InvQtyDao {
   List<Map<String,Object>> queryInvQty(@Param("map") Map map);
}
