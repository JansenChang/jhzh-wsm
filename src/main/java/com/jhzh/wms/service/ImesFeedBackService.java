package com.jhzh.wms.service;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.dto.IlsCellDto;
import com.jhzh.wms.dto.ItemInfoDto;
import com.jhzh.wms.dto.TaskmesDto;
import com.jhzh.wms.dto.WmsInvInDto;

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

    Map<String, String> wmsInvOutResultError(JSONObject jsonObject);
}
