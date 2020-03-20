package com.jhzh.wms.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Data
public class WoPlanInfoDto {

    /**
     * organizationId : 142
     * organizationCode : 103
     * deptCode : LMT
     * itemList : [{"wipEntityId":9764805,"wipEntityName":"111-100584636-1-04-000","sortId":null,"wipQty":40,"wipQtyPcs":800,"itemCode":"101000001","itemDesc":"Inplan测试档案号","planDate":null,"memoInfo1":null,"memoInfo2":null,"memoInfo3":null,"memoInfo4":null,"memoInfo5":null}]
     */
    private String  id;
    private Integer unt;
    private Integer app;
    private int organizationId;//库存组织 Id
    private String deptCode;//工序代码
    private int wipEntityId;  //工单ID
    private String wipEntityName;//工单号
    private String sortId;//工单优先级
    private int wipQty;//工单数量
    private int wipQtyPcs;//小板
    private String itemCode;//工单对应装配件物资编码
    private String itemDesc;//工单对应装配件物资描述
    private Date planDate;//工单计划开始时间"
    private Integer cellnum;//备盘数
    private String cellids;//料盘，最多36个
    private Integer status;//工单计划状态


    private List<ItemListBean> itemList;

    @NoArgsConstructor
    @Data
    public static class ItemListBean {
        /**
         * wipEntityId : 9764805
         * wipEntityName : 111-100584636-1-04-000
         * sortId : null
         * wipQty : 40
         * wipQtyPcs : 800
         * itemCode : 101000001
         * itemDesc : Inplan测试档案号
         * planDate : null
         * memoInfo1 : null
         * memoInfo2 : null
         * memoInfo3 : null
         * memoInfo4 : null
         * memoInfo5 : null
         */

        private int wipEntityId;  //工单ID
        private String wipEntityName;//工单号
        private String sortId;//工单优先级
        private int wipQty;//工单数量
        private int wipQtyPcs;//？
        private String itemCode;//工单对应装配件物资编码
        private String itemDesc;//工单对应装配件物资描述
        private Date planDate;//工单计划开始时间"
        private String memoInfo1;//备注说明信息
        private String memoInfo2;
        private String memoInfo3;
        private String memoInfo4;
        private String memoInfo5;
    }
}
