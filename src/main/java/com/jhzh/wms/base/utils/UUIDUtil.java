package com.jhzh.wms.base.utils;

import java.util.UUID;

public class UUIDUtil {

   private static UUIDUtil uuidUtil;

   public static UUIDUtil getInstance() {

        if (uuidUtil == null) {
            synchronized (UUIDUtil.class) {
                if (uuidUtil == null) {
                    uuidUtil = new UUIDUtil();
                }
            }
        }
        return uuidUtil;
    }

    public String getUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }

}
