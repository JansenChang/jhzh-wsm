package com.jhzh.wsm;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(scanBasePackages = {"com.jhzh.wsm"})
@MapperScan("com.jhzh.wsm.dao")
//@ComponentScan(basePackages = {"com.jhzh.wsm.dao","com.jhzh.wsm.http"})
public class SpringbootApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringbootApplication.class, args);
    }
}
