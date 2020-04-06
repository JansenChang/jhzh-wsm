package com.jhzh.wms.dao;

import com.jhzh.wms.dto.YxWmsCellDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface YxWmsCellDao {

    List<YxWmsCellDto> queryTrayInfo(YxWmsCellDto yxWmsCellDto);

    int updateTrayInfo(YxWmsCellDto updateDto);

    List<YxWmsCellDto> selectAllTray();

    void update(YxWmsCellDto dto);

    List<YxWmsCellDto> queryTaryByRowCol(Map<String, Object> map);

    List<YxWmsCellDto> queryByTrayno(@Param("trayno") String trayno);

    int delByRowAndCol(Map<String, Object> map);
}
