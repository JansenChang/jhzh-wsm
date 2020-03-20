package com.jhzh.wms.service;

import com.jhzh.wms.dto.YxWmsCellDto;
import com.jhzh.wms.base.result.Result;

import java.util.List;

public interface TrayInfoService {


    List<YxWmsCellDto> queryTrayInfo(YxWmsCellDto yxWmsCellDto);

    Result<?> updateTrayInfo(YxWmsCellDto yxWmsCellDto, List<YxWmsCellDto> yxWmsCellDtos);

    void selectAllTray();

}
