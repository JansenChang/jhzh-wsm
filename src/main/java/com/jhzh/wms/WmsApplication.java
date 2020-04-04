package com.jhzh.wms;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@MapperScan("com.jhzh.wms.dao")
@SpringBootApplication(scanBasePackages = {"com.jhzh.wms"})
public class WmsApplication /*extends SpringBootServletInitializer */{


    public static void main(String[] args) {
        SpringApplication.run(WmsApplication.class, args);

    }

   /* @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(WmsApplication.class);
    }*/
}
