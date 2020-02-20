package com.jhzh.wsm;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication(scanBasePackages = {"com.jhzh.wsm"})
@MapperScan("com.jhzh.wsm.dao")
//@ComponentScan(basePackages = {"com.jhzh.wsm.dao","com.jhzh.wsm.http"})
public class WmsApplication /*extends SpringBootServletInitializer*/ {
    public static void main(String[] args) {
        SpringApplication.run(WmsApplication.class, args);

    }
   /* @Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		 return builder.sources(WmsApplication.class);
	}*/
}
