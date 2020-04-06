package com.jhzh.wms.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.result.CodeMsg;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.base.utils.EmptyUtils;
import com.jhzh.wms.dao.YxWmsCellDao;
import com.jhzh.wms.dto.YxWmsCellDto;
import com.jhzh.wms.service.TrayInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
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
          StringBuffer sb=new StringBuffer();
        try {
            List<YxWmsCellDto.TraylistBean> traylist = yxWmsCellDto.getTraylist();
            HashMap<Integer,String> map=new HashMap<>();
            for (YxWmsCellDto YxWmsCellDto : yxWmsCellDtos) {
                //將12條數據存入MAP中以tray爲準
                map.put(YxWmsCellDto.getLayer(), YxWmsCellDto.getTrayno());
                log.info("原始数据："+YxWmsCellDto.getLayer()+"层盘号 "+YxWmsCellDto.getTrayno());
            }


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
                    updateDto.setTrayno("000000");
                }
                if(trayno.indexOf("666")==0){
                    updateDto.setTrayid(Integer.parseInt(trayno));
                }
                if(map.containsKey(layer)&&!layer.equals(map.get(layer))){
                    sb.append(yxWmsCellDto.getRow()+"行"+yxWmsCellDto.getCol()+"列"+layer+"层更新盘号："+trayno+"\n");
                    log.info(yxWmsCellDto.getRow()+"行"+yxWmsCellDto.getCol()+"列"+layer+"层更新盘号："+trayno+"\n");
                }
                yxWmsCellDao.updateTrayInfo(updateDto);
            }
        }catch (Exception e){
            log.error(e.getMessage());
            return Result.error(new CodeMsg(200,e.getMessage()));
        }

        return Result.success(sb);
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

    @Override
    public Result<?> queryTaryByRowCol(Map<String,Object>map) {
        List<YxWmsCellDto>dtos=yxWmsCellDao.queryTaryByRowCol(map);
        return Result.success(dtos);
    }

    @Override
    public Result<?> queryByTrayno(JSONObject jsonObject) {
        String trayno = (String) jsonObject.get("trayno");
        List<YxWmsCellDto>dtos=yxWmsCellDao.queryByTrayno(trayno);
        return Result.success(dtos);
    }

    @Override
    public Result<?> updateData(JSONObject jsonObject) {
        YxWmsCellDto updateDto=new YxWmsCellDto();
        updateDto.setRow((Integer) jsonObject.get("row"));
        updateDto.setCol((Integer) jsonObject.get("col"));
        updateDto.setLayer((Integer) jsonObject.get("layer"));
        updateDto.setTrayid((Integer) jsonObject.get("trayid"));
        updateDto.setTrayno((String) jsonObject.get("trayno"));
        String trayno = (String) jsonObject.get("trayno");
        if(trayno.equals("0")){
            updateDto.setTrayid(0);
            updateDto.setTrayno("000000");
        }
        if(trayno.indexOf("666")==0){
            updateDto.setTrayid(Integer.parseInt(trayno));
        }
        if(EmptyUtils.isEmpty(trayno)){
            updateDto.setTrayid(0);
            updateDto.setTrayno("000000");
        }
        return Result.success(yxWmsCellDao.updateTrayInfo(updateDto));
    }

    @Override
    public Result<?> delByRowAndCol(Map<String,Object> map) {

         return Result.success(yxWmsCellDao.delByRowAndCol(map));
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
