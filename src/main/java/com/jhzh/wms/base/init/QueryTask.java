package com.jhzh.wms.base.init;

import com.jhzh.wms.base.utils.EmptyUtils;
import com.jhzh.wms.dao.IlsCellDao;
import com.jhzh.wms.dao.PutInStorageDao;
import com.jhzh.wms.dao.TaskmesDao;
import com.jhzh.wms.dao.WmsInvOutDao;
import com.jhzh.wms.dto.TaskmesDto;
import com.jhzh.wms.dto.WmsInvInDto;
import com.jhzh.wms.service.ImesFeedBackService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class QueryTask {
    @Autowired
    private PutInStorageDao putInStorageDao;
    @Autowired
    private WmsInvOutDao wmsInvOutDao;
    @Autowired
    private ImesFeedBackService imesFeedBackService;
    @Autowired
    private TaskmesDao taskmesDao;
    @Autowired
    private IlsCellDao ilsCellDao;

    @Async
    public void QueryWarehouseStatus() {
        while (true) {
            try {
                //料盘入库
                TaskmesDto taskmesDto = TaskmesDto.builder()
                        .action(120)
                        .areano(15)
                        .build();
                List<TaskmesDto> taskmesList = taskmesDao.queryCompletedTask(taskmesDto);

                //空盘入库数据
                TaskmesDto taskmesDto2 = TaskmesDto.builder()
                        .action(110)
                        .areano(10)
                        .build();
                List<TaskmesDto> taskmesList2 = taskmesDao.queryCompletedTask(taskmesDto2);
                taskmesList.addAll(taskmesList2);
                if(EmptyUtils.isEmpty(taskmesList)){
                    Thread.sleep(10000);
                    continue;
                }
                /**
                 * 修改已完成的入库任务数据 500状态-->0状态
                 * 修改已完成的入库记录 -->12
                 */
                taskmesList.forEach(taskmes -> {
                    List<WmsInvInDto> wmsInvInDtos = putInStorageDao.queryWmsInvInForTaskId(taskmes.getTaskid());
                    Map<String, String> map = imesFeedBackService.wmsInvInResult(wmsInvInDtos);
                    putInStorageDao.updateStatus(taskmes.getTaskid(),Long.parseLong("12"));
                    //taskmes.setTaskid(".");
                    taskmes.setStatus(0);
                    taskmesDao.updateTaskmes(taskmes);
                });

                Thread.sleep(10000);
            } catch (InterruptedException e) {
                log.error(e.getMessage());
            }

        }
    }

    @Async
    public void QueryExWarehouseStatus() {
        while (true) {
            try {
                //查询任务表中出库成功数据
                TaskmesDto taskmesDto = TaskmesDto.builder()
                        .action(220)
                        .build();
                List<TaskmesDto> taskmesList = taskmesDao.queryCompletedTask(taskmesDto);
                if (taskmesList.size() > 0) {
                    //List<WmsInvOutDto> wmsInvOutDtoList = wmsInvOutDao.QueryWmsInvOutFinsh();
                    Map<String, String> map = imesFeedBackService.wmsInvOutResult(taskmesList);
                   /* if (map.size() > 0) {
                        map.forEach((key, value) -> {
                            wmsInvOutDao.updateStatus(key);
                        });
                    }*/
                    Thread.sleep(10000);
                } else {

                    Thread.sleep(10000);
                }
            } catch (InterruptedException e) {
                log.error(e.getMessage());
            }
        }
    }

    @Async
    public void QueryWoPlanInfo() {
        while (true) {
            try {
                //查询可用小料库存信息
                List<String> partidList=ilsCellDao.queryUsableItem();
                partidList.forEach(str->{
                    HashMap<String, Object> map = new HashMap<>();
                    map.put("itemCode", str);
                    imesFeedBackService.QueryWoPlanInfo(map);
                });
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                log.error(e.getMessage());
            }
        }
    }


    public void QueryCompletedTask() {
        while (true) {

            try {
                imesFeedBackService.QueryCompletedTask();
                Thread.sleep(10000);
            } catch (InterruptedException e) {
                log.error(e.getMessage());
            }
        }
    }
}
