package com.jhzh.wms.dto;

import lombok.Data;

import java.util.List;

@Data
public class CabinetDto {
	private String rowcol;
	private List<IlsCellDto> ilsCellDtos;
}
