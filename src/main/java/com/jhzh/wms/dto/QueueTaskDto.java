package com.jhzh.wms.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class QueueTaskDto {
	private String taskid;
	private String requestbody;
	private Date requertdate;
	private Integer status;
	private Integer queuetype;
}
