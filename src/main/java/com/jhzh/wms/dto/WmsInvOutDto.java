package com.jhzh.wms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class WmsInvOutDto {

    private Long id;
    private Integer unt;
    private Integer app;
    /**
     * invOutType : 1
     * itemCode : WWWWWWWWW
     * quantity : 0
     * taskId : 66be7722ab734bb090e03bfb24a4a3d9
     * taskSource : 103-C
     * wipEntityId : 12209310
     */

    private String taskId; //任务 ID 号
    private String taskSource;//任务来源标识
    private Integer invOutType;//出库类型
    private String itemCode;//物料编码
    private Integer quantity;//数量
    private Integer wipEntityId;//工单ID
    private Integer statuscode;//任务状态
    private String statusinfor;//任务描述
    private String memoInfo1;
    private String memoInfo2;
    private String memoInfo3;
    private String memoInfo4;
    private String memoInfo5;


}
