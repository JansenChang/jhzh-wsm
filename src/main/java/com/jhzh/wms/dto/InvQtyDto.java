package com.jhzh.wms.dto;

import lombok.Data;

import java.util.Date;

@Data
public class InvQtyDto {
    private String organizationId;//库存组织 Id"
    private String organizationCode;//库存组织代码
    private String areaCode;//库区编码
    private String shelfCode;//货位编号
    private String stockCode;//托盘编号
    private String itemCode;//物资编码
    private String itemDesc;//物资描述
    private String wipEntityId;//工单 ID
    private String batchNo;//批次号
    private Date expertDate;//过期日期
    private String quantity;//数量
    private String memoInfo1;
    private String memoInfo2;
    private String memoInfo3;
    private String memoInfo4;
    private String memoInfo5;
}
