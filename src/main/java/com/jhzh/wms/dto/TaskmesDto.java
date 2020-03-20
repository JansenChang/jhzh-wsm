package com.jhzh.wms.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TaskmesDto {
    private Integer id;
    private Integer unt;
    private Integer app;
    private String name;
    private String taskid;
    private Integer areano;
    private Integer action;
    private Integer locator;
    private String cellstrsrc;
    private String cellstrdst;
    private String cellidsrc;
    private String celliddst;
    private Integer status;

    public TaskmesDto() {
    }

    public TaskmesDto(Integer id, Integer unt, Integer app, String name, String taskid, Integer areano, Integer action, Integer locator, String cellstrsrc, String cellstrdst, String cellidsrc, String celliddst, Integer status) {
        this.id = id;
        this.unt = unt;
        this.app = app;
        this.name = name;
        this.taskid = taskid;
        this.areano = areano;
        this.action = action;
        this.locator = locator;
        this.cellstrsrc = cellstrsrc;
        this.cellstrdst = cellstrdst;
        this.cellidsrc = cellidsrc;
        this.celliddst = celliddst;
        this.status = status;
    }
}
