package com.jhzh.wms.base.http;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@Slf4j
public class HttpResult {

    // 响应码
    private Integer code;

    // 响应体
    private String body;


    public HttpResult() {
        super();
    }

    public HttpResult(Integer code, String body) {
        super();
        this.code = code;
        this.body = body;
    }


    @Component
    public static class HttpAPIService {

        @Autowired
        private CloseableHttpClient httpClient;

        @Autowired
        private RequestConfig config;


        /**
         * 不带参数的get请求，如果状态码为200，则返回body，如果不为200，则返回null
         * @param url
         * @return
         * @throws Exception
         */
        public String doGet(String url) throws Exception {
            // 声明 http get 请求
            HttpGet httpGet = new HttpGet(url);

            // 装载配置信息
            httpGet.setConfig(config);

            // 发起请求
            CloseableHttpResponse response = this.httpClient.execute(httpGet);

            // 判断状态码是否为200
            if (response.getStatusLine().getStatusCode() == 200) {
                // 返回响应体的内容
                return EntityUtils.toString(response.getEntity(), "UTF-8");
            }
            return null;
        }

        /**
         * 带参数的get请求，如果状态码为200，则返回body，如果不为200，则返回null
         *
         * @param url
         * @return
         * @throws Exception
         */
        public String doGet(String url, Map<String, Object> map) throws Exception {
            URIBuilder uriBuilder = new URIBuilder(url);

            if (map != null) {
                // 遍历map,拼接请求参数
                for (Map.Entry<String, Object> entry : map.entrySet()) {
                    uriBuilder.setParameter(entry.getKey(), entry.getValue().toString());
                }
            }

            // 调用不带参数的get请求
            return this.doGet(uriBuilder.build().toString());

        }

        /**
         * 带参数的post请求
         *
         * @param url
         * @param map
         * @return
         * @throws Exception
         */
        public HttpResult doPost(String url, Map<String, Object> map) throws Exception {
            // 声明httpPost请求
            HttpPost httpPost = new HttpPost(url);
            // 加入配置信息
            httpPost.setConfig(config);

            // 判断map是否为空，不为空则进行遍历，封装from表单对象
            if (map != null) {
                List<NameValuePair> list = new ArrayList<NameValuePair>();
                for (Map.Entry<String, Object> entry : map.entrySet()) {
                    list.add(new BasicNameValuePair(entry.getKey(), entry.getValue().toString()));
                }
                // 构造from表单对象
                UrlEncodedFormEntity urlEncodedFormEntity = new UrlEncodedFormEntity(list, "UTF-8");

                // 把表单放到post里
                httpPost.setEntity(urlEncodedFormEntity);
            }

            // 发起请求
            CloseableHttpResponse response = this.httpClient.execute(httpPost);
            return new HttpResult(response.getStatusLine().getStatusCode(), EntityUtils.toString(
                    response.getEntity(), "UTF-8"));
        }

        /**
         * 不带参数post请求
         *
         * @param url
         * @return
         * @throws Exception
         */
        public HttpResult doPost(String url) throws Exception {
            return this.doPost(url, null);
        }

        public HttpResult doPostJson(String url,String json) throws Exception{
            // 声明httpPost请求
            HttpPost httpPost = new HttpPost(url);
            // 加入配置信息
            httpPost.setConfig(config);
            //将Json字符串进行转换
            StringEntity requestEntity = new StringEntity(json,"utf-8");
            requestEntity.setContentEncoding("UTF-8");
            httpPost.setHeader("Content-type", "application/json");
            httpPost.setEntity(requestEntity);
            // 发起请求
            CloseableHttpResponse response = this.httpClient.execute(httpPost);
            return new HttpResult(response.getStatusLine().getStatusCode(), EntityUtils.toString(
                    response.getEntity(), "UTF-8"));
        }

        /**
         * 请求返回JSONObject对象
         * @param url
         * @param jsonString
         * @return
         */
        public JSONObject getResultData(String url,String jsonString){
            return getResultData(url,jsonString,JSONObject.class);
        }

        /**
         * 请求返回实体类
         * @param url 请求地址
         * @param jsonString 请求参数
         * @param cls 传入要转换的实体类类型
         * @param <T> 泛型
         * @return 传入的实体类
         * @throws Exception
         */
        public  <T> T getResultData(String url,String jsonString,  Class<T> cls){
             //log.info(jsonString);
             Object object=new Object();
             try {
                HttpResult httpResult = doPostJson(url, jsonString);
                if (httpResult.getCode().equals(200)) {
                    JSONObject jsonObject = JSONObject.parseObject(httpResult.getBody());
                    //IMES正确返回值包含errorCode,errorMsg,resultData
                    if(jsonObject.containsKey("resultData")&&jsonObject.containsKey("errorMsg")&&jsonObject.containsKey("errorCode")){
                        if (jsonObject.get("errorCode").toString().equals("0") && jsonObject.get("errorMsg").toString().equals("OK")) {
                            JSONArray resultData = (JSONArray) jsonObject.get("resultData");
                            if(resultData.size()>0){
                                 object = JSON.toJavaObject((JSONObject) resultData.get(0), cls);
                            }else{
                                object = JSON.toJavaObject(new JSONObject(), cls);
                            }
                        }else{
                            log.info("请求成功，错误信息。");
                            log.info("errorCode:"+jsonObject.get("errorCode").toString()+",errorMsg:"+jsonObject.get("errorMsg").toString()
                                +"resultData:"+jsonObject.get("resultData").toString());
                        }
                    }
                } else {
                    log.error("请求错误，错误信息,HttpCode:" + httpResult.getCode() + ",返回内容:" + httpResult.getBody());
                }
            } catch (Exception e) {
                log.error(e.getMessage());
            }

            return (T) object;
        }


    }
}