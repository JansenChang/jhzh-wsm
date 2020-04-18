package com.jhzh.wms.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.http.HttpResult;
import com.jhzh.wms.base.result.CodeMsg;
import com.jhzh.wms.base.result.ErrorCode;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.base.utils.EmptyUtils;
import com.jhzh.wms.dao.IlsCellDao;
import com.jhzh.wms.dao.TaskmesDao;
import com.jhzh.wms.dao.WmsInvOutDao;
import com.jhzh.wms.dto.*;
import com.jhzh.wms.service.WmsInvOutService;
import com.jhzh.wms.service.WmsTaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;


@Service
@Slf4j
public class WmsInvOutServiceImpl implements WmsInvOutService {

    @Autowired
    private WmsInvOutDao wmsInvOutDao;
    @Autowired
    private WmsTaskService wmsTaskService;
    @Autowired
    private TaskmesDao taskmesDao;
    @Autowired
    private IlsCellDao ilsCellDao;
    @Resource
    private HttpResult.HttpAPIService httpAPIService;
    @Value("${queryWoPlanInfoUrl}")
    private String queryWoPlanInfoUrl;

    @Override
    public Result<?>  wmsInvOut(JSONObject jsonObject) {
        try {
            //出库
            WmsInvOutDto wmsInvOutDto = jsonObject.toJavaObject(WmsInvOutDto.class);
            wmsInvOutDto.setId(System.currentTimeMillis() / 1000);
            wmsInvOutDto.setUnt(9);
            wmsInvOutDto.setApp(900);
            boolean massValue = validateFull(jsonObject);
            if (!massValue) {
                return Result.error(CodeMsg.builder().code(ErrorCode.NULL_OBJ.getCode()).msg(ErrorCode.NULL_OBJ.getMsg()).build());
            }
            boolean existTaskId = validateTaskId(jsonObject);
            if (existTaskId) {
                return Result.error(CodeMsg.builder().code(ErrorCode.IDALREADY_EXIST.getCode()).msg(ErrorCode.IDALREADY_EXIST.getMsg()).build());
            }
            Integer wipEntityId = wmsInvOutDto.getWipEntityId();
            HashMap<String, Object> map = new HashMap();
            map.put("organizationId", "142");
            map.put("lastUpdateDateFrom", "1990-01-01 00:00:00");
            map.put("lastUpdateDateTo", "9999-12-31 00:00:00");
            map.put("deptCode","LMT");
            map.put("lineNumber", "1");
            map.put("lineTotal", "2000");
            map.put("wipEntityId",wipEntityId);
            //根据工单获取待产信息,取得出库的物资编码
            /*WoPlanInfoDto resultData = httpAPIService.getResultData(queryWoPlanInfoUrl, JSONObject.toJSONString(map), WoPlanInfoDto.class);
            if(EmptyUtils.isEmpty(resultData.getItemList())){
                return Result.error(CodeMsg.builder().code(ErrorCode.IS_NULL_BOM.getCode()).msg(ErrorCode.IS_NULL_BOM.getMsg()).build());
            }*/
            //获盘信息去库中查找
            /*List<WoPlanInfoDto.ItemListBean> itemList = resultData.getItemList();
            WoPlanInfoDto.ItemListBean itemListBean = itemList.get(0);*/
            IlsCellDto ilsCell = new IlsCellDto();
            ilsCell.setPartwoid(Long.parseLong((String) jsonObject.get("wipEntityId")));
            ilsCell.setLocked(0);
            ilsCell.setAreano(10);
            List<IlsCellDto> ilsCellDtos = ilsCellDao.queryCell(ilsCell);
            //判断是否存在盘
            if (EmptyUtils.isEmpty(ilsCellDtos)) {
                return Result.error(CodeMsg.builder().code(ErrorCode.IS_NULL.getCode()).msg(ErrorCode.IS_NULL.getMsg()).build());
            }

            //拼接出库任务信息
            IlsCellDto ilsCellDto = ilsCellDtos.get(0);
            TaskmesDto dto = TaskmesDto.builder()
                    .areano(10)
                    .action(220)
                    .cellidsrc(ilsCellDto.getId().toString())
                    .taskid((String) jsonObject.get("taskId"))
                    .status(10)
                    .build();
            //查询出库任务,判断是否重复任务
            List<TaskmesDto> taskmesDtos =  taskmesDao.queryTaskmes(dto);
            if (!EmptyUtils.isEmpty(taskmesDtos)) {
                return Result.error(new CodeMsg(200, ErrorCode.TASK_BUSY.getMsg()));
            }
            //更新任务表
            taskmesDao.updateTaskmes(dto);
            //List<TaskStatusDto> taskStatusDtos = wsmTaskService.queryTaskStatus(taskId);

            wmsInvOutDao.insertWmsInvOut(wmsInvOutDto);
        } catch (Exception e) {
            log.error(e.getMessage());
            return Result.error(new CodeMsg(200, e.getMessage()));
        }
        return Result.success("");
    }

    private boolean validateTaskId(JSONObject jsonpObject) {
        String taskId = (String) jsonpObject.get("taskId");
        List<TaskStatusDto> taskStatusDtos = wmsTaskService.queryTaskStatus(taskId);
        return !EmptyUtils.isEmpty(taskStatusDtos);
    }

    private boolean validateFull(JSONObject jsonObject) {
        if (
                !(jsonObject.containsKey("taskId") &&
                        jsonObject.containsKey("taskSource") &&
                        jsonObject.containsKey("invOutType") &&
                        jsonObject.containsKey("wipEntityId") &&
                        jsonObject.containsKey("itemCode") &&
                        jsonObject.containsKey("quantity")
                )
        ) {
            return false;
        }
        WmsInvOutDto dto = jsonObject.toJavaObject(WmsInvOutDto.class);
        String taskId = dto.getTaskId();
        String taskSource = dto.getTaskSource();
        Integer invOutType = dto.getInvOutType();
        Integer wipEntityId = dto.getWipEntityId();
        String itemCode = dto.getItemCode();
        Integer quantity = dto.getQuantity();
	    return !EmptyUtils.isEmpty(taskId) &&
			    !EmptyUtils.isEmpty(taskSource) &&
			    !EmptyUtils.isEmpty(invOutType) &&
			    !EmptyUtils.isEmpty(wipEntityId) &&
			    !EmptyUtils.isEmpty(itemCode) &&
			    !EmptyUtils.isEmpty(quantity);
    }
}
