package com.jhzh.wms.dao;

import com.jhzh.wms.dto.CabinetDto;
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


     List<Map> queryDynamicRepertroy(Map<String, Object> map);

    List<Map> queryDynamicRepertroyById(Map map);

    List<String> dynamicRepertroyFirstlayer();

    int cleanCellByCellId(IlsCellDto ilsCellDto);

    int updateLocked(Map<String, Object> map);

    List<CabinetDto> getCabinetData();

    List<IlsCellDto> queryByRowCol(Integer rowcol);

    List<Map> queryInvIn(String cageStr);
}
