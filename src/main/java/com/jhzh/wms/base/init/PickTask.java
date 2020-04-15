package com.jhzh.wms.base.init;

import com.alibaba.fastjson.JSONObject;
import com.jhzh.wms.base.http.HttpResult;
import com.jhzh.wms.base.utils.EmptyUtils;
import com.jhzh.wms.dao.IlsCellDao;
import com.jhzh.wms.dao.TaskmesDao;
import com.jhzh.wms.dao.WoPlanInfoDao;
import com.jhzh.wms.dto.*;
import com.jhzh.wms.service.PickRackService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@PropertySource("classpath:imesurlconfig.properties")
public class PickTask {

	@Value("${queryWoPlanInfoUrl}")
	private String queryWoPlanInfoUrl;
	@Value("${queryItemBomInfoUrl}")
	private String queryItemBomInfoUrl;
	@Resource
	private HttpResult.HttpAPIService httpAPIService;
	@Resource
	private PickRackService pickRackService;
	@Resource
	private IlsCellDao IlscellDao;
	@Resource
	private TaskmesDao taskmesDao;
	@Resource
	private WoPlanInfoDao woPlanInfoDao;


	Map<Integer, Integer> layer4 = new HashMap<Integer, Integer>() {
		{
			put(1, 170901);
			put(2, 170801);
			put(3, 170701);
			put(4, 170601);
			put(5, 170501);
			put(6, 170401);
			put(7, 170301);
			put(8, 170201);
			put(9, 170101);
		}
	};
	Map<Integer, Integer> layer3 = new HashMap<Integer, Integer>() {
		{
			put(1, 170902);
			put(2, 170802);
			put(3, 170702);
			put(4, 170602);
			put(5, 170502);
			put(6, 170402);
			put(7, 170302);
			put(8, 170202);
			put(9, 170102);
		}
	};
	Map<Integer, Integer> layer2 = new HashMap<Integer, Integer>() {
		{
			put(1, 170903);
			put(2, 170803);
			put(3, 170703);
			put(4, 170603);
			put(5, 170503);
			put(6, 170403);
			put(7, 170303);
			put(8, 170203);
			put(9, 170103);
		}
	};
	Map<Integer, Integer> layer1 = new HashMap<Integer, Integer>() {
		{
			put(1, 170904);
			put(2, 170804);
			put(3, 170704);
			put(4, 170604);
			put(5, 170504);
			put(6, 170404);
			put(7, 170304);
			put(8, 170204);
			put(9, 170104);
		}
	};

	public Map<String, Object> woPlanInfo(Map<String, Object> map) {
		Map<String, Object> msgMap = new HashMap<>();
		map.put("organizationId", "142");
		map.put("deptCode", "LMT");
		map.put("lastUpdateDateTo", "9999-12-31 00:00:00");
		map.put("lastUpdateDateFrom", "1990-01-01 00:00:00");
		map.put("lineTotal", "2000");
		map.put("lineNumber", "1");
		msgMap.put("success", "0");
		msgMap.put("msg", "");
		String JSONString = JSONObject.toJSONString(map);

		try {
			log.info("配套请求\n" + JSONString);
			WoPlanInfoDto woPlanInfoDto = httpAPIService.getResultData(queryWoPlanInfoUrl, JSONString, WoPlanInfoDto.class);
			WoPlanInfoDto data;
			List<WoPlanInfoDto.ItemListBean> itemList = woPlanInfoDto.getItemList();
			if (EmptyUtils.isEmpty(itemList)) {
				msgMap.put("success", "0");
				msgMap.put("msg", "imes查无数据,工单可能已经转单。请查询！");
				return null;
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
				//工单板数
				Integer wipQtyTemp = item.getWipQty();


				List<WoPlanInfoDto> woPlanInfoDtoList = woPlanInfoDao.queryWipEntityById(item.getWipEntityId());
				if (EmptyUtils.isNotEmpty(woPlanInfoDtoList)) {
					msgMap.put("success", "0");
					msgMap.put("msg", "工单已存在拣选任务。");
					continue;
				}

				//查询bom是否满足查询条件
				List<List<IlsCellDto>> lists = QueryItemBomInfo(item.getItemCode(),wipQtyTemp);
				if (EmptyUtils.isEmpty(lists)) {
					msgMap.put("success", "0");
					msgMap.put("msg", "夹层库物资未齐套。");
					continue;
				}

				Map<Integer, Integer[]> integerMap = setInitArrays();
				Integer[] integers4 = integerMap.get(4);
				Integer[] integers3 = integerMap.get(3);
				Integer[] integers2 = integerMap.get(2);
				Integer[] integers1 = integerMap.get(1);

				if (!integers2[0].equals(0) && !integers3[0].equals(0) && !integers4[0].equals(0)) {
					log.info("全部拣选位占满");
					msgMap.put("success", "0");
					msgMap.put("msg", "全部拣选位占满，下料后重试。");
					continue;
				}
				boolean noVacancy = false;

				//小板数量
				int itemSize = lists.size();
				//情况1：盘数小于9
				if (itemSize <= 9) {
					//盘数小于9，且可合盘
					if (integers1[0].equals(0)/*&&integers2[0].equals(0)&&integers4[0].equals(0)*/) {
						for (int i = 0; i < lists.size(); i++) {
							List<IlsCellDto> ilsCellDtoList = lists.get(i);
							//判断是否合盘,等于1不合盘插入数据即可
							if (ilsCellDtoList.size() == 1) {
								IlsCellDto ilsCellDto;
								ilsCellDto = ilsCellDtoList.get(0);
								//首先判断3号位是否有数据
								if ((integers3.length == 10) && noDish(integers3, i)) {
									integers3[i] = Integer.parseInt(ilsCellDto.getId().toString());
								} else if ((integers2.length == 10) && noDish(integers2, i)) {
									integers2[i] = Integer.parseInt(ilsCellDto.getId().toString());
								} else if ((integers4.length == 10) && noDish(integers4, i)) {
									integers4[i] = Integer.parseInt(ilsCellDto.getId().toString());
								} else {
									//  无空闲拣选位,可前置判断
									log.info("当前工单：" + data.getWipEntityId() + ",当前无空闲拣选位置");
									msgMap.put("success", "0");
									msgMap.put("msg", "当前无空闲拣选位置");
									noVacancy = true;
								}
							} else if (ilsCellDtoList.size() == 2) {
								IlsCellDto ilsCellDto = ilsCellDtoList.get(0);
								if (integers3.length == 10 && noDish(integers3, i)) {
									integers3[i] = Integer.parseInt(ilsCellDto.getId().toString());
								} else if (integers4.length == 10 && noDish(integers4, i)) {
									integers4[i] = Integer.parseInt(ilsCellDto.getId().toString());
								} else if (integers2.length == 10 && noDish(integers2, i)) {
									integers2[i] = Integer.parseInt(ilsCellDto.getId().toString());
								} else {
									// 无空闲拣选位,可前置判断
									log.info("当前工单：" + data.getWipEntityId() + ",当前无空闲拣选位置");
									msgMap.put("success", "0");
									msgMap.put("msg", "当前无空闲拣选位置");
									noVacancy = true;
								}
								IlsCellDto ilsCellDto2 = ilsCellDtoList.get(1);
								if (integers1.length == 10 && noDish(integers1, i)) {
									integers1[i] = Integer.parseInt(ilsCellDto2.getId().toString());
								} else if (integers2.length == 10 && integers4.length == 10 && noDish(integers2, i)) {
									integers2[i] = Integer.parseInt(ilsCellDto2.getId().toString());
								} else {
									// 无空闲备盘位
									log.info("当前工单：" + data.getWipEntityId() + ",当前无空闲备盘位");
									msgMap.put("success", "0");
									msgMap.put("msg", "当前无空闲拣选位置");
									noVacancy = true;
								}
							} else if (ilsCellDtoList.size() > 2) {
								// 合盘大于两盘
								log.info("当前工单：" + data.getWipEntityId() + ",合盘大于两盘");
								msgMap.put("success", "0");
								msgMap.put("msg", "物料合盘大于两盘，先进行合盘操作后拣选！");
								noVacancy = true;
							}
						}
					}
				} else if (itemSize <= 18) {
					//预先判断可用层
					if (!integers3[0].equals(0)) {
						// 三层占用,等待拣选完成后执行
						log.info("当前工单：" + data.getWipEntityId() + ",层数较多且三层占用,等待拣选完成后执行");
						msgMap.put("success", "0");
						msgMap.put("msg", "层数较多且三层占用,等待拣选完成后执行");
					}
					//优先选用4，3层进行操作以提供合盘
					if (integers4[0].equals(0)) {
						boolean flag = false;
						//需要判断10层以后数据是否需要合盘
						for (int i = 9; i < lists.size(); i++) {
							List<IlsCellDto> ilsCellDtoList = lists.get(i);
							IlsCellDto ilsCellDto = ilsCellDtoList.get(0);
							//判断是否合盘,等于1不合盘插入数据即可
							if (ilsCellDtoList.size() == 1) {
								integers3[i] = Integer.parseInt(ilsCellDto.getId().toString());
							}

							if (ilsCellDtoList.size() == 2) {
								flag = true;
								if (integers1.length == 10 && noDish(integers1, i)) {
									integers1[i] = Integer.parseInt(ilsCellDto.getId().toString());
								} else {
									// 无空闲备盘位
									log.info("当前工单：" + data.getWipEntityId() + ",无空闲备盘位");
									msgMap.put("success", "0");
									msgMap.put("msg", "当前无空闲拣选位置");
									noVacancy = true;
								}
							}
						}


						for (int i = 0; i < 9; i++) {
							List<IlsCellDto> ilsCellDtoList = lists.get(i);
							IlsCellDto ilsCellDto = ilsCellDtoList.get(0);
							//判断是否合盘,等于1不合盘插入数据即可
							if (ilsCellDtoList.size() == 1) {
								integers4[i] = Integer.parseInt(ilsCellDto.getId().toString());
							}

							if (ilsCellDtoList.size() == 2) {
								if (flag && integers2.length == 10 && noDish(integers2, i)) {
									integers2[i] = Integer.parseInt(ilsCellDto.getId().toString());
								} else {
									// 无空闲备盘位
									log.info("当前工单：" + data.getWipEntityId() + ",无空闲备盘位");
									msgMap.put("success", "0");
									msgMap.put("msg", "当前无空闲拣选位置");
									noVacancy = true;
								}
								if (!flag && integers1.length == 10 && noDish(integers1, i)) {
									integers1[i] = Integer.parseInt(ilsCellDto.getId().toString());
								} else {
									// 无空闲备盘位
									log.info("当前工单：" + data.getWipEntityId() + ",无空闲备盘位");
									msgMap.put("success", "0");
									msgMap.put("msg", "当前无空闲拣选位置");
									noVacancy = true;
								}
							}


						}
						//备用选用3，2层进行操作，只有1进行备盘
					} else if (!integers4[0].equals(0) && integers2[0].equals(0)) {
						boolean flag = false;
						//需要判断10层以后数据是否需要合盘
						for (int i = 9; i < lists.size(); i++) {
							List<IlsCellDto> ilsCellDtoList = lists.get(i);
							IlsCellDto ilsCellDto = ilsCellDtoList.get(0);
							//判断是否合盘,等于1不合盘插入数据即可
							if (ilsCellDtoList.size() == 1) {
								integers2[i] = Integer.parseInt(ilsCellDto.getId().toString());
							}

							if (ilsCellDtoList.size() == 2) {
								flag = true;
								if (integers1.length == 10 && noDish(integers1, i)) {
									integers1[i] = Integer.parseInt(ilsCellDto.getId().toString());
								} else {
									log.info("当前工单：" + data.getWipEntityId() + ",无空闲备盘位");
									msgMap.put("success", "0");
									msgMap.put("msg", "当前无空闲备盘位，请下架后操作。");
									noVacancy = true;
								}
							}
						}


						for (int i = 0; i < 9; i++) {
							List<IlsCellDto> ilsCellDtoList = lists.get(i);
							IlsCellDto ilsCellDto = ilsCellDtoList.get(0);
							//判断是否合盘,等于1不合盘插入数据即可
							if (ilsCellDtoList.size() == 1) {
								integers3[i] = Integer.parseInt(ilsCellDto.getId().toString());
							}

							if (ilsCellDtoList.size() == 2) {
								if (flag) {
									log.info("当前工单：" + data.getWipEntityId() + ",无空闲备盘位");
									msgMap.put("success", "0");
									msgMap.put("msg", "无空闲备盘位,请下架后进行操作");
									noVacancy = true;
								}
								if (integers1.length == 10 && noDish(integers2, i)) {
									integers1[i] = Integer.parseInt(ilsCellDto.getId().toString());
								} else {
									log.info("当前工单：" + data.getWipEntityId() + ",无空闲备盘位");
									msgMap.put("success", "0");
									msgMap.put("msg", "无空闲备盘位,请下架后进行操作");
									noVacancy = true;
								}
							}


						}
					}


				} else if (itemSize <= 27) {
					msgMap.put("success", "0");
					msgMap.put("msg", "大层数工单，暂时不处理");
					// 大层数工单
				}

				if (noVacancy) {
					continue;
				}
				StringBuffer cellstrsrc = new StringBuffer();
				StringBuffer cellstrdst = new StringBuffer();
				jointStr(integers4, integers3, integers2, integers1, cellstrsrc, cellstrdst);
				String cellstrsrcStr = cellstrsrc.substring(0, cellstrsrc.length() - 1);
				String cellstrdstStr = cellstrdst.substring(0, cellstrdst.length() - 1);
				data.setCellnum(lists.size());
				data.setCellids(cellstrsrcStr);
				data.setCellids(cellstrsrcStr);
				List<TaskmesDto> taskmesDtos = taskmesDao.queryPickTask();
				if (EmptyUtils.isEmpty(taskmesDtos)) {
					msgMap.put("success", "0");
					msgMap.put("msg", "当前存在执行的任务。");
					continue;
				}
				TaskmesDto taskmesDto = taskmesDtos.get(0);
				TaskmesDto dto = TaskmesDto.builder()
						.id(taskmesDto.getId())
						.areano(15)
						.action(500)
						.status(10)
						.cellstrsrc(cellstrsrcStr)//小料信息
						.cellstrdst(cellstrdstStr)
						.build();
				dto.setTaskid(uuid);
				msgMap.put("success", "1");
				msgMap.put("msg", "执行成功");
				//修改任务表等待后台拣选
				taskmesDao.updateTaskmes(dto);
				//插入拣选信息 ,状态0 ,拣选完需要修改状态
				woPlanInfoDao.insertWoPlanInfo(data);
				pickRackService.updLayer(integers4, uuid, 4);
				pickRackService.updLayer(integers3, uuid, 3);
				pickRackService.updLayer(integers2, uuid, 2);
				pickRackService.updLayer(integers1, uuid, 1);
			}
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return msgMap;
	}

	/**
	 * 拼接字符串方法
	 *
	 * @param integers4  数组-4
	 * @param integers3  数组-3
	 * @param integers2  数组-2
	 * @param integers1  数组-1
	 * @param cellstrsrc 源字符串
	 * @param cellstrdst 目标字符串
	 */
	private void jointStr(Integer[] integers4, Integer[] integers3, Integer[] integers2, Integer[] integers1, StringBuffer cellstrsrc, StringBuffer cellstrdst) {
		appendStr(integers4, cellstrsrc, cellstrdst, layer4);
		appendStr(integers3, cellstrsrc, cellstrdst, layer3);
		appendStr(integers2, cellstrsrc, cellstrdst, layer2);
		appendStr(integers1, cellstrsrc, cellstrdst, layer1);
	}

	private void appendStr(Integer[] integers, StringBuffer cellstrsrc, StringBuffer cellstrdst, Map<Integer, Integer> layer) {
		if (integers.length == 10) {
			for (int i = 0; i < integers.length; i++) {
				if (integers[i] == 0) {
					continue;
				}
				Integer position = layer.get(i + 1);
				cellstrsrc.append(integers[i]).append(",");
				cellstrdst.append(position).append(",");
			}
		}
	}

	/**
	 * 是否有盘判断
	 *
	 * @param array 数组
	 * @param i     下标
	 * @return 是否
	 */
	private boolean noDish(Integer[] array, int i) {
		return array[i] == 0;
	}

	/**
	 * 查询bom齐套
	 *
	 * @param itemCode 物资编码
	 * @param wipQtyTemp 工单层数
	 * @return 齐套物资集合
	 */
	private List<List<IlsCellDto>> QueryItemBomInfo(String itemCode, Integer wipQtyTemp) {
		List<List<IlsCellDto>> lists = new ArrayList<>();
		try {
			HashMap<String, Object> map = new HashMap<>();
			map.put("organizationId", "142");
			map.put("itemCode", itemCode);
			//根据物资编码获取物资组件信息
			ItemBomInfoDto itemBomInfoDto = httpAPIService.getResultData(queryItemBomInfoUrl, JSONObject.toJSONString(map), ItemBomInfoDto.class);
			List<ItemBomInfoDto.ItemListBean> itemList = itemBomInfoDto.getItemList();
			itemList.sort(Comparator.comparing(ItemBomInfoDto.ItemListBean::getComponentItemCode).reversed());
			itemList = itemList.stream().filter(ItemListBean -> Character.isDigit(ItemListBean.getComponentItemDesc().charAt(ItemListBean.getComponentItemDesc().length() - 1))).collect(Collectors.toList());
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

				//假如不存在对应的内层物资则直接返回
				if (EmptyUtils.isEmpty(ilsCellDtos)) {
					return null;
				}
				tempMap.put(itemListBean.getComponentItemCode(), ilsCellDtos);
			}


			//循环判断是否每一个物资组件数量都满足要求
			tempMap.forEach((key, value) -> {
				List<IlsCellDto> ilsCellDtos = matchData(value,wipQtyTemp);
				if (ilsCellDtos.size() > 0) {
					lists.add(ilsCellDtos);
				}

			});

		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return lists;


	}

	/**
	 * 排序
	 * @param qtyGt 料号相同数据
	 * @param wipQtyTemp 工单层数
	 * @return 料号相同的排序后数据
	 */
	private List<IlsCellDto> matchData(List<IlsCellDto> qtyGt, Integer wipQtyTemp) {
		//List<IlsCellDto> qtyGt = value.stream().filter(ilsCellDto -> ilsCellDto.getPartnum() >= wipQtyTemp).collect(Collectors.toList());
		if (qtyGt.size() > 0) {
			//如果大于两个则按日期逆序排序，如果日期相同则按数量排序
			if (qtyGt.size() >= 2) {
				qtyGt.sort(Comparator.comparing(IlsCellDto::getPartdate));
				List<IlsCellDto> list=new ArrayList<>();
				IlsCellDto ilsCellDto1=qtyGt.get(0);
				IlsCellDto ilsCellDto2=qtyGt.get(1);
				//等于40只拉第一盘作为主盘
				if(ilsCellDto1.getPartnum()==wipQtyTemp){
					list=new ArrayList<>();
					list.add(ilsCellDto1);
					return list;
				}
				if(ilsCellDto1.getPartnum()>wipQtyTemp  &&  (ilsCellDto2.getPartnum()+ilsCellDto1.getPartnum()) <=40 ){
					list.add(ilsCellDto1);
					list.add(ilsCellDto2);
					list.sort(Comparator.comparing(IlsCellDto::getPartdate).reversed());
					return list;
				}else if(ilsCellDto1.getPartnum()>wipQtyTemp){
					list=new ArrayList<>();
					list.add(ilsCellDto1);
					return list;
				}
				list.add(ilsCellDto1);
				list.add(ilsCellDto2);
				list.sort(Comparator.comparing(IlsCellDto::getPartdate).reversed());
				return list;
				/*IlsCellDto ilsCellDto=qtyGt.get(0);
				if(ilsCellDto.getPartnum()>=wipQtyTemp){
					List<IlsCellDto> list=new ArrayList<>();
					list.add(ilsCellDto);
					return list;
				}*/
				//return qtyGt;
				//等于1则直接返回
			} else if (qtyGt.size() == 1) {
				return qtyGt;
			}
		}
		return qtyGt;
	}

	/**
	 * 查询并为临时数组设值
	 * @return 临时数据集
	 */
	private Map<Integer, Integer[]> setInitArrays() {
		List<PickRackDto> pickRack = pickRackService.getPickRack();
		Map<Integer, Integer[]> map = new HashMap<>(4);
		pickRack.forEach(dto -> {
			Integer status = dto.getStatus();
			Integer layer = dto.getLayer();
			Integer[] row = {dto.getCol1(), dto.getCol2(), dto.getCol3(), dto.getCol4(), dto.getCol5(), dto.getCol6(), dto.getCol7(), dto.getCol8(), dto.getCol9()};
			map.put(layer, 0 == status ? new Integer[]{0, 0, 0, 0, 0, 0, 0, 0, 0, 0} : row);
		});
		return map;
	}


}
