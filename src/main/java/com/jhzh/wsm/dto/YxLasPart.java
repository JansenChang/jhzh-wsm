package com.jhzh.wsm.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

@Data
public class YxLasPart {

  private Long   id;
  private Long unt;
  private Long app;
  private Long dptid;
  private Long partid;
  private Long partcode;
  private Long atlast;
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  private Date atlastdate;
  private Long partdesc;
  private Long parttype;
  private Long partstore;
  private Long partunit;
  private Long partlifeday;
  private Long partactive;

}
