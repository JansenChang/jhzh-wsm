package com.jhzh.wms.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UsrlogDao {
    List<Map<String,Object>> getWcsMsg();

}
