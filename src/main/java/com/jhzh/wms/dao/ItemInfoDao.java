package com.jhzh.wms.dao;

import com.jhzh.wms.dto.ItemInfoDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ItemInfoDao {

    void  insertItemInfo(ItemInfoDto itemInfoDto);

    Integer queryItemInfoByItemCode(@Param("itemCode") String itemCode);

    void updateItemInfo(ItemInfoDto itemInfoDto);
}
