package com.jhzh.wms.service.impl;

import com.jhzh.wms.base.result.CodeMsg;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.dao.IlsCellDao;
import com.jhzh.wms.dao.TaskmesDao;
import com.jhzh.wms.dto.CabinetDto;
import com.jhzh.wms.dto.IlsCellDto;
import com.jhzh.wms.dto.TaskmesDto;
import com.jhzh.wms.service.PickRackService;
import com.jhzh.wms.service.RepertroyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RepertroyServiceImpl implements RepertroyService {
    @Autowired
    private IlsCellDao IlscellDao;
    @Autowired
    private TaskmesDao taskmesDao;
    @Resource
    private PickRackService pickRackService;


    @Override
    public Result<?> queryDynamicRepertroy() {
        Map<String,Object>resultMap=new HashMap<>();
        Map<String,Object>map=new HashMap<>();
        map.put("areano",10);
        resultMap.put("var10",IlscellDao.queryDynamicRepertroy(map));
        map.put("areano",15);
        resultMap.put("var15",IlscellDao.queryDynamicRepertroy(map));
        map.put("areano","");
        map.put("row",16);
        resultMap.put("var16",IlscellDao.queryDynamicRepertroy(map));
        map.put("row",17);
        resultMap.put("var17",IlscellDao.queryDynamicRepertroy(map));
        map.put("row",18);
        resultMap.put("var18",IlscellDao.queryDynamicRepertroy(map));
        map.put("row",19);
        resultMap.put("var19",IlscellDao.queryDynamicRepertroy(map));
        map.put("row",26);
        resultMap.put("var26",IlscellDao.queryDynamicRepertroy(map));
        map.put("row",25);
        resultMap.put("var25",IlscellDao.queryDynamicRepertroy(map));
        return Result.success(resultMap);
    }

    @Override
    public Result<?> queryDynamicRepertroyById(Map<String, Object> map) {
        List<Map> ilsCellDtoList= IlscellDao.queryDynamicRepertroyById(map);
        return Result.success(ilsCellDtoList);
    }

    @Override
    public Result<?> dynamicRepertroyFirstlayer() {
        List<String> firstLayer= IlscellDao.dynamicRepertroyFirstlayer();
        return Result.success(firstLayer);
    }

    @Override
    public Result<?> updateRepertroy(Map<String, Object> map) {
        try {
            IlsCellDto ilsCellDto = IlsCellDto.builder()
                    .id(Long.parseLong((String) map.get("id")))
                    .trayid(Long.parseLong((String) map.get("trayno")))
                    .trayno((String) map.get("trayno"))
                    .partnum(Integer.parseInt((String) map.get("partnum")))
                    .partwoid(Long.parseLong((String) map.get("partwoid")))
                    .build();
            IlscellDao.updateCellByCellId(ilsCellDto);
        }catch (Exception e){
          return Result.error(CodeMsg.builder().code(400).msg(e.getMessage()).build());
        }
        /*IlscellDao.updateCellByCellId(IlsCellDto.builder()
                        .id(Long.parseLong("160101"))
                        .partid(Long.parseLong(item.getItemCode()))//物料号
                        .partdesc(item.getItemDesc())
                        .partwoid(Long.parseLong(String.valueOf(item.getWipEntityId())))//工单号
                        //.cmdstatus(10)
                        .partnum(0)
                        .locked(0)
                        //TODO 批号
                        .build());*/
        return Result.success("修改成功");
    }

    @Override
    public Result<?> getCabinetData() {
        List<CabinetDto> list=IlscellDao.getCabinetData();
        return Result.success(list);
    }

    @Override
    public Result<?> getCageData() {
        HashMap<String,Object>resultMap=new HashMap<>();
        List<TaskmesDto> cageData = taskmesDao.getCageData();
        TaskmesDto taskmesDto1 = cageData.get(0);
        TaskmesDto taskmesDto2 = cageData.get(1);
        String shortCageStr = taskmesDto1.getCellstrdst();
        String longCageStr = taskmesDto2.getCellstrdst();
        List<Map> shortCageMaps = IlscellDao.queryInvIn(shortCageStr);
        List<Map> longCageMaps =IlscellDao.queryInvIn(longCageStr);
        resultMap.put("longCage",shortCageMaps);
        resultMap.put("shortCage",longCageMaps);
        return Result.success(resultMap);
    }

    @Override
    public Result<?> getChoose() {
        List<TaskmesDto> getChoose = taskmesDao.queryChoose();
        return Result.success(getChoose);
    }
}
