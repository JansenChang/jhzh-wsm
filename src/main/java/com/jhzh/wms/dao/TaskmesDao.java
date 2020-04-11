package com.jhzh.wms.dao;

import com.jhzh.wms.dto.TaskmesDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TaskmesDao {


    void updateTaskmes(TaskmesDto dto);

    List<TaskmesDto> queryTaskmes(TaskmesDto dto);


    List<TaskmesDto> queryCompletedTask(TaskmesDto taskmesDto);

    List<TaskmesDto> queryPickTask();

}
