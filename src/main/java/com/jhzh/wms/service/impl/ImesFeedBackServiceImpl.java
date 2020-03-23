package com.jhzh.wms.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.http.HttpResult;
import com.jhzh.wms.base.utils.EmptyUtils;
import com.jhzh.wms.dao.*;
import com.jhzh.wms.dto.*;
import com.jhzh.wms.service.ImesFeedBackService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@PropertySource("classpath:imesurlconfig.properties")
public class ImesFeedBackServiceImpl implements ImesFeedBackService {
    @Resource
    private HttpResult.HttpAPIService httpAPIService;
    @Value("${wmsInvInResultUrl}")
    private String wmsInvInResultUrl;
    @Value("${wmsInvOutResultUrl}")
    private String wmsInvOutResultUrl;
    @Value("${queryItemInfoUrl}")
    private String queryItemInfoUrl;
    @Value("${queryItemBomInfoUrl}")
    private String queryItemBomInfoUrl;
    @Value("${queryWoPlanInfoUrl}")
    private String queryWoPlanInfoUrl;
    @Autowired
    private WoPlanInfoDao woPlanInfoDao;
    @Autowired
    private ItemBomInfoDao itemBomInfoDao;
    @Autowired
    private PutInStorageDao putInStorageDao;
    @Autowired
    private WmsInvOutDao wmsInvOutDao;
    @Autowired
    private YxWmsCellDao yxWmsCellDao;
    @Autowired
    private IlsCellDao IlscellDao;
    @Autowired
    private ItemInfoDao itemInfoDao;
    @Autowired
    private TaskmesDao taskmesDao;


    private Integer wipQtyTemp;

    private Boolean flag = true;


    @Override
    public Map<String, String> wmsInvInResult(List<WmsInvInDto> wmsInvInDtoList) {
        //返回信息
        Map<String, String> resultMap = new HashMap<>();
        Map<String, List<WmsInvInDto>> map = groupWmsInvInBean(wmsInvInDtoList);
        map.forEach((key, value) -> {
            WmsInvInResultDto wmsInvInResultDto = new WmsInvInResultDto();
            List<Map<String, Object>> itemList = new ArrayList<>();
            //封装发送对象
            value.forEach(wmsInvInBean -> {
                Map<String, Object> itemMap = new HashMap<>();
                BeanUtils.copyProperties(wmsInvInBean, wmsInvInResultDto);
                itemMap.put("shelfLay", wmsInvInBean.getShelfLay());
                itemMap.put("wipEntityId", wmsInvInBean.getWipEntityId());
                itemMap.put("stockNo", wmsInvInBean.getStockNo());
                itemMap.put("itemCode", wmsInvInBean.getItemCode());
                itemMap.put("lotCode", wmsInvInBean.getLotCode());
                itemMap.put("quantity", wmsInvInBean.getQuantity());
                itemList.add(itemMap);
            });
            wmsInvInResultDto.setItemList(itemList);
            resultMap.putAll(doHttp(wmsInvInResultDto, wmsInvInResultUrl));
        });
        return resultMap;
    }

    @Override
    public Map<String, String> wmsInvOutResult(List<TaskmesDto> taskmesList) {
        //返回信息
        Map<String, String> resultMap = new HashMap<>();

        taskmesList.forEach(taskmesDto -> {
            Map<String, Object> map = new HashMap<>();
            String taskid = taskmesDto.getTaskid();
            List<WmsInvOutDto> dtos = wmsInvOutDao.queryWmsInvOut(
                    WmsInvOutDto.builder()
                    .taskId(taskid)
                    .statuscode(0)
                    .build());
            WmsInvOutDto dto = dtos.get(0);
            String celliddst = taskmesDto.getCelliddst();

            List<IlsCellDto> ilsCellDtos=IlscellDao.queryCell(IlsCellDto.builder()
                    .id(Long.parseLong(celliddst))
                    .build());
            IlsCellDto ilsCellDto=ilsCellDtos.get(0);
            map.put("taskId", taskid);//任务 ID 号
            map.put("taskSource", "103-C");//任务来源标识
            map.put("invOutType", dto.getInvOutType());//出库类型
            map.put("locator", taskmesDto.getLocator());//立体库出口位编码
            map.put("shelfCode", ilsCellDto.getTrayno());//多层载具载具号/托盘号
            map.put("wipEntityId", dto.getWipEntityId());//工单 ID 号
            map.put("stockNo", ilsCellDto.getTrayno());//托盘编号
            map.put("itemCode", dto.getItemCode());//物料编码
            map.put("lotCode", dto.getWipEntityId());//物料批次号 系统时间+30
            map.put("quantity", ilsCellDto.getPartnum());//数量 ？？跟周总要？？
            map.put("statusCode", 12);//任务状态 是我自己定义还是？？都出库了不是完成了吗？？
            map.put("statusInfor", "任务执行完成");//同上
            map.put("memoInfo1", null);
            map.put("memoInfo2", null);
            map.put("memoInfo3", null);
            map.put("memoInfo4", null);
            map.put("memoInfo5", null);
            taskmesDto.setStatus(0);
            taskmesDao.updateTaskmes(taskmesDto);
            resultMap.putAll(doHttp(map, wmsInvOutResultUrl));
        });
        return resultMap;
    }

    public void QueryItemInfo(String itemCode) {
        try {
            HashMap<String, Object> map = new HashMap();
            map.put("organizationId", "142");
            map.put("itemCode", itemCode);
            map.put("lastUpdateDateFrom", "1990-01-01 00:00:00");
            map.put("lastUpdateDateTo", "9999-12-31 00:00:00");
            map.put("lineNumber", "1");
            map.put("lineTotal", "2000");
            ItemInfoDto itemInfoDto = httpAPIService.getResultData(queryItemInfoUrl, JSONObject.toJSONString(map), ItemInfoDto.class);
            itemInfoDto.setId(UUID.randomUUID().toString().replaceAll("-", ""));
            itemInfoDto.setUnt(9);
            itemInfoDto.setApp(900);
            Integer counts = itemInfoDao.queryItemInfoByItemCode(itemCode);
            if (counts == 0) {
                itemInfoDao.insertItemInfo(itemInfoDto);
            } else {
                itemInfoDao.updateItemInfo(itemInfoDto);
            }

        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }


    /**
     * 物资 BOM 查询接口
     *
     * @param itemCode
     * @return
     */
    public List<List<IlsCellDto>> QueryItemBomInfo(String itemCode) {
        List<List<IlsCellDto>> lists = new ArrayList<>();
        try {
            HashMap<String, Object> map = new HashMap();
            map.put("organizationId", "142");
            map.put("itemCode", itemCode);
            //根据物资编码获取物资组件信息
            ItemBomInfoDto itemBomInfoDto = httpAPIService.getResultData(queryItemBomInfoUrl, JSONObject.toJSONString(map), ItemBomInfoDto.class);
            ItemBomInfoDto data;
            List<ItemBomInfoDto.ItemListBean> itemList = itemBomInfoDto.getItemList();
            itemList.sort(Comparator.comparing(ItemBomInfoDto.ItemListBean::getComponentItemCode).reversed());
            /*//物资组件的条数存入全局变量中
            wipCountTemp = itemList.size();*/

            //查询物资组件数量并存入MAP
            TreeMap<String, List<IlsCellDto>> tempMap = new TreeMap<>();
            for (ItemBomInfoDto.ItemListBean itemListBean : itemList) {
                //查询库存并取得小板总数量
                String code = itemListBean.getComponentItemCode().replaceAll("-", "");
                IlsCellDto ilsCellDto = new IlsCellDto();//物资组件编码
                ilsCellDto.setPartid(Long.parseLong(code));
                ilsCellDto.setLocked(0);
                ilsCellDto.setAreano(15);
                List<IlsCellDto> ilsCellDtos = IlscellDao.queryCell(ilsCellDto);
                tempMap.put(itemListBean.getComponentItemCode(), ilsCellDtos);
            }

            //循环判断是否每一个物资组件数量都满足要求
            tempMap.forEach((key, value) -> {
                List<IlsCellDto> ilsCellDtos = matchData(value);
                if (ilsCellDtos.size() > 0) {
                    flag = true;
                    lists.add(ilsCellDtos);
                }
            });

        } catch (Exception e) {
            log.error(e.getMessage());
        } finally {
            flag = true;
            wipQtyTemp = 0;
        }
        return lists;
    }


    @Override
    public ItemInfoDto queryItemInfo(HashMap<String, Object> map) {
        ItemInfoDto itemInfoDto = new ItemInfoDto();
        try {
            map.put("organizationId", "142");
            map.put("lastUpdateDateFrom", "1990-01-01 00:00:00");
            map.put("lastUpdateDateTo", "9999-12-31 00:00:00");
            map.put("lineNumber", "1");
            map.put("lineTotal", "2000");
            itemInfoDto = httpAPIService.getResultData(queryItemInfoUrl, JSONObject.toJSONString(map), ItemInfoDto.class);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return itemInfoDto;
    }

    /**
     * 查找已完成任务并更新状态
     */
    @Override
    public void QueryCompletedTask() {
        TaskmesDto dto2 = TaskmesDto.builder()
                        .areano(15)
                        .action(500)
                        .status(500)
                        .build();
        //查询拣选已完成任务修改状态
        List<TaskmesDto> taskmesDtos2 = taskmesDao.queryCompletedTask(dto2);
        //TODO 记录总盘数
        taskmesDtos2.forEach(taskmesDto2 ->{
            String taskid = taskmesDto2.getTaskid();
            taskmesDto2.setTaskid("");
            taskmesDto2.setStatus(0);
            taskmesDao.updateTaskmes(taskmesDto2);
            woPlanInfoDao.updateStatus(taskid);
        });
    }

    private List<IlsCellDto> matchData(List<IlsCellDto> value) {
        List<IlsCellDto> qtyGt = value.stream().filter(ilsCellDto -> ilsCellDto.getPartnum() >= wipQtyTemp).collect(Collectors.toList());

        if (qtyGt.size() > 0) {
            //如果大于两个则按日期逆序排序，如果日期相同则按数量排序
            if (qtyGt.size() > 2) {
                qtyGt.sort(Comparator.comparing(IlsCellDto::getPartdate).reversed().thenComparing(IlsCellDto::getPartnum));
                return qtyGt;
                //等于1则直接返回
            } else if (qtyGt.size() == 1) {
                return qtyGt;
            }
        }
        return qtyGt;

        /*List<IlsCellDto> qtyLt = value.stream().filter(ilsCellDto -> ilsCellDto.getPartnum() < wipQtyTemp).collect(Collectors.toList());
        if (qtyLt.size() == 0) {
            return null;
        }
        List<IlsCellDto> list = new ArrayList<>();
        qtyLt.forEach(ilsCellDto -> {
            //查询允许拆分批的数据，且为同一批次的物料
            List<IlsCellDto> ilsCellDtoList = IlscellDao.queryOtherPart(ilsCellDto, wipQtyTemp);
            if (ilsCellDtoList.size() > 0) {
                for (IlsCellDto cellDto : ilsCellDtoList) {
                    list.add(cellDto);
                }
            }
        });

        list.sort(Comparator.comparing(IlsCellDto::getPartdate).reversed().thenComparing(IlsCellDto::getPartnum));
        return list;*/
    }

    /**
     * 工序计划待产查询接口
     *
     * @param map
     */
    @Override
    public String QueryWoPlanInfo(Map<String, Object> map) {
        map.put("organizationId", "142");
        map.put("deptCode", "LMT");
        map.put("lastUpdateDateTo", "9999-12-31 00:00:00");
        map.put("lastUpdateDateFrom", "1990-01-01 00:00:00");
        map.put("lineTotal", "2000");
        map.put("lineNumber", "1");
        String JSONString = JSONObject.toJSONString(map);
        try {
            WoPlanInfoDto woPlanInfoDto = httpAPIService.getResultData(queryWoPlanInfoUrl, JSONString, WoPlanInfoDto.class);
            //WoPlanInfoDto woPlanInfoDto = httpAPIService.getResultData(queryWoPlanInfoUrl, "{\"organizationId\":\"142\",\"deptCode\":\"LMT\",\"itemCode\":\"\",\"lineNumber\":\"1\",\"lineTotal\":\"2000\"}", WoPlanInfoDto.class);
            WoPlanInfoDto data;
            List<WoPlanInfoDto.ItemListBean> itemList = woPlanInfoDto.getItemList();
            if(EmptyUtils.isEmpty(itemList)){
                return "";
            }
            for (WoPlanInfoDto.ItemListBean item : itemList) {
                data = woPlanInfoDto;
                String uuid = UUID.randomUUID().toString().replaceAll("-", "");
                data.setId(uuid);
                data.setUnt(9);
                data.setApp(900);
                data.setWipEntityId(item.getWipEntityId());
                data.setWipEntityName(item.getWipEntityName());
                data.setSortId(item.getSortId());
                data.setWipQty(item.getWipQty());
                data.setWipQtyPcs(item.getWipQtyPcs());
                data.setItemCode(item.getItemCode());
                data.setItemDesc(item.getItemDesc());
                data.setPlanDate(item.getPlanDate());
                //查询待产计划，如果表中存在数据则不进行插入
                List<WoPlanInfoDto> woPlanInfoDtoList = woPlanInfoDao.queryWipEntity(new WoPlanInfoDto());
                //已存在待产计划
                if (woPlanInfoDtoList.size() > 0) {
                    continue;
                }
                //初步筛选库存是否含有组成大板的小板材料入库记录，如无关联小板则跳过待产计划
                List<WmsInvInDto> wmsInvInList = putInStorageDao.queryItemCode(item.getItemCode());
                //将执行单条执行计划的信息存入全局变量中
                wipQtyTemp = item.getWipQty();
                if (wmsInvInList.size() == 0) {
                    continue;
                }
                //查询bom是否满足查询条件
                List<List<IlsCellDto>> lists = QueryItemBomInfo(item.getItemCode());
                if (lists.size() == 0) {
                    continue;
                }
                //拼接小料库位信息
                StringBuffer sb = new StringBuffer();
                for (List<IlsCellDto> list : lists) {
                    for (IlsCellDto dto : list) {
                         sb.append(dto.getId() + ",");
                    }
                }
                String str = sb.substring(0, sb.length() - 1);
                data.setCellnum(lists.size());
                data.setCellids(str);
                TaskmesDto dto = TaskmesDto.builder()
                        .areano(15)
                        .action(500)
                        .status(10)
                        .cellstrsrc(str)//小料信息
                        .build();
                //查询拣选任务是否存在
                List<TaskmesDto> taskmesDtos = taskmesDao.queryCompletedTask(dto);
                if (!EmptyUtils.isEmpty(taskmesDtos)) {
                    continue;
                }
                //往160101拣选台空位插入工单信息
                IlscellDao.updateCellByCellId(IlsCellDto.builder()
                            .id(Long.parseLong("160101"))
                            .partid(Long.parseLong(item.getItemCode()))//物料号
                            .partdesc(item.getItemDesc())
                            .partwoid(Long.parseLong(String.valueOf(item.getWipEntityId())))//工单号
                            //.cmdstatus(10)
                            .partnum(0)
                            .locked(0)
                            //TODO 批号
                            .build());
                //任务号
                dto.setTaskid(uuid);
                //修改任务表等待后台拣选
                taskmesDao.updateTaskmes(dto);
                //插入拣选信息 ,状态0 ,拣选完需要修改状态
                woPlanInfoDao.insertWoPlanInfo(data);
                return uuid;
            }

        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return "";
    }


    @Async
    Map<String, String> doHttp(Object object, String Url) {
        Map<String, String> resutMap = new HashMap<>();
        JSONObject jsonObj = (JSONObject) JSON.toJSON(object);
        String taskId = jsonObj.get("taskId").toString();
        try {
            HttpResult httpResult = httpAPIService.doPostJson(Url, JSONObject.toJSONString(object));
            if (httpResult.getCode().equals(200)) {
                JSONObject jsonObject = JSONObject.parseObject(httpResult.getBody());
                String errorCode = jsonObject.get("errorCode").toString();
                if (!StringUtils.isEmpty(errorCode) && !errorCode.equals("0")) {
                    log.info("请求成功，任务号:" + taskId + "\n返回错误信息errorMsg:" + jsonObject.get("errorMsg").toString());
                } else {
                    Object resultData1 = jsonObject.get("resultData");
                    if (resultData1 == null) {
                        resutMap.put(taskId, "请求成功，返回数据为空！");
                    } else {
                        String resultData = jsonObject.get("resultData").toString();
                        resutMap.put(taskId, resultData);
                    }
                }
            } else {
                log.error("请求错误，任务号：" + taskId + "\n错误信息,HttpCode:" + httpResult.getCode() + ",返回内容:" + httpResult.getBody());
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return resutMap;
    }

    private Map<String, List<WmsInvOutDto>> groupWmsInvOutBean(List<WmsInvOutDto> wmsInvOutDtoList) {
        Map<String, List<WmsInvOutDto>> map = new HashMap<>();
        wmsInvOutDtoList.forEach(wmsInvOutBean -> {
            String taskId = wmsInvOutBean.getTaskId();
            if (map.containsKey(taskId)) {
                List<WmsInvOutDto> wmsInvOutDtos = map.get(taskId);
                wmsInvOutDtos.add(wmsInvOutBean);
                map.remove(taskId);
                map.put(taskId, wmsInvOutDtos);
            } else {
                List<WmsInvOutDto> wmsInvOutDtos = new ArrayList<>();
                wmsInvOutDtos.add(wmsInvOutBean);
                map.put(taskId, wmsInvOutDtos);
            }
        });

        return map;
    }


    /**
     * //将数据分组存入HashMap
     *
     * @param wmsInvInDtoList
     * @return
     */
    private Map<String, List<WmsInvInDto>> groupWmsInvInBean(List<WmsInvInDto> wmsInvInDtoList) {
        Map<String, List<WmsInvInDto>> map = new HashMap<>();
        wmsInvInDtoList.forEach(wmsInvInBean -> {
            String taskId = wmsInvInBean.getTaskId();
            if (map.containsKey(taskId)) {
                List<WmsInvInDto> wmsInvInDtos = map.get(taskId);
                wmsInvInDtos.add(wmsInvInBean);
                map.remove(taskId);
                map.put(taskId, wmsInvInDtos);
            } else {
                List<WmsInvInDto> wmsInvInDtos = new ArrayList<>();
                wmsInvInDtos.add(wmsInvInBean);
                map.put(taskId, wmsInvInDtos);
            }
        });
        return map;
    }
}
