package com.jhzh.wsm.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Data
public class YxWmsCellDto {


    /**
     * row : 行
     * col : 列
     * traylist : [{"layer":1,"trayid":1},{"layer":1,"trayid":1}]
     */

    private Integer row;
    private Integer col;
    private Integer layer;
    private Integer trayid;
    private String  trayno;
    private List<TraylistBean> traylist;


    @Data
    public static class TraylistBean {
        /**
         * layer : 1
         * trayid : 1
         */

        private Integer layer;
        private Integer trayid;
        private String trayno;

        public TraylistBean() {
           super();
        }
        public TraylistBean(Integer layer, Integer trayid, String trayno) {
            this.layer = layer;
            this.trayid = trayid;
            this.trayno = trayno;
        }
    }
}
