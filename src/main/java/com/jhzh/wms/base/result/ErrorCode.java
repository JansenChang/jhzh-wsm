package com.jhzh.wms.base.result;

public enum ErrorCode {
    NULL_OBJ(1001,"数据不完整,如必填字段未填"),
    IDALREADY_EXIST(1002,"任务ID已存在"),
    NVALIDI_LIB_CODE(1003,"无效立体库提升机入口位编码"),
    NVALID_ITEM_CODE(1004,"无效物料编号"),
    EXIST_ITEM(1005,"批次号存在于其它托盘,当 isMultiPalForLot!=1 时检查"),
    REPEAT_ITEM_CODE(1006,"托盘号重复 "),
    MACHIN_NOT_WORK(2001,"当前堆垛机不可用"),
    NOT_HAVE_LOCATION(2002,"没有储存位"),
    TASK_BUSY(2003,"同类型任务忙,稍后重试."),
    IS_NULL(2004,"库中查无对应物料"),
    IS_NULL_BOM(2004,"查询不到BOM信息"),
    LONGCAGE_DISABLED(2005,"当前长吊笼不可用。"),
    EXIST_1L_TASK(2006,"当前一楼存在任务")
    ;

    private Integer code;
    private String  msg;

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

     ErrorCode(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
