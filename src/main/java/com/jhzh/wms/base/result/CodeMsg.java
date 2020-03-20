package com.jhzh.wms.base.result;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CodeMsg {

    private int code;
    private String msg;

    public static CodeMsg SERVER_ERROR = new CodeMsg(500100, "服务端异常");

    public CodeMsg(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

}