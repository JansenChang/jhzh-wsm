package com.jhzh.wms.service;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.dto.YxWmsCellDto;

import java.util.List;
import java.util.Map;

public interface TrayInfoService {


    List<YxWmsCellDto> queryTrayInfo(YxWmsCellDto yxWmsCellDto);

    Result<?> updateTrayInfo(YxWmsCellDto yxWmsCellDto, List<YxWmsCellDto> yxWmsCellDtos);

    void selectAllTray();

    Result<?> queryTaryByRowCol(Map<String,Object> map);

    Result<?> queryByTrayno(JSONObject jsonObject);

    Result<?> updateData(JSONObject jsonObject);

    Result<?> delByRowAndCol(Map<String,Object> map);
}
