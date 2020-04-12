package com.jhzh.wms.base.export;

import com.alibaba.fastjson.JSON;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.HorizontalAlignment;

import java.util.*;

public class ExportUtil {


    public static HSSFWorkbook exportExcel(List<Map<String, Object>> data, Map<String, String> map) throws Exception {
        List<String> lists=new ArrayList();
        for(Map.Entry<String, String> entry : map.entrySet()){
            String key = entry.getKey();
            lists.add(key);
        }
        List<String> title = new ArrayList<>(map.values());
        List<Map<String, Object>> list=new ArrayList<>();
        for (Map<String, Object> datum : data) {
            Map<String,Object> m=new HashMap<>();
            for (String string : lists) {
                if(datum.containsKey(string)){
                    Object o = datum.get(string);
                    m.put(map.get(string),o);
                }
            }
            list.add(m);
        }
        Collections.reverse(title);
        return exportExcel(list,title);
    }
    public static HSSFWorkbook exportExcel(List<Map<String, Object>> data, List<String> title) throws Exception {

        // 从参数data中解析出打印的每列标题，放入title中
        for(Map.Entry<String, Object> entry : data.get(0).entrySet()) {
            title.add(entry.getKey());
        }
        // 新建一个Excel文件
        HSSFWorkbook wb = new HSSFWorkbook();
        // Excel中的sheet
        HSSFSheet sheet = wb.createSheet();
        // sheet中的行，0表示第一行
        HSSFRow row = sheet.createRow(0);
        // 设置标题居中
        HSSFCellStyle cellStyle = wb.createCellStyle();
        cellStyle.setAlignment(HorizontalAlignment.CENTER);
        // sheet中的单元格
        HSSFCell cell = null;

        // 给第一行赋值，值为我们从参数中解析出的标题，因此需要我们在传参的时候需要严格按照约定
        for(int i = 0; i < title.size(); i++) {
            cell = row.createCell(i);
            cell.setCellValue(title.get(i));
            cell.setCellStyle(cellStyle);
        }

       // 根据参数内容数量，创建表格行数
        for(int i = 0; i < data.size(); i++) {
            row = sheet.createRow(i + 1);

            Map<String, Object> values = data.get(i);

            // 将参数插入每一个单元格
            for(int k = 0; k < title.size(); k++) {
                Object value = values.get(title.get(k));
                if(null == value) {
                    value = "";
                }
                String val = JSON.toJSONString(value).replace("\"","");
                row.createCell(k).setCellValue(val);
            }
        }
        return wb;
    }



}
