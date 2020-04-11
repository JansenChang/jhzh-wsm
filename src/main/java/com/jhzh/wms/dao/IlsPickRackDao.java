package com.jhzh.wms.dao;


import com.jhzh.wms.dto.PickRackDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IlsPickRackDao {

    List<PickRackDto> pickRackList();

    int updLayer(PickRackDto pickRackDto);

    int updateStatus(String taskid);
}
