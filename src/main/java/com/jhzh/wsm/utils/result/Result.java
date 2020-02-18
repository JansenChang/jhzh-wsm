package com.jhzh.wsm.utils.result;

public class Result<T> {
    private int errorCode;
    private String errorMsg;
    private T resultData;

    public static <T> Result<T> success(T resultData){
        return new Result<T>(resultData);
    }

    public static <T> Result<T> error(CodeMsg codeMsg){
        return new  Result<T>(codeMsg);
    }

    private Result(T resultData) {
        this.errorCode = 0;
        this.errorMsg = "ok";
        this.resultData = resultData;
    }

    private Result(CodeMsg codeMsg) {
        if(codeMsg == null) {
            return;
        }
        this.errorCode = codeMsg.getCode();
        this.errorMsg = codeMsg.getMsg();
    }

    public int getErrorCode() {
        return errorCode;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public T getResultData() {
        return resultData;
    }
}
