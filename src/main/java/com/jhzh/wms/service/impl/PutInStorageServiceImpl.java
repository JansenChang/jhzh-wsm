package com.jhzh.wms.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.http.HttpResult;
import com.jhzh.wms.base.result.CodeMsg;
import com.jhzh.wms.base.result.ErrorCode;
import com.jhzh.wms.base.result.Result;
import com.jhzh.wms.base.utils.EmptyUtils;
import com.jhzh.wms.dao.*;
import com.jhzh.wms.dto.*;
import com.jhzh.wms.service.ImesFeedBackService;
import com.jhzh.wms.service.PutInStorageService;
import com.jhzh.wms.service.WmsTaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.*;
import java.util.stream.Collectors;

/**
 * WSM入库查询接口业务处理类
 */
@Slf4j
@Service
public class PutInStorageServiceImpl implements PutInStorageService {
    @Autowired
    private PutInStorageDao putInStorageDao;
    private static ServerSocket serverSocket;
    @Autowired
    private ImesFeedBackService imesFeedBackService;
    @Autowired
    private IlsCellDao IlscellDao;
    @Autowired
    private TaskmesDao taskmesDao;
    @Autowired
    private WmsTaskService wmsTaskService;
    @Autowired
    private WoPlanInfoDao woPlanInfoDao;
    @Autowired
    private WmsInvOutDao wmsInvOutDao;
    @Resource
    private HttpResult.HttpAPIService httpAPIService;
    @Value("${queryItemBomInfoUrl}")
    private String queryItemBomInfoUrl;

    Map<Integer, Integer> longCage = new HashMap<Integer, Integer>() {
        {
            put(2, 250106);
            put(3, 250105);
            put(4, 250104);
            put(5, 250103);
            put(6, 250102);
            put(7, 250101);
        }
    };
    Map<Integer, Integer> shortCage = new HashMap<Integer, Integer>() {
        {
            put(2, 260106);
            put(3, 260105);
            put(4, 260104);
            put(5, 260103);
            put(6, 260102);
            put(7, 260101);
        }
    };


 /*   static {
        try {
            serverSocket = new ServerSocket(4567);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }*/

    @Override
    public Result<?> queryFreeSpace(JSONObject jsonpObject) {
        TreeMap<String, Object> resultData = new TreeMap<>();
        resultData.put("locator", "3");
        resultData.put("taskSource", "103-C");
        resultData.put("memoInfo1", "");
        resultData.put("memoInfo2", "");
        resultData.put("memoInfo3", "");
        resultData.put("memoInfo4", "");
        resultData.put("memoInfo5", "");
        try {
            //SendTcp(jsonpObject);
            //TcpService();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return Result.success(resultData);
    }

    private String TcpService() throws IOException {
        Socket socket = null;
        try {
            //创建Socket对象
            //监听（阻塞）
            socket = serverSocket.accept();
            //获取输入流对象
            InputStream is = socket.getInputStream();
            //获取数据
            byte[] bys = new byte[1024];
            int len;
            len = is.read(bys);
            String str = new String(bys, 0, len);
            log.info(str);
            socket.close();
            return str;
        } catch (Exception e) {
            log.error(e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

     @Async
    public void SendTcp(JSONObject jsonpObject) {
        log.info("sendTcp Begin>>>>>>");
        //创建Socket对象
        try {
            Socket socket = new Socket(InetAddress.getByName("192.168.8.211"), 4567);
            //获取输出流对象
            OutputStream os = socket.getOutputStream();
            //发送数据
            String args="@@cmd=las_inqlocator"+"@@";
            os.write(args.getBytes());
            InputStream is=socket.getInputStream();
            Thread.sleep(100);
            byte[] bys = new byte[1024];
            int len;
            len = is.read(bys);
            String str = new String(bys, 0, len);
            log.info(str);
            //释放
            socket.close();
        } catch (IOException | InterruptedException e) {
            log.error(e.getMessage());
            e.printStackTrace();
        }
        log.info("sendTcp Begin>>>>>>");
    }

    @Override
    public Result<?> wmsInvIn(JSONObject jsonpObject) {
        try {

            //校验数据是否完整
            WmsInvInDto wmsInvInDto = jsonpObject.toJavaObject(WmsInvInDto.class);
            boolean massValue = validateFull(jsonpObject);
            if (!massValue) {
                log.error("入库接口数据不完整，请检查：\n"+jsonpObject.toJSONString());
                return Result.error(CodeMsg.builder().code(ErrorCode.NULL_OBJ.getCode()).msg(ErrorCode.NULL_OBJ.getMsg()).build());
            }
             //校验TaskId是否已存在
            boolean existTaskId = validateTaskId(jsonpObject);
            if (existTaskId) {
                log.error("入库接口TaskId异常，请检查：\n"+jsonpObject.toJSONString());
                return Result.error(CodeMsg.builder().code(ErrorCode.IDALREADY_EXIST.getCode()).msg(ErrorCode.IDALREADY_EXIST.getMsg()).build());
            }

            //locator转换
            Map<String,String>stringMap=new HashMap<>();
            stringMap.put("1","2");
            stringMap.put("2","1");
            stringMap.put("3","3");
            //校验locator
            String locator = (String) jsonpObject.get("locator");
            locator=stringMap.get(locator);
            boolean invalidLocator = validateLocator(locator);
            if (!invalidLocator) {
                log.error("入库接口无效立体库提升机入口位编码，请检查：\n"+jsonpObject.toJSONString());
                return Result.error(CodeMsg.builder().code(ErrorCode.NVALIDI_LIB_CODE.getCode()).msg(ErrorCode.NVALIDI_LIB_CODE.getMsg()).build());
            }
            //校验物料编号
            boolean invalidItemCode = validateItemCode(jsonpObject);
            if (!invalidItemCode) {
                log.error("入库接口物料编号有误，请检查：\n"+jsonpObject.toJSONString());
                return Result.error(CodeMsg.builder().code(ErrorCode.NVALID_ITEM_CODE.getCode()).msg(ErrorCode.NVALID_ITEM_CODE.getMsg()).build());
            }
            //TODO 托盘校验

           /* boolean taryCode = validateTaryNo(jsonpObject);
            if(!taryCode){
                return Result.error(CodeMsg.builder().code(ErrorCode.REPEAT_ITEM_CODE.getCode()).msg(ErrorCode.REPEAT_ITEM_CODE.getMsg()).build());
            }
*/
            TaskmesDto dto;
            Map<String, Object> map = new HashMap<>();
            map.put("locator", jsonpObject.get("locator"));
            map.put("shelfCode", jsonpObject.get("shelfCode"));
            map.put("taskId", jsonpObject.get("taskId"));
            map.put("taskSource", jsonpObject.get("taskSource"));
            StringBuffer sb = new StringBuffer();
            //locator 1和2 , 2楼料盘入库
            if (locator.equals("2") || locator.equals("1")) {
                List<WmsInvInDto.ItemListBean> itemList = wmsInvInDto.getItemList();
                Integer trayid = null;
                for (WmsInvInDto.ItemListBean itemListBean : itemList) {
                    Integer shelfLay = itemListBean.getShelfLay();
                    String trayno = itemListBean.getStockNo();
                    Integer cellId = null;

                    if (locator.equals("1")) {
                        cellId = longCage.get(shelfLay);
                    } else {
                        cellId = shortCage.get(shelfLay);
                    }
                    sb.append(cellId + ",");
                    if (trayno.contains("P")) {
                        trayid = Integer.parseInt(trayno.replaceAll("P", ""));
                    }
                    if (trayno.indexOf("666") == 0) {
                        trayid = Integer.parseInt(trayno);
                    }
                    String itemCode = itemListBean.getItemCode();
                    HashMap<String, Object> bomMap = new HashMap();
                    map.put("organizationId", "142");
                    map.put("itemCode", itemCode);
                    //根据物资编码获取物资组件信息
                    ItemBomInfoDto itemBomInfoDto = httpAPIService.getResultData(queryItemBomInfoUrl, JSONObject.toJSONString(map), ItemBomInfoDto.class);

                    //查询是否itemCode+ lotCode 已在 WMS 存在过
                    List<IlsCellDto> ilsCellDtos = IlscellDao.queryCell(IlsCellDto.builder()
                            .partid(Long.parseLong(itemCode.replace("-", "")))
                            .partlotid(Long.parseLong(itemListBean.getLotCode().toString()))
                            .build());
                    IlscellDao.updateCellByCellId(IlsCellDto.builder()
                            .id(Long.parseLong(cellId.toString()))
                            .trayid(Long.parseLong(trayid.toString()))
                            .trayno(trayno)
                            .partid(Long.parseLong(itemCode.replace("-", "")))//物料号
                            .partdesc(itemBomInfoDto.getItemDesc())
                            .partnum(itemListBean.getQuantity())//数量
                            .partdate(System.currentTimeMillis())//入库时间 TODO System.currentTimeMillis()/1000
                            .partwoid(Long.parseLong(itemListBean.getWipEntityId().toString()))//工单号
                            .partlotid(Long.parseLong(itemListBean.getLotCode().toString()))//批号
                            .partlotdiv(0)//可拆批
                            .build());
                }
                dto = TaskmesDto.builder()
                        .areano(15)
                        .action(120)
                        .locator(Integer.parseInt(locator))
                        .taskid((String) jsonpObject.get("taskId"))
                        .status(10)
                        .cellstrsrc(sb.deleteCharAt(sb.length() - 1).toString())//
                        .build();
                //TODO 查询是否存在任务
                List<TaskmesDto> taskmesDtos = taskmesDao.queryTaskmes(dto);
                if (!EmptyUtils.isEmpty(taskmesDtos)) {
                    return Result.error(new CodeMsg(200, ErrorCode.TASK_BUSY.getMsg()));
                }
                taskmesDao.updateTaskmes(dto);
            }
            //3是空盘入库
            if (locator.equals("3")) {
                dto = TaskmesDto.builder()
                        .locator(3)
                        .areano(10)
                        .action(110)
                        .taskid((String) jsonpObject.get("taskId"))
                        .cellidsrc("310101")
                        .status(10)
                        .build();
                List<TaskmesDto> taskmesDtos = taskmesDao.queryTaskmes(dto);
                if (!EmptyUtils.isEmpty(taskmesDtos)) {
                    return Result.error(new CodeMsg(200, ErrorCode.TASK_BUSY.getMsg()));
                }
                taskmesDao.updateTaskmes(dto);
                Integer cellId = 310101;
                //TODO 更新310101盘号
                List<Map<String, Object>> itemList = (List<Map<String, Object>>) jsonpObject.get("itemList");
                String trayno = (String) itemList.get(0).get("stockNo");
                Integer trayid = null;
                if (trayno.indexOf("666") == 0) {
                    trayid = Integer.parseInt(trayno);
                }
                IlscellDao.updateCellByCellId(IlsCellDto.builder()
                        .id(Long.parseLong(cellId.toString()))
                        .trayid(Long.parseLong(trayid.toString()))
                        .trayno(trayno)
                        .partid(Long.parseLong("000000000"))//物料号
                        .partnum(0)//数量
                        .partdate(System.currentTimeMillis())//入库时间 TODO System.currentTimeMillis()/1000
                        .partwoid(Long.parseLong("-1"))//工单号
                        .partlotid(Long.parseLong("0"))//批号
                        .partlotdiv(0)//可拆批
                        .build());
            }

            wmsInvInDto.setUnt(9);
            wmsInvInDto.setApp(900);
            wmsInvInDto.setDeptid(145);
            WmsInvInDto date;
            List<WmsInvInDto.ItemListBean> itemList = wmsInvInDto.getItemList();
            for (WmsInvInDto.ItemListBean itemListBean : itemList) {
                //拼装数据插入in表
                date = wmsInvInDto;
                date.setId(String.valueOf(System.currentTimeMillis() / 1000));
                date.setIsMultiPalForLot(itemListBean.getIsMultiPalForLot());
                date.setItemCode(itemListBean.getItemCode());
                date.setLotCode(itemListBean.getLotCode());
                date.setQuantity(itemListBean.getQuantity());
                date.setShelfLay(itemListBean.getShelfLay());
                date.setStockNo(itemListBean.getStockNo());
                date.setWipEntityId(itemListBean.getWipEntityId());
                date.setIsMultiPalForLot(0);
                date.setLotCode(date.getLocator().equals(3) ? 0 : itemListBean.getLotCode());
                date.setStatus(0);
                putInStorageDao.insertWmsInvIn(date);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return Result.error(new CodeMsg(200, e.getMessage()));
        }
        return Result.success(jsonpObject);
    }

    private boolean   validateTaryNo(JSONObject jsonpObject) {
        List<Map<String, String>> itemList = (List<Map<String, String>>) jsonpObject.get("itemList");
        for (Map<String, String> map : itemList) {
            String stockNo = map.get("stockNo");
            List<IlsCellDto> ilsCellDtos = IlscellDao.queryCell(IlsCellDto.builder().trayno(stockNo).build());
            List<IlsCellDto> lt=new ArrayList<>();
            if(("345").indexOf((String) jsonpObject.get("locator"))==0){
                lt = ilsCellDtos.stream().filter(ilsCellDto -> ilsCellDto.getAreano() == 10 &&ilsCellDto.getId()!=310201&&ilsCellDto.getId()!=310301).collect(Collectors.toList());
            }else{
                lt = ilsCellDtos.stream().filter(ilsCellDto ->ilsCellDto.getAreano() == 15).collect(Collectors.toList());
            }

            if (EmptyUtils.isNotEmpty(lt)){
                return false;
            }
        }
        return true;
    }

    private boolean validateItemCode(JSONObject jsonpObject) {
        List<Map<String, String>> itemList = (List<Map<String, String>>) jsonpObject.get("itemList");
        for (Map<String, String> map : itemList) {
            String itemCode = map.get("itemCode");
            HashMap<String, Object> hashMap = new HashMap();
            hashMap.put("itemCode", itemCode);
            if (itemCode.indexOf("000000000") == 0) {
                continue;
            }

            ItemInfoDto itemInfoDto = imesFeedBackService.queryItemInfo(hashMap);
            if (EmptyUtils.isEmpty(itemInfoDto.getItemCode())) {
                return false;
            }
        }
        return true;
    }

    private boolean validateLocator(String locator) {
        return "12345".contains(locator) && locator.length() > 0;
    }

    /**
     * 查询入库表是否已经有该taskId数据
     *
     * @param jsonpObject
     * @return
     */
    private boolean validateTaskId(JSONObject jsonpObject) {
        String taskId = (String) jsonpObject.get("taskId");
        List<TaskStatusDto> taskStatusDtos = wmsTaskService.queryTaskStatus(taskId);
        return !EmptyUtils.isEmpty(taskStatusDtos);
    }

    private boolean validateFull(JSONObject jsonpObject) {
        if (jsonpObject.containsKey("itemList")) {
            JSONArray itemList = jsonpObject.getJSONArray("itemList");
            if (itemList.size() > 0) {
                for (int i = 0; i < itemList.size(); i++) {
                    JSONObject jsonObject = (JSONObject) itemList.get(0);
                    if (
                            !(jsonObject.containsKey("shelfLay") &&
                                    jsonObject.containsKey("wipEntityId") &&
                                    jsonObject.containsKey("stockNo") &&
                                    jsonObject.containsKey("itemCode") &&
                                    jsonObject.containsKey("lotCode") &&
                                    jsonObject.containsKey("quantity"))
                    ) {
                        return false;
                    }
                    String locator = (String) jsonObject.get("locator");
                    String shelfLay = (String) jsonObject.get("shelfLay");
                    String wipEntityId = (String) jsonObject.get("wipEntityId");
                    String stockNo = (String) jsonObject.get("stockNo");
                    String itemCode = (String) jsonObject.get("itemCode");
                    String lotCode = (String) jsonObject.get("lotCode");
                    String quantity = (String) jsonObject.get("quantity");
                    if (jsonpObject.get("locator").equals("3")) {
                        if ((EmptyUtils.isEmpty(shelfLay) ||
                                EmptyUtils.isEmpty(wipEntityId) ||
                                EmptyUtils.isEmpty(stockNo) ||
                                EmptyUtils.isEmpty(itemCode) ||
                                EmptyUtils.isEmpty(quantity))) {
                            return false;
                        }
                    } else {
                        if ((EmptyUtils.isEmpty(shelfLay) ||
                                EmptyUtils.isEmpty(wipEntityId) ||
                                EmptyUtils.isEmpty(stockNo) ||
                                EmptyUtils.isEmpty(itemCode) ||
                                EmptyUtils.isEmpty(lotCode) ||
                                EmptyUtils.isEmpty(quantity))) {
                            return false;
                        }
                    }

                }
            } else {
                return false;
            }

        }
        return jsonpObject.containsKey("taskId") &&
                jsonpObject.containsKey("taskSource") &&
                jsonpObject.containsKey("locator") &&
                jsonpObject.containsKey("shelfCode");
    }

    @Override
    public Result<?> queryStockNum(JSONObject jsonObject) {
        try {
            boolean b = validateStockNum(jsonObject);
            if(!b){
                 return Result.error(CodeMsg.builder().code(ErrorCode.NULL_OBJ.getCode()).msg(ErrorCode.NULL_OBJ.getMsg()).build());
            }
            HashMap<String,Object>map=new HashMap<>();
            map.put("memoInfo1","");
            map.put("memoInfo2","");
            map.put("memoInfo3","");
            map.put("memoInfo4","");
            map.put("memoInfo5","");
            String wipEntityId = (String) jsonObject.get("wipEntityId");
            String lotCode = (String) jsonObject.get("lotCode");
            if(EmptyUtils.isNotEmpty(wipEntityId)||EmptyUtils.isEmpty(lotCode)){
                WoPlanInfoDto dto=new WoPlanInfoDto();
                dto.setWipEntityId(Integer.parseInt(wipEntityId));
                //TODO lotCode未完成
                //根据工单号查询未拣选完成待产任务 状态0
                List<WoPlanInfoDto> woPlanInfoDtos = woPlanInfoDao.queryWipEntity(dto);
                if(EmptyUtils.isNotEmpty(woPlanInfoDtos)){
                    map.put("woTstockNum",0);
                    map.put("memoInfo1","");
                    map.put("memoInfo2","");
                    map.put("memoInfo3","");
                    map.put("memoInfo4","");
                    map.put("memoInfo5","");
                    return Result.success(JSONObject.toJSON(map));
                }
            }


            //库存中剩余盘数加上已经出库盘数等于总盘数
            IlsCellDto dto=new IlsCellDto();
            if(EmptyUtils.isNotEmpty(wipEntityId)){
                dto.setPartwoid(Long.parseLong(wipEntityId));
            }
            if (EmptyUtils.isNotEmpty(lotCode)){
                dto.setPartlotid(Long.parseLong(lotCode));
            }
            dto.setLocked(0);
            List<IlsCellDto> ilsCellDtos = IlscellDao.queryStandardCell(dto);
            //查询已经出库的工单信息  状态???
            List<WmsInvOutDto> wmsInvOutDtos = wmsInvOutDao.queryWmsInvOut(WmsInvOutDto.builder()
                    .wipEntityId(Integer.parseInt(wipEntityId))
                    .statuscode(12)
                    .build());

            map.put("woTstockNum",ilsCellDtos.size()+wmsInvOutDtos.size());
            return Result.success(JSONObject.toJSON(map));
        } catch (Exception e) {
            log.info(e.getMessage());
            return Result.success(new CodeMsg(200, e.getMessage()));
        }
    }

    private boolean validateStockNum(JSONObject jsonObject) {
        if (!(jsonObject.containsKey("taskSource") &&
                (jsonObject.containsKey("wipEntityId") ||
                jsonObject.containsKey("lotCode ")))) {
            return false;
        }
        String taskSource = (String)jsonObject.get("taskSource");
        String wipEntityId= (String)jsonObject.get("wipEntityId");
        String lotCode = (String)jsonObject.get("lotCode");
        return !EmptyUtils.isEmpty(taskSource) || (!EmptyUtils.isEmpty(wipEntityId) || !EmptyUtils.isEmpty(lotCode));
    }


}
