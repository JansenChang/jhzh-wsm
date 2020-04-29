package com.jhzh.wms.base.init;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.base.utils.EmptyUtils;
import com.jhzh.wms.dao.*;
import com.jhzh.wms.dto.QueueTaskDto;
import com.jhzh.wms.dto.TaskmesDto;
import com.jhzh.wms.dto.WmsInvInDto;
import com.jhzh.wms.service.ImesFeedBackService;
import com.jhzh.wms.service.WmsInvInService;
import com.jhzh.wms.service.WmsInvOutService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class QueryTask {
    @Autowired
    private WmsInvInDao wmsInvInDao;
    @Autowired
    private WmsInvOutDao wmsInvOutDao;
    @Autowired
    private ImesFeedBackService imesFeedBackService;
    @Autowired
    private TaskmesDao taskmesDao;
    @Autowired
    private IlsCellDao ilsCellDao;
    @Resource
    private QueueTaskDao queueTaskDao;
    @Resource
    private WmsInvInService wmsInvInService;
    @Resource
    private WmsInvOutService wmsInvOutService;

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
                    List<WmsInvInDto> wmsInvInDtos = wmsInvInDao.queryWmsInvInForTaskId(taskmes.getTaskid());
                    Map<String, String> map = imesFeedBackService.wmsInvInResult(wmsInvInDtos);
                    wmsInvInDao.updateStatus(taskmes.getTaskid(),Long.parseLong("12"));
                    //taskmes.setTaskid(".");
                    taskmes.setStatus(0);
                    taskmesDao.updateTaskmes(taskmes);
                    QueueTaskDto queueTaskDto=QueueTaskDto.builder()
                            .taskid(taskmes.getTaskid())
                            .status(3)
                            .build();
                    queueTaskDao.updateQueueTask(queueTaskDto);

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

    @Async
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

    @Async
	public void QueueInvOutTask() {
        while (true) {
               try {
                   List<TaskmesDto> taskmesFor1L = taskmesDao.query1LForTaskMes();
                   if(EmptyUtils.isNotEmpty(taskmesFor1L)){
                       Thread.sleep(10000);
                       continue;
                   }
                   List<QueueTaskDto>queueTaskList=queueTaskDao.queryQueueTask(QueueTaskDto.builder()
                           .status(1)
                           .queuetype(2)
                           .build());

                   if(EmptyUtils.isNotEmpty(queueTaskList)){
                       Thread.sleep(10000);
                       continue;
                   }
                   List<QueueTaskDto>queueTaskList2=queueTaskDao.queryQueueTask(QueueTaskDto.builder()
                                              .status(0)
                                              .queuetype(2)
                                              .build());

                   if(EmptyUtils.isEmpty(queueTaskList2)){
                       Thread.sleep(10000);
                       continue;
                   }
                   //取得任务
                   QueueTaskDto queueTaskDto = queueTaskList.get(0);

                   String requestbody = queueTaskDto.getRequestbody();
                   JSONObject jsonObject = JSONObject.parseObject(requestbody);
                   //调用出库接口
                   Result<?> result = wmsInvOutService.wmsInvOut(jsonObject);
                   queueTaskDto.setStatus(1);
                   queueTaskDao.updateQueueTask(queueTaskDto);
                   Thread.sleep(10000);
               } catch (Exception e) {
                   log.error(e.getMessage());
               }
         }
	}

    @Async
    public void QueueInvInLongCageTask() {
        while (true) {
            try {
                String name="B1PI";
                List<TaskmesDto> taskmesLongCage = taskmesDao.query2LForTaskMes(name);
                //长吊笼执行中
                if(EmptyUtils.isNotEmpty(taskmesLongCage)){
                    Thread.sleep(10000);
                    continue;
                }
                List<QueueTaskDto>queueTaskList=queueTaskDao.queryQueueTask(QueueTaskDto.builder()
                                           .status(1)
                                           .queuetype(3)
                                           .build());
                if(EmptyUtils.isEmpty(queueTaskList)){
                    Thread.sleep(10000);
                    continue;
                }
                QueueTaskDto queueTaskDto = queueTaskList.get(0);
                String requestbody = queueTaskDto.getRequestbody();
                JSONObject jsonObject = JSONObject.parseObject(requestbody);
                Result<?> result =wmsInvInService.invInLongCage(jsonObject);
                queueTaskDto.setStatus(1);
                queueTaskDao.updateQueueTask(queueTaskDto);
                Thread.sleep(10000);
            } catch (Exception e) {
                log.error(e.getMessage());
            }
        }
    }

    @Async
    public void QueueInvInShortCageTask() {
        while (true) {
            try {
                String name = "B2PI";
                List<TaskmesDto> taskmesLongCage = taskmesDao.query2LForTaskMes(name);
                //长吊笼执行中
                if (EmptyUtils.isNotEmpty(taskmesLongCage)) {
                    Thread.sleep(10000);
                    continue;
                }
                List<QueueTaskDto> queueTaskList = queueTaskDao.queryQueueTask(QueueTaskDto.builder()
                        .status(1)
                        .queuetype(4)
                        .build());
                if (EmptyUtils.isEmpty(queueTaskList)) {
                    Thread.sleep(10000);
                    continue;
                }
                QueueTaskDto queueTaskDto = queueTaskList.get(0);
                String requestbody = queueTaskDto.getRequestbody();
                JSONObject jsonObject = JSONObject.parseObject(requestbody);
                Result<?> result = wmsInvInService.invInLongCage(jsonObject);
                queueTaskDto.setStatus(1);
                queueTaskDao.updateQueueTask(queueTaskDto);
                Thread.sleep(10000);
            } catch (Exception e) {
                log.error(e.getMessage());
            }
        }
    }
    @Async
    public void QueueInvIn1LTask() {
        while (true) {
              try {
                  List<TaskmesDto> taskmesLongCage = taskmesDao.query1LForTaskMes();
                  //1楼任务已存在
                  if (EmptyUtils.isNotEmpty(taskmesLongCage)) {
                      Thread.sleep(10000);
                      continue;
                  }
                  List<QueueTaskDto> queueTaskList = queueTaskDao.queryQueueTask(QueueTaskDto.builder()
                          .status(1)
                          .queuetype(1)
                          .build());
                  if (EmptyUtils.isEmpty(queueTaskList)) {
                      Thread.sleep(10000);
                      continue;
                  }
                  QueueTaskDto queueTaskDto = queueTaskList.get(0);
                  String requestbody = queueTaskDto.getRequestbody();
                  JSONObject jsonObject = JSONObject.parseObject(requestbody);
                  Result<?> result = wmsInvInService.invIn1LCage(jsonObject);
                  queueTaskDto.setStatus(1);
                  queueTaskDao.updateQueueTask(queueTaskDto);
                  Thread.sleep(10000);
              } catch (Exception e) {
                  log.error(e.getMessage());
              }
        }
    }
}
