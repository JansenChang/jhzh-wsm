package com.jhzh.wms.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.result.CodeMsg;
import com.jhzh.wms.base.result.ErrorCode;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.base.utils.EmptyUtils;
import com.jhzh.wms.dao.InvQtyDao;
import com.jhzh.wms.service.InvQtyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class InvQtyServiceImpl implements InvQtyService {

    @Autowired
    private InvQtyDao invQtyDao;

    @Override
    public Result<?> queryInvQty(JSONObject jsonObject) {
        try {
            Map<String, Object> hashMap=jsonObject;

            //TODO 校验行数，行限制数量
            boolean massValue = validateFull(jsonObject);
            if (!massValue) {
                return Result.error(CodeMsg.builder().code(ErrorCode.NULL_OBJ.getCode()).msg(ErrorCode.NULL_OBJ.getMsg()).build());
            }

            Integer lineNumber = (Integer) hashMap.get("lineNumber");
            Integer lineTotal = (Integer) hashMap.get("lineTotal");
            //小板转数字
            if (((String) hashMap.get("itemCode")).contains("-")) {
                hashMap.put("itemCode", ((String) hashMap.get("itemCode")).replace("-", ""));
            }
            //传入1仅可出
            if (hashMap.containsKey("itemUseStatus")&&"1".equals(hashMap.get("itemUseStatus"))) {

            }
            //itemCode待处理
            List<Map<String, Object>> list = invQtyDao.queryInvQty(hashMap);
            List<Map<String, Object>> maps = new ArrayList<>();
            if (!EmptyUtils.isEmpty(list) && lineTotal <= list.size() && lineNumber < list.size() && lineTotal >= lineNumber) {
                list = list.subList(lineNumber, lineNumber + lineTotal);
            }
            for (Map<String, Object> objectMap : list) {
                StringBuffer itemCode = new StringBuffer(objectMap.get("itemCode").toString());
                if (itemCode.length() > 9) {
                    itemCode.insert(9, "-");
                }
                objectMap.put("itemCode", itemCode);
                maps.add(objectMap);
            }

            if(!EmptyUtils.isEmpty(maps)){
                return Result.success(JSONObject.toJSON(maps));
            }
        }catch (Exception e){
            return Result.error(new CodeMsg(200,e.getMessage()));
        }
        return  Result.success("");
    }
    private boolean validateFull(JSONObject jsonObject) {
       /* String organizationID = (String) jsonObject.get("organizationId");
        String itemUseStatus = (String) jsonObject.get("itemUseStatus");
        Integer lineNumber = (Integer) jsonObject.get("lineNumber");
        Integer lineTotal  = (Integer) jsonObject.get("lineTotal");
        if ((EmptyUtils.isEmpty(organizationID) ||
                EmptyUtils.isEmpty(itemUseStatus) ||
                EmptyUtils.isEmpty(lineNumber) ||
                EmptyUtils.isEmpty(lineTotal)
        )) {
            return false;
        }*/
        return true;
    }


}
