package com.jhzh.wsm.utils.uuid;

import java.util.UUID;

public class UUIDUtil {

    public static String generateUUID() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

}
