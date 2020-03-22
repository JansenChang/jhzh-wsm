package com.jhzh.wms.dao;

import com.jhzh.wms.dto.IlsCellDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface IlsCellDao {

    List<IlsCellDto> queryCell(IlsCellDto ilsCellDto);


    void updateCellByCellId(IlsCellDto ilsCellDto);

    List<String> queryUsableItem();

    List<IlsCellDto> queryStandardCell(IlsCellDto dto);

    List<Map<String,Object>> queryMaterial(Map map);


    List<IlsCellDto> queryDynamicRepertroy();
}
