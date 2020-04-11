package com.jhzh.wms.service;

import com.jhzh.wms.dto.PickRackDto;

import java.util.List;

public interface PickRackService {


    List<PickRackDto> getPickRack();

    int updLayer(Integer[] integers4, String uuid, int layer);
}
