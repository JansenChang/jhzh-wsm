package com.jhzh.wms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class TestController {

    @GetMapping(value = "/")
    public String test1() {
        return "hello world";
    }


    @GetMapping(value = "/test")
    public Map<String, Object> test() {
        Map<String, Object> map = new HashMap<>();
        map.put("张三", 1);
        map.put("李四", 2);
        return map;
    }

}