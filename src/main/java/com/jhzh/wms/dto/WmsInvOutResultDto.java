package com.jhzh.wms.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class WmsInvOutResultDto {


    /**
     * taskId : 任务 ID 号
     * taskSource : 任务来源标识
     * invOutType : 出库类型
     * locator : 立体库出口位编码
     * shelfCode : 多层载具载具号
     * wipEntityId : 工单 ID 号
     * stockNo : 托盘编号
     * itemCode : 物料编码
     * lotCode : 物料批次号
     * quantity : 数量
     * statusCode : 任务状态
     * statusInfor : 任务状态描述
     * memoInfo1 : 备注说明信息 1
     * memoInfo2 : 备注说明信息 2
     * memoInfo3 : 备注说明信息 3
     * memoInfo4 : 备注说明信息 4
     * memoInfo5 : 备注说明信息 5
     */

    private String taskId;
    private String taskSource;
    private String invOutType;
    private Integer locator;
    private String shelfCode;
    private Integer wipEntityId;
    private String stockNo;
    private String itemCode;
    private String lotCode;
    private Integer quantity;
    private String statusCode;
    private String statusInfor;
    private String memoInfo1;
    private String memoInfo2;
    private String memoInfo3;
    private String memoInfo4;
    private String memoInfo5;
}

