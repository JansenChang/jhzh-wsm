package com.jhzh.wsm.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@Data
public class testdto {

    /**
     * organizationId : 库存组织 Id
     * itemCode : 物资编码
     * lastUpdateDateFrom : 最后更新日期从
     * lastUpdateDateTo : 最后更新日期至
     * lineNumber : 行数
     * lineTotal : 接口一次限制取的行数量
     */
    @NonNull
    private Integer organizationId;
    private Integer itemCode;
    private String lastUpdateDateFrom;
    private String lastUpdateDateTo;
    private Integer lineNumber;
    private Integer lineTotal;
}
