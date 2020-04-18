package com.jhzh.wms.dto;


import lombok.Data;

import java.util.List;

@Data
public class FlowRecordDto {
	private String taskid;
	private String partdate;
	private List<WmsInvInDto> wmsInvInDtos;
}
