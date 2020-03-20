package com.jhzh.wms.service;

import com.jhzh.wms.dto.TaskStatusDto;

import java.util.List;

public interface WmsTaskService {
    List<TaskStatusDto> queryTaskStatus(String taskId);
}
