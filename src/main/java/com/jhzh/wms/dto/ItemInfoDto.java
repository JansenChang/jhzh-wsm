package com.jhzh.wms.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Data
public class ItemInfoDto {


    /**
     * itemType : FG
     * unitOfMeasure : PCS
     * lastUpdateDate : 2013-08-08 16:23:34
     * itemCode : 301103680
     * memoInfo3 : null
     * memoInfo2 : null
     * memoInfo1 : null
     * invCategory : 12-基板类.07-RF
     * itemDesc : ZC M 2 MS5969(BA1.BA2.BA3)-POFV
     * memoInfo5 : null
     * memoInfo4 : null
     * organizationId : 142
     * itemId : 418639
     * activeStatus : Y
     * organizationCode : 103
     * lifeDays : 365
     */
    private String  id;
    private Integer unt;
    private Integer app;
    private Integer organizationId;//库存组织 Id
    private String organizationCode;//库存组织代码
    private Integer itemId;//物资编码 Id
    private String itemCode;//物资编码
    private String itemDesc;//物资描述
    private String itemType;//用户物料类型
    private String invCategory;//库存类别
    private String unitOfMeasure;//库存主单位
    private Integer lifeDays;//存储天数
    private String activeStatus;//有效状态
    private Date lastUpdateDate;//最后更新日期
    private String memoInfo1;
    private String memoInfo2;
    private String memoInfo3;
    private String memoInfo4;
    private String memoInfo5;

}
