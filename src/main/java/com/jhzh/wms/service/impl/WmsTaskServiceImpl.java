package com.jhzh.wms.service.impl;

import com.jhzh.wms.dao.WsmTaskDao;
import com.jhzh.wms.dto.TaskStatusDto;
import com.jhzh.wms.service.WmsTaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class WmsTaskServiceImpl implements WmsTaskService {
    @Autowired
    private WsmTaskDao wsmTaskDao;


    @Override
    public List<TaskStatusDto> queryTaskStatus(String taskId) {
        return wsmTaskDao.queryTaskStatus(taskId);
    }
}
