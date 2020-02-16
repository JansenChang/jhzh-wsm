package com.jhzh.wsm.dao;

import com.jhzh.wsm.dto.User;
import com.jhzh.wsm.dto.YxLasPart;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface TestDao {
     List<Map<String,Object>> test();

     void insert(YxLasPart yxLasPart);

     List<YxLasPart> sel();

}
