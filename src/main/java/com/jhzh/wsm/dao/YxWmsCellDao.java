package com.jhzh.wsm.dao;

import com.jhzh.wsm.dto.YxWmsCellDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface YxWmsCellDao {

    List<YxWmsCellDto> queryTrayInfo(YxWmsCellDto yxWmsCellDto);

    void updateTrayInfo(YxWmsCellDto updateDto);

    List<YxWmsCellDto> selectAllTray();

    void update(YxWmsCellDto dto);
}
