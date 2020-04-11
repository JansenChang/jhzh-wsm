package com.jhzh.wms.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PickRackDto {
    private String taskid;
    private Integer layer;
    private Integer col1;
    private Integer col2;
    private Integer col3;
    private Integer col4;
    private Integer col5;
    private Integer col6;
    private Integer col7;
    private Integer col8;
    private Integer col9;
    private Integer wipentityid;
    private Integer status;
    private Integer sort;
}
