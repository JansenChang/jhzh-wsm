package com.jhzh.wms.controller;

import com.jhzh.wms.base.export.ExportUtil;
import com.jhzh.wms.base.export.config.ExportConfig;
import com.jhzh.wms.dao.PutInStorageDao;
import lombok.Cleanup;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("wms")

public class ExportController {
    @Autowired
    private ExportConfig exportConfig;

    @Autowired
    private PutInStorageDao putInStorageDao;

    @GetMapping(value = "test")
    @ResponseBody
    public void test ()throws Exception{
        @Cleanup
        OutputStream outputStream=null;
        System.out.println(exportConfig);
        List<Map<String, Object>> listMap = putInStorageDao.queryWmsInvInFlow(new HashMap());
        Map<String,String> map =new HashMap<>();
        HSSFWorkbook hssfWorkbook = ExportUtil.exportExcel(listMap,exportConfig.getWmsInvInFlow());
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletResponse response = requestAttributes.getResponse();
        response.setContentType("application/xls;charset=UTF-8");
		response.setHeader("Content-Disposition", "attachment;filename="+"xx.xls");
        outputStream= response.getOutputStream();
        hssfWorkbook.write(outputStream);
    }
}
