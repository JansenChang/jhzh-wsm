package com.jhzh.wms.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ItemBomInfoDao {


    Integer queryItemBomInfo(@Param("componentItemId") Integer componentItemId);

}
