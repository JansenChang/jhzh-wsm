package com.jhzh.wms.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Data
public class WmsInvInDto {


    /**
     * taskId : String 任务的唯一标识号,若重 复,WMS 视为无效
     * taskSource : String 任务来源标识 103-C
     * locator : Integer 立体库提升机入 口位编码
     * shelfCode : Integer 多层载具载具号 666709
     * itemList : [{"shelfLay":"1 Integer 多层载具层次号","wipEntityId":"-1 工单 ID 号 默認-1 Integer","stockNo":"666709 Integer托盘号 ","itemCode":"000000000 物料号  0000000空托盘","lotCode":"？？？？","quantity":"0 数量,正整数 "}]
     */

    private String  id;
    private Integer unt;
    private Integer app;
    private Integer deptid;

    private String  taskId;
    private String  taskSource;
    private Integer locator;
    private String  shelfCode;

    private Integer shelfLay;
    private Integer wipEntityId;
    private String stockNo;
    private String  itemCode;
    private Integer  lotCode;
    private Integer  quantity;
    private Integer isMultiPalForLot;
    private Integer status;
    private Date partdate;

    private String memoInfo1;//备用字段
    private String memoInfo2;//备用字段
    private String memoInfo3;//备用字段
    private String memoInfo4;//备用字段
    private String memoInfo5;//备用字段
    private List<ItemListBean> itemList;


    @NoArgsConstructor
    @Data
    public static class ItemListBean {
        /**
         * shelfLay : 1 Integer 多层载具层次号
         * wipEntityId : -1 工单 ID 号 默認-1 Integer
         * stockNo : 666709 Integer托盘号
         * itemCode : 000000000 物料号  0000000空托盘
         * lotCode : 批次号
         * quantity : 0 数量,正整数
         */

        private Integer shelfLay;
        private Integer wipEntityId;
        private String stockNo;
        private String itemCode;
        private Integer lotCode;
        private Integer quantity;
        private Integer isMultiPalForLot;
    }
}
