package com.jhzh.wms.controller;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.export.ExportUtil;
import com.jhzh.wms.dao.PutInStorageDao;
import com.jhzh.wms.dao.WmsInvOutDao;
import lombok.Cleanup;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("wms")

public class ExportController {
    @Autowired
    private PutInStorageDao putInStorageDao;
    @Autowired
    private WmsInvOutDao wmsInvOutDao;

    @PostMapping(value = "invInExort")
    @ResponseBody
    public void invInExort (@RequestBody JSONObject jsonObject)throws Exception{
        @Cleanup
        OutputStream outputStream=null;
        LinkedHashMap<String,String> titleMap=new LinkedHashMap<>();
        titleMap.put("taskid","任务号");
        titleMap.put("tasksource","任务来源标识");
        titleMap.put("locator","入口位编码");
        titleMap.put("shelfcode","多层载具载具号");
        titleMap.put("shelflay","层次号");
        titleMap.put("wipentityid","工单号");
        titleMap.put("stockno","托盘编号");
        titleMap.put("lotcode","物料批次号");
        titleMap.put("quantity","数量");
        titleMap.put("itemcode","物料号");
        titleMap.put("ismultipalforlot","允许分拆批次号");
        titleMap.put("partdate","存入日期");
        titleMap.put("status","状态");
        Map queryMap=jsonObject;
        List<Map<String, Object>> listMap = putInStorageDao.queryWmsInvInFlow(queryMap);
        HSSFWorkbook hssfWorkbook = ExportUtil.exportExcel(listMap,titleMap);
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletResponse response = requestAttributes.getResponse();
        response.setContentType("application/xls;charset=UTF-8");
		response.setHeader("Content-Disposition", "attachment;filename="+ jsonObject.get("filename")+".xls");
        outputStream= response.getOutputStream();
        hssfWorkbook.write(outputStream);
    }


    @PostMapping(value = "invOutExort")
    @ResponseBody
    public void invOutExort (@RequestBody JSONObject jsonObject)throws Exception{
        @Cleanup
        OutputStream outputStream=null;
        LinkedHashMap<String,String> titleMap=new LinkedHashMap<>();
        titleMap.put("taskid","任务号");
        titleMap.put("tasksource","任务来源标识");
        titleMap.put("locator","入口位编码");
        titleMap.put("shelfcode","多层载具载具号");
        titleMap.put("shelflay","层次号");
        titleMap.put("wipentityid","工单号");
        titleMap.put("stockno","托盘编号");
        titleMap.put("lotcode","物料批次号");
        titleMap.put("quantity","数量");
        titleMap.put("itemcode","物料号");
        titleMap.put("ismultipalforlot","允许分拆批次号");
        titleMap.put("partdate","存入日期");
        titleMap.put("status","状态");
        Map queryMap=jsonObject;
        List<Map<String, Object>> maps =wmsInvOutDao.queryWmsInvOutFlow(queryMap);
        HSSFWorkbook hssfWorkbook = ExportUtil.exportExcel(maps,titleMap);
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletResponse response = requestAttributes.getResponse();
        response.setContentType("application/xls;charset=UTF-8");
		response.setHeader("Content-Disposition", "attachment;filename="+ jsonObject.get("filename")+".xls");
        outputStream= response.getOutputStream();
        hssfWorkbook.write(outputStream);
    }



}
