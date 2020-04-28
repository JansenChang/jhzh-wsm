package com.jhzh.wms.base.init;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;


/**
 * 项目启动任务执行计划
 */
@Slf4j
@Component
public class TaskCommandLineRunner implements CommandLineRunner, Ordered {
  /*  private volatile boolean stop = false;
    @Autowired
    private ExecutorConfig executorConfig;*/
  @Autowired
  private QueryTask queryTask;
    @Override
    public int getOrder() {
        return 2;
    }

    @Override
    public void run(String... strings) throws Exception {
       log.info("项目启动任务执行计划开始>>>>>>>>>>>>>>>>>>>>>>>>>");
       //queryTask.QueryWarehouseStatus();
       //queryTask.QueryExWarehouseStatus();
       //queryTask.QueryWoPlanInfo();
       //queryTask.QueryCompletedTask();
       // queryTask.QueueTask();
    }


}
