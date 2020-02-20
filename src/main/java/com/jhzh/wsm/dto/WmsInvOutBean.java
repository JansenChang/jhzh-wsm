package com.jhzh.wsm.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class WmsInvOutBean {

    private String id;
    private Integer unt;
    private Integer app;
    private Integer deptid;
    /**
     * invOutType : 1
     * itemCode : WWWWWWWWW
     * quantity : 0
     * taskId : 66be7722ab734bb090e03bfb24a4a3d9
     * taskSource : 103-C
     * wipEntityId : 12209310
     */

    private String taskId;
    private String taskSource;
    private Integer invOutType;
    private String itemCode;
    private Integer quantity;
    private Integer wipEntityId;
    private String memoInfo1;
    private String memoInfo2;
    private String memoInfo3;
    private String memoInfo4;
    private String memoInfo5;
}
