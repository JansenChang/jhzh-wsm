package com.jhzh.wms.service.impl;

import com.jhzh.wms.dao.IlsPickRackDao;
import com.jhzh.wms.dto.PickRackDto;
import com.jhzh.wms.service.PickRackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PickRackServiceImpl implements PickRackService {


    @Autowired
    private IlsPickRackDao ilsPickRackDao;

    @Override
    public List<PickRackDto> getPickRack() {
        return ilsPickRackDao.pickRackList();
    }

    @Override
    public int updLayer(Integer[] integers, String uuid, int layer) {
        boolean flag=false;
        for (int i = 0; i < integers.length; i++) {
            if(integers[i]!=0){
                flag=true;
            }
        }
        if(integers.length==10&&flag){
            PickRackDto pickRackDto = PickRackDto.builder()
                    .taskid(uuid)
                    .layer(layer)
                    .col1(integers[0])
                    .col2(integers[1])
                    .col3(integers[2])
                    .col4(integers[3])
                    .col5(integers[4])
                    .col6(integers[5])
                    .col7(integers[6])
                    .col8(integers[7])
                    .col9(integers[8])
                    .status(1)
                    .build();
            ilsPickRackDao.updLayer(pickRackDto);
        }
        return 0;
    }
}
