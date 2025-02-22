package com.jhzh.wms.dao;

import com.jhzh.wms.dto.TaskmesDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TaskmesDao {


    void updateTaskmes(TaskmesDto dto);

    List<TaskmesDto> queryTaskmes(TaskmesDto dto);


    List<TaskmesDto> queryCompletedTask(TaskmesDto taskmesDto);

    List<TaskmesDto> queryPickTask();

    List<TaskmesDto> getCageData();

    List<TaskmesDto> query1LForTaskMes();

    List<TaskmesDto> queryChoose();

    List<TaskmesDto> query2LForTaskMes(@Param("name") String name);
}
