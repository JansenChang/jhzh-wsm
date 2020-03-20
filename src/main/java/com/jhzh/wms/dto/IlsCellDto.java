package com.jhzh.wms.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class IlsCellDto {
    private Long id;
    private Long unt;
    private Long app;
    private Integer areano;
    private String name;
    private Integer row;
    private Integer col;
    private Integer layer;
    private Integer arg;
    private Integer argx;
    private Integer argy;
    private Integer argz;
    private Integer locked;
    private Integer lockedtype;
    private Long trayid;
    private String trayno;
    private Long partid;
    private String partdesc;
    private Integer partnum;
    private Integer partdate;
    private Long partwoid;
    private Long partlotid;
    private Integer partlotdiv;
    private String mestaskid;
    private Integer cmd;
    private Integer cmdstatus;


    public IlsCellDto() {
    }

    public IlsCellDto(Long id, Long unt, Long app, Integer areano, String name, Integer row, Integer col, Integer layer, Integer arg, Integer argx, Integer argy, Integer argz, Integer locked, Integer lockedtype, Long trayid, String trayno, Long partid, String partdesc, Integer partnum, Integer partdate, Long partwoid, Long partlotid, Integer partlotdiv, String mestaskid, Integer cmd, Integer cmdstatus) {
        this.id = id;
        this.unt = unt;
        this.app = app;
        this.areano = areano;
        this.name = name;
        this.row = row;
        this.col = col;
        this.layer = layer;
        this.arg = arg;
        this.argx = argx;
        this.argy = argy;
        this.argz = argz;
        this.locked = locked;
        this.lockedtype = lockedtype;
        this.trayid = trayid;
        this.trayno = trayno;
        this.partid = partid;
        this.partdesc = partdesc;
        this.partnum = partnum;
        this.partdate = partdate;
        this.partwoid = partwoid;
        this.partlotid = partlotid;
        this.partlotdiv = partlotdiv;
        this.mestaskid = mestaskid;
        this.cmd = cmd;
        this.cmdstatus = cmdstatus;
    }
}
