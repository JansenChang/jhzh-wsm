package com.jhzh.wsm.http;

import lombok.Data;

@Data
public class ResultMsg {
    private Integer ErrorCode;
    private String ErrorMsg;
    private String ResultData;

    public ResultMsg() {
        super();
    }

    public ResultMsg(Integer errorCode, String errorMsg, String resultData) {
        ErrorCode = errorCode;
        ErrorMsg = errorMsg;
        ResultData = resultData;
    }
}
