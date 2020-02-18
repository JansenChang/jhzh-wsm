package com.jhzh.wsm.service;

import com.jhzh.wsm.dto.YxWmsCellDto;
import com.jhzh.wsm.utils.result.Result;

import java.util.List;

public interface TrayInfoService {


    List<YxWmsCellDto> queryTrayInfo(YxWmsCellDto yxWmsCellDto);

    Result<?> updateTrayInfo(YxWmsCellDto yxWmsCellDto, List<YxWmsCellDto> yxWmsCellDtos);

    void selectAllTray();

}
