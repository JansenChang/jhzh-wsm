package com.jhzh.wms.dao;

import com.jhzh.wms.dto.QueueTaskDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface QueueTaskDao {


	void insertQueueTask(QueueTaskDto queueTaskDto);

	List<QueueTaskDto> queryQueueTask(QueueTaskDto queueTaskDto);

	int updateQueueTask(QueueTaskDto queueTaskDto);

	List<QueueTaskDto> queryQueueTaskByTaskId(String taskId);
}
