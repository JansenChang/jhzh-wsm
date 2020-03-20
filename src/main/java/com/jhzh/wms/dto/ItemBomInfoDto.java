package com.jhzh.wms.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class ItemBomInfoDto {


    /**
     * organizationId : 142
     * organizationCode : 103
     * itemCode : 101000005
     * itemDesc : DEMO14947
     * deptCode : null
     * itemList : [{"componentItemId":1222858,"componentItemCode":"101000005-101","componentItemDesc":"101000005-2/3","componentUnitQty":1,"memoInfo11":null,"memoInfo22":null,"memoInfo33":null,"memoInfo44":null,"memoInfo55":null}]
     */
    private String  id;
    private Integer unt;
    private Integer app;

    private Integer organizationId;//库存组织 ID
    private String organizationCode;//库存组织代码
    private String itemCode;//物资编码
    private String itemDesc;//物资描述
    private String deptCode;//工序代码

    private Integer componentItemId;//组件物资编码 ID
    private String componentItemCode;//组件物资编码
    private String componentItemDesc;//组件物资描述
    private Integer componentUnitQty;//单位用量
    private String memoInfo1;
    private String memoInfo2;
    private String memoInfo3;
    private String memoInfo4;
    private String memoInfo5;
    private List<ItemListBean> itemList;

    @NoArgsConstructor
    @Data
    public static class ItemListBean {
        /**
         * componentItemId : 1222858
         * componentItemCode : 101000005-101
         * componentItemDesc : 101000005-2/3
         * componentUnitQty : 1
         * memoInfo11 : null
         * memoInfo22 : null
         * memoInfo33 : null
         * memoInfo44 : null
         * memoInfo55 : null
         */

        private Integer componentItemId;//组件物资编码 ID
        private String componentItemCode;//组件物资编码
        private String componentItemDesc;//组件物资描述
        private Integer componentUnitQty;//单位用量
        private String memoInfo1;
        private String memoInfo2;
        private String memoInfo3;
        private String memoInfo4;
        private String memoInfo5;
    }
}
