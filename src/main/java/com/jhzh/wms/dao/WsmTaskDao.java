package com.jhzh.wms.dao;

import com.jhzh.wms.dto.TaskStatusDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface WsmTaskDao {


    List<TaskStatusDto> queryTaskStatus(@Param("taskId") String taskId);
}
