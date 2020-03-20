package com.jhzh.wms.dto;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class WmsInvInResultDto {

    private String  taskId;
    private String  taskSource;
    private Integer locator;
    private String  shelfCode;
    private String  statusCode;
    private String  statusInfor;
    private String memoInfo1;//备用字段
    private String memoInfo2;//备用字段
    private String memoInfo3;//备用字段
    private String memoInfo4;//备用字段
    private String memoInfo5;//备用字段
    private List<Map<String,Object>> itemList;
}
