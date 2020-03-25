package com.jhzh.wms.base.export.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Data
@Component
// 指定配置文件
@PropertySource(value = {"classpath:/export/export.properties"}, encoding = "utf-8")
@ConfigurationProperties(prefix = "export")
public class ExportConfig {
    public HashMap<String, String> wmsInvInFlow = new HashMap();
}
