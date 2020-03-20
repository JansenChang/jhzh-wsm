package com.jhzh.wms.service;

import com.jhzh.wms.dto.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface ImesFeedBackService {

    Map<String, String> wmsInvInResult(List<WmsInvInDto> wmsInvInDtoList);

    Map<String, String> wmsInvOutResult(List<TaskmesDto> taskmesList);

    String QueryWoPlanInfo(Map<String, Object> map);

    List<List<IlsCellDto>> QueryItemBomInfo(String ItemCode);

    ItemInfoDto queryItemInfo(HashMap<String, Object> map);

    void QueryCompletedTask();
}
