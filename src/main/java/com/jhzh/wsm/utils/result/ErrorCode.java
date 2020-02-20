package com.jhzh.wsm.utils.result;

public enum ErrorCode {
    NULL_OBJ(1001,"数据不完整,如必填字段未填"),
    IDALREADY_EXIST(1002,"任务已存在"),
    NVALIDI_LIB_CODE(1003,"无效立体库提升机入口位编码"),
    NVALID_ITEM_CODE(1004,"无效物料编号"),
    EXIST_ITEM(1005,"批次号存在于其它托盘,当 isMultiPalForLot!=1 时检查"),
    REPEAT_ITEM_CODE(1006,"托盘号重复 "),
    MACHIN_NOT_WORK(2001,"当前堆垛机不可用"),
    NOT_HAVE_LOCATION(2002,"没有储存位");

    private Integer code;
    private String  msg;

    ErrorCode(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
