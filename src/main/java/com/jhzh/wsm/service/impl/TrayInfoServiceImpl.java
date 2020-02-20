package com.jhzh.wsm.service.impl;

import com.jhzh.wsm.dao.YxWmsCellDao;
import com.jhzh.wsm.dto.YxWmsCellDto;
import com.jhzh.wsm.service.TrayInfoService;
import com.jhzh.wsm.utils.result.CodeMsg;
import com.jhzh.wsm.utils.result.Result;
import lombok.extern.log4j.Log4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
@Log4j
@Service
public class TrayInfoServiceImpl implements TrayInfoService {
    @Autowired
    private YxWmsCellDao yxWmsCellDao;

    @Override
    public List<YxWmsCellDto> queryTrayInfo(YxWmsCellDto yxWmsCellDto) {
        List<YxWmsCellDto> list=yxWmsCellDao.queryTrayInfo(yxWmsCellDto);
        return list;
    }

    @Override
    public Result<?> updateTrayInfo(YxWmsCellDto yxWmsCellDto, List<YxWmsCellDto> yxWmsCellDtos) {
        try {
             List<YxWmsCellDto.TraylistBean> traylist = yxWmsCellDto.getTraylist();
           /* HashMap<Integer,Integer> map=new HashMap<>();
            for (YxWmsCellDto YxWmsCellDto : yxWmsCellDtos) {
                //將12條數據存入MAP中以trayid爲準
                map.put(YxWmsCellDto.getLayer(), yxWmsCellDto.getTrayid());
            }*/
            YxWmsCellDto updateDto=new YxWmsCellDto();
            for (YxWmsCellDto.TraylistBean traylistBean : traylist) {
                //修改數據
                Integer layer = traylistBean.getLayer();
                Integer trayid = traylistBean.getTrayid();
                String trayno = traylistBean.getTrayno();
                updateDto.setRow(yxWmsCellDto.getRow());
                updateDto.setCol(yxWmsCellDto.getCol());
                updateDto.setLayer(layer);
                updateDto.setTrayid(trayid);
                updateDto.setTrayno(trayno);
                if(trayno.equals("0")){
                    updateDto.setTrayid(0);
                    updateDto.setTrayno(".");
                }
                yxWmsCellDao.updateTrayInfo(updateDto);
            }
        }catch (Exception e){
            return Result.error(new CodeMsg(200,e.getMessage()));
        }

        return Result.success(yxWmsCellDto);
    }


    @Override
    public void selectAllTray() {
        List<YxWmsCellDto> yxWmsCellDtos = yxWmsCellDao.selectAllTray();
        YxWmsCellDto dto=new YxWmsCellDto();

        for (YxWmsCellDto yxWmsCellDto : yxWmsCellDtos) {
            dto=yxWmsCellDto;
            String trayno = dto.getTrayno();
            String str=String.format("P"+"%05d",Integer.parseInt(trayno));
            dto.setTrayno(str);
            yxWmsCellDao.update(dto);
        }
    }

   /*

    public static void main(String[] args) {
        Integer i=1;
        Integer s=21;
        String str=String.format("%05d",i);
         String str1=String.format("%05d",s);
        System.out.println();
    }*/
}
