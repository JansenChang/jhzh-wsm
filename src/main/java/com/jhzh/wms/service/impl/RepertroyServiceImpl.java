package com.jhzh.wms.service.impl;

import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.dao.IlsCellDao;
import com.jhzh.wms.dto.IlsCellDto;
import com.jhzh.wms.service.RepertroyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RepertroyServiceImpl implements RepertroyService {
    @Autowired
    private IlsCellDao IlscellDao;

    @Override
    public Result<?> queryDynamicRepertroy() {
        List<IlsCellDto> ilsCellDtoList= IlscellDao.queryDynamicRepertroy();
        return Result.success(ilsCellDtoList);
    }
}
