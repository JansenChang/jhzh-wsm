
$(function () {
	var svgdivid;
	var svgdiv;
	var svgdraw; //object
	var w_max, h_max;

	var w_10f, h_10f, x0_10f, y0_10f;
	var w_15f, h_15f, x0_15f, y0_15f;
	//var w_20f,h_20f;

	var x0_hov, y0_hov;
	var x0_pick, y0_pick;  //拣选区

	var map_layer_10f;
	var map_layer_hov;
	var map_layer_15f;
	var map_layer_road;
	var map_layer_agv;
	var map_layer_srm;
	var map_layer_pick;  //拣选区
	var arrList;
	var color;

	localStorage.setItem("CAGE2_1", '');
	localStorage.setItem("CAGE2_2", '');
	localStorage.setItem("CAGE1_1", '');
	localStorage.setItem("CAGE1_2", '');
	localStorage.setItem("piler_1", '');
	localStorage.setItem("piler_2", '');
	localStorage.setItem("piler_3", '');

	function init() {
		$.ajax({
			type: "POST",
			url: url + "/wms/wcsMsg",
			contentType: "application/json;charset=utf-8",
			dataType: "JSON",
			async: false,
			data: "",
			success: function (resul) {
				var html = '';
				var list = resul.resultData.list;
				if (list.length > 0) {
					$(list).each(function (i, item) {
						html += '<span style="margin:0 20px">操作人员：' + item.uid + ',' + item.act + '报错：' + item.msg + '  ' + item.atrec + '</span> '
					})
					$('.text_box').empty().html(html);
				}

			}
		})

		$.ajax({
			type: "GET",
			url: url + "/wms/infonews",
			contentType: "application/json;charset=utf-8",
			dataType: "JSON",
			async: false,
			data: "",
			success: function (resul) {
				var inr = (resul.resultData).split(',');
				localStorage.setItem("CAGE2_1", inr[52]);
				localStorage.setItem("CAGE2_2", inr[53]);
				localStorage.setItem("CAGE1_1", inr[98]);
				localStorage.setItem("CAGE1_2", inr[99]);
				var pilerPresent1 = '-', pilerPresent2 = '-', pilerPresent3 = '-';
				// 堆垛机出库行列层
				if (inr[5] != 0 && inr[6] != 0 && inr[7] != 0) {
					if (inr[7] < 10) {
						pilerPresent1 = '3' + inr[5] + '0' + inr[6] + '0' + inr[7]
					} else {
						pilerPresent1 = '3' + inr[5] + '0' + inr[6] + inr[7]
					}
					localStorage.setItem("piler_2", pilerPresent);
				}
				// 堆垛机入库行列层
				if (inr[2] != 0 && inr[3] != 0 && inr[4] != 0) {
					if (inr[4] < 10) {
						pilerPresent2 = '3' + inr[2] + '0' + inr[3] + '0' + inr[4]
					} else {
						pilerPresent2 = '3' + inr[2] + '0' + inr[3] + inr[4]
					}
					localStorage.setItem("piler_1", pilerPresent2);
				}
				// // 堆垛机当前位置行列层
				if (inr[13] != 0 && inr[14] != 0 && inr[15] != 0) {
					if (inr[15] < 10) {
						pilerPresent3 = '3' + inr[13] + '0' + inr[14] + '0' + inr[15]
					} else {
						pilerPresent3 = '3' + inr[13] + '0' + inr[14] + inr[15]
					}
					localStorage.setItem("piler_3", pilerPresent3);
				}

				// 堆垛机 |模式，0未选择，1手动，2自动，3联机自| |类型| |故障代码| |取货号站台号| |入库号| |出库| |任务号| |当前位置| |位移|
				mapnode_pri_10f[0][11] = [inr[12], inr[1], inr[16], inr[8], pilerPresent1, pilerPresent2, inr[0], pilerPresent3, inr[3], inr[6], inr[14]];

				// 短吊笼
				var CAGE2 = [inr[30], inr[29], inr[31], inr[32], inr[51], inr[52], inr[53], inr[54], inr[55], inr[56]];



				// 长吊笼
				var CAGE1 = [inr[64], inr[63], inr[65], inr[66], inr[97], inr[98], inr[99], inr[100], inr[101], inr[102]];



				var conveyorList = [
					[inr[41], inr[45], inr[49], inr[59]],//CAGE2_conveyor_220102
					[inr[42], inr[46], inr[50], inr[60], inr[128]],//CAGE2_conveyor_220202
					[inr[39], inr[43], inr[47], inr[57]],//CAGE2_conveyor_220101
					[inr[40], inr[44], inr[48], inr[58], inr[127]],//CAGE2_conveyor_220201
					[inr[79], inr[87], inr[95], inr[109]],//CAGE1_conveyor_210102
					[inr[80], inr[88], inr[110], inr[96], inr[130]],//CAGE1_conveyor_210202
					[inr[77], inr[85], inr[93], inr[107]],//CAGE1_conveyor_210101
					[inr[78], inr[86], inr[94], inr[108], inr[129]],//CAGE1_conveyor_210201
					[inr[75], inr[83], inr[91], inr[105]],//CAGE1_conveyor_330102
					[inr[76], inr[84], inr[92], inr[106]],//CAGE1_conveyor_330202
					[inr[73], inr[81], inr[89], inr[103]],//CAGE1_conveyor_330101
					[inr[74], inr[82], inr[90], inr[104]]//CAGE1_conveyor_330201
				]
				var conveyorListA = [
					[inr[33], inr[34], inr[35], inr[61]],//CAGE2_conveyor_240102
					[inr[36], inr[37], inr[38], inr[62]],//CAGE2_conveyor_240101
					[inr[67], inr[68], inr[69], inr[111]],//CAGE1_conveyor_230102
					[inr[70], inr[71], inr[71], inr[112]]//CAGE1_conveyor_230101
				]


				// var traynoList = [
				// 	inr[118],
				// 	inr[117],
				// 	inr[116],
				// 	inr[115],
				// 	inr[114],
				// 	inr[113],
				// 	inr[125],
				// 	inr[124],
				// 	inr[123],
				// 	inr[122],
				// 	inr[121],
				// 	inr[120]
				// ];

				var traynoList = [
					inr[200],
					inr[199],
					inr[198],
					inr[197],
					inr[196],
					inr[195],
					inr[193],
					inr[192],
					inr[191],
					inr[190],
					inr[189],
					inr[188]
				];

				var agvold = [
					[inr[141], inr[161]],
					[inr[142], inr[162]],
					[inr[143], inr[163]],
					[inr[144], inr[164]],
					[inr[145], inr[165]],
					[inr[146], inr[166]],
					[inr[147], inr[167]],
					[inr[148], inr[168]],
					[inr[149], inr[169]],
					[inr[150], inr[170]],
				];
				// var agvold = [inr[141],inr[142],inr[143],inr[144],inr[145],inr[146],inr[147],inr[148],inr[149],inr[150]]
				// var agvnew = [[517, 1], [605, 0], [718, 3], [507, 4]]
				var agvnew = [];
				$(agvold).each(function (i, itme) {
					var b = [itme[0].substring(0, itme[0].length - 5), itme[1],itme[0].substr(itme[0].length-1,1)]
					agvnew.push(b)
				});
				//3对应单数，1对应双数
				// return
				var agvXY = [];
				for (var i = 0; i < mapnode_pri_road.length; i++) {
					for (var j = 0; j < agvnew.length; j++) {
						if (mapnode_pri_road[i][3] == agvnew[j][0]) {
							var a = [mapnode_pri_road[i][8], mapnode_pri_road[i][9], agvnew[j][1],agvnew[j][2]];
							agvXY.push(a)
						}
					}
				}
						

				// for (var i = 0; i < mapnode_pri_15f.length; i++) {
				// 	for (var j = 0; j < agvnew.length; j++) {
				// 		// if (mapnode_pri_15f[i][3] == agvnew[j][0]) {
				// 			var onum=mapnode_pri_15f[i][3].split('');
				// 				if(onum[0]==0){
				// 					var num = parseInt(onum[1]);
				// 				}else{
				// 					var num = parseInt(onum[0]+onum[1])
				// 				}
				// 				console.log(agvnew[j][2]);
				// 			if(agvnew[j][2]=='3'){
				// 				if(num%2==0){
				// 					console.log(num,mapnode_pri_15f[i]);
				// 				}else{

				// 				}
				// 			}
				// 			// var a = [mapnode_pri_road[i][8], mapnode_pri_road[i][9], agvnew[j][1]];
				// 			// agvXY.push(a)
				// 		// }
				// 	}
				// }

				
				for (var i = 0; i < mapnode_pri_agv.length; i++) {
					for (var j = 0; j < agvXY.length; j++) {
						if (i == j) {
							mapnode_pri_agv[i][8] = agvXY[j][0];
							mapnode_pri_agv[i][9] = agvXY[j][1];
							mapnode_pri_agv[i][11] = agvXY[j][2];
							// console.log(mapnode_pri_agv[i][8],mapnode_pri_agv[i][9])
						}
					}
				}
				var a = 0, b = 0, c = 0, d = 0, e = 0;
				// 吊机
				for (var i = 0; i < mapnode_pri_hov.length; i++) {
					if (mapnode_pri_hov[i][5] == 'rect') {
						// 盘号
						if (mapnode_pri_hov[i][13] == 'trayno') {
							mapnode_pri_hov[i][11] = traynoList[a]
							a++
						}
						if (mapnode_pri_hov[i][13] == 'conveyor') {
							mapnode_pri_hov[i][11] = conveyorList[b];
							b++
							if (mapnode_pri_hov[i][11][1] == 1) {
								mapnode_pri_hov[i][12] = "#c8deb1";
							}
						}
						if (mapnode_pri_hov[i][13] == 'conveyor_#') {

							mapnode_pri_hov[i][11] = conveyorListA[c];
							c++;
						}
						if (mapnode_pri_hov[i][13] == '1#') {
							mapnode_pri_hov[i][11] = CAGE1
						}
						if (mapnode_pri_hov[i][13] == '2#') {
							mapnode_pri_hov[i][11] = CAGE2
						}

					}
				}

			},
			error: function (jqxhr, textStatus, error) {
				console.log(error);

			}

		})


		$.ajax({
			type: "POST",
			url: url + "/wms/dynamicRepertroy",
			contentType: "application/json;charset=utf-8",
			dataType: "JSON",
			async: false,
			data: "",
			success: function (resul) {

				// 一楼立库
				if (resul.resultData.var10) {
					var hasMaterial = [];
					var hasTrayno = [];
					$(resul.resultData.var10).each(function (num, itme) {
						if (itme.partnum > 0) {
							hasMaterial.push(itme);
						}
						if (itme.trayno != '000000' && itme.partnum < 1) {
							hasTrayno.push(itme);
						}
					})

					for (var i = 0; i < mapnode_pri_10f.length; i++) {

						mapnode_pri_10f[i][12] = "#dfdfe7";

						if (mapnode_pri_10f[i][13] == 'pilerSeat') {
							for (var j = 0; j < hasMaterial.length; j++) {
								if (mapnode_pri_10f[i][3] == hasMaterial[j].name) {
									mapnode_pri_10f[i][12] = "#61a51e";
									mapnode_pri_10f[i][11] = hasMaterial[j];
								}
							}
							for (var j = 0; j < hasTrayno.length; j++) {
								if (mapnode_pri_10f[i][3] == hasTrayno[j].name) {
									mapnode_pri_10f[i][12] = "#c8deb1";
									mapnode_pri_10f[i][11] = hasTrayno[j];
								}
							}
						}

					}
				}


				// 大托盘
				var upstair = resul.resultData.var25;
				$(resul.resultData.var26).each(function (i, itme) {
					upstair.push(itme);
				})

				if (upstair) {
					var hasMaterial_25 = [];
					var hasTrayno_26 = [];
					$(upstair).each(function (num, itme) {
						// if (itme.partwoid > 0) {
						// 	hasMaterial_25.push(itme);
						// }
						if (itme.trayno != '000000') {
							if (itme.partwoid != 0 && itme.partwoid) {
								hasMaterial_25.push(itme);
							} else {
								hasTrayno_26.push(itme);
							}

						}
					})

					for (var i = 0; i < mapnode_pri_hov.length; i++) {
						if (mapnode_pri_hov[i][13] == 'trayno') {
							if (mapnode_pri_hov[i][11] == 0) {
								mapnode_pri_hov[i][12] = "#dfdfe7";

							} else {
								mapnode_pri_hov[i][12] = "#c8deb1";
								for (var j = 0; j < hasMaterial_25.length; j++) {
									if (mapnode_pri_hov[i][3] == hasMaterial_25[j].name) {
										mapnode_pri_hov[i][12] = "#61a51e";
										mapnode_pri_hov[i][11] = hasMaterial_25[j];
									}
								}
								// for (var j = 0; j < hasTrayno_26.length; j++) {
								// 	if (mapnode_pri_hov[i][3] == hasTrayno_26[j].name) {
								// 		mapnode_pri_hov[i][12] = "#c8deb1";
								// 		mapnode_pri_hov[i][11] = hasTrayno_26[j];
								// 		console.log(mapnode_pri_hov[i],hasTrayno_26[j],mapnode_pri_hov[i][3] == hasTrayno_26[j].name)
								// 	}
								// }
							}


						}

					}
				}


				// 拣选架
				var pickList = resul.resultData.var17;
				$(resul.resultData.var16).each(function (i, itme) {
					pickList.push(itme);
				})
				if (pickList) {
					var hasMaterial_17 = [];
					var hasTrayno_17 = [];
					$(pickList).each(function (num, itme) {
						if (itme.partwoid > 0) {
							hasMaterial_17.push(itme);
						}
						if (itme.trayno != '000000' && itme.partwoid < 1) {
							hasTrayno_17.push(itme);
						}
					})

					for (var i = 0; i < mapnode_pri_pick.length; i++) {
						mapnode_pri_pick[i][12] = "#dfdfe7";
						if (mapnode_pri_pick[i][13] == 'pick') {
							for (var j = 0; j < hasMaterial_17.length; j++) {
								if (mapnode_pri_pick[i][3] == hasMaterial_17[j].name) {
									mapnode_pri_pick[i][12] = "#61a51e";
									mapnode_pri_pick[i][11] = hasMaterial_17[j];
									console.log(mapnode_pri_pick[i])
								}
							}
							for (var j = 0; j < hasTrayno_17.length; j++) {
								if (mapnode_pri_pick[i][3] == hasTrayno_17[j].name) {
									mapnode_pri_pick[i][12] = "#c8deb1";
									mapnode_pri_pick[i][11] = hasTrayno_17[j];
								}
							}
						}

					}
				}


				// 虚仓
				var wasteList = resul.resultData.var18;
				$(resul.resultData.var19).each(function (i, itme) {
					wasteList.push(itme);
				})

				if (wasteList) {
					var hasMaterial_18 = [];
					var hasTrayno_18 = [];
					$(wasteList).each(function (num, itme) {
						if (itme.partnum > 0) {
							hasMaterial_18.push(itme);
						}
						if (itme.trayno != '000000' && itme.partnum < 1) {
							hasTrayno_18.push(itme);
						}
					})
					for (var i = 0; i < mapnode_pri_pick.length; i++) {
						if (mapnode_pri_pick[i][13] == 'waste') {
							for (var j = 0; j < hasMaterial_18.length; j++) {
								if (mapnode_pri_pick[i][3] == hasMaterial_18[j].name) {
									mapnode_pri_pick[i][12] = "#61a51e";
									mapnode_pri_pick[i][11] = hasMaterial_18[j];
								}
							}
							for (var j = 0; j < hasTrayno_18.length; j++) {
								if (mapnode_pri_pick[i][3] == hasTrayno_18[j].name) {
									mapnode_pri_pick[i][12] = "#c8deb1";
									mapnode_pri_pick[i][11] = hasTrayno_18[j];
								}
							}
						}

					}
				}


			},
			error: function (jqxhr, textStatus, error) {
				console.log(error);

			}

		})


		$.ajax({
			type: "POST",
			url: url + "/wms/dynamicRepertroyInterlayer",
			contentType: "application/json;charset=utf-8",
			dataType: "JSON",
			async: false,
			data: '',
			success: function (resul) {
				var list = resul.resultData;
				for (var i = 0; i < mapnode_pri_15f.length; i++) {
					mapnode_pri_15f[i][12] = "#dfdfe7";
					if (mapnode_pri_15f[i][13] == 'cabinet') {
						for (var j = 0; j < list.length; j++) {
							if (mapnode_pri_15f[i][3] == list[j]) {
								mapnode_pri_15f[i][12] = "#61a51e";
							}
						}

					}

				}
			},
			error: function (jqxhr, textStatus, error) {
				console.log(error);

			}

		})


		// 获取静态数??
		create_node(mapnode_pri_10f);
		create_node(mapnode_pri_hov);
		create_node(mapnode_pri_15f);
		create_node(mapnode_pri_road);
		create_node(mapnode_pri_agv);
		create_node(mapnode_pri_srm);
		create_node(mapnode_pri_pick);  //拣选区

		//使用画图数组(全局变量)，mapclass.js定义??
		map_layer_10f = mapnode_10f;
		map_layer_hov = mapnode_hov;
		map_layer_15f = mapnode_15f;
		map_layer_road = mapnode_road;
		map_layer_agv = mapnode_agv;
		map_layer_srm = mapnode_srm;
		map_layer_pick = mapnode_pick;

		// 获取图画区域id
		svgdivid = "drawing";
		drawdiv = document.getElementById(svgdivid);

		var boxdiv = document.getElementById("box");
		var boxheight = boxdiv.clientHeight + drawdiv.offsetHeight;
		if (drawdiv == null)
			return; //不存在该图层，绘图失??
		drawdiv.innerHTML = ""; //clean svg content

		// 绘制一个黑色的方形，宽高和图画区一??
		w_max = drawdiv.clientWidth || drawdiv.offsetWidth;
		h_max = drawdiv.clientHeight || drawdiv.offsetHeight;
		svgdraw = SVG(svgdivid).size(w_max, h_max);
		var rect = svgdraw.rect(w_max, h_max).attr({ fill: '#27282f' });

		x0_hov = 20; y0_hov = 30; w_hov = 0.5 * w_max; h_hov = 0.6 * h_max;
		x0_10f = 10; y0_10f = h_hov - 10; w_10f = 0.5 * w_max; h_10f = 0.6 * h_max;
		x0_15f = 720; y0_15f = 30; w_15f = 0.5 * w_max; h_15f = 0.5 * h_max;
		x0_pick = 720; y0_pick = h_15f + 32; w_pick = 0.5 * w_max; h_pick = 0.6 * h_max;

	}

	// 夹层立库
	function draw_hov(x0, y0, w, h, draw) {
		var w_ratio = w / 600;
		var h_ratio = h / 680;
		for (j = 0, len = map_layer_hov.length; j < len; j++)
			map_layer_hov[j].update_whxy(w, h, x0, y0, w_ratio, h_ratio);//更新数据??

		for (j = 0, len = map_layer_hov.length; j < len; j++) {
			map_layer_hov[j].draw(draw);
		}

	}

	// 1楼立库
	function draw_10f(x0, y0, w, h, draw) {
		var w_ratio = w / 680;
		var h_ratio = h / 600;

		for (j = 0, len = map_layer_10f.length; j < len; j++)
			map_layer_10f[j].update_whxy(w, h, x0, y0, w_ratio, h_ratio);
		for (j = 0, len = map_layer_10f.length; j < len; j++)
			map_layer_10f[j].draw(draw);
		for (j = 0, len = map_layer_srm.length; j < len; j++)
			map_layer_srm[j].update_whxy(w, h, x0, y0, w_ratio, h_ratio);
		for (j = 0, len = map_layer_srm.length; j < len; j++)
			map_layer_srm[j].draw(draw);
	}

	function draw_15f(x0, y0, w, h, draw) {
		var w_ratio = w / 1600;
		var h_ratio = h / 1080;
		for (j = 0, len = map_layer_15f.length; j < len; j++)
			map_layer_15f[j].update_whxy(w, h, x0, y0, w_ratio, h_ratio);
		for (j = 0, len = map_layer_15f.length; j < len; j++)
			map_layer_15f[j].draw(draw);
		for (j = 0, len = map_layer_road.length; j < len; j++)
			map_layer_road[j].update_whxy(w, h, x0, y0, w_ratio, h_ratio);
		for (j = 0, len = map_layer_road.length; j < len; j++)
			map_layer_road[j].draw(draw);
		for (j = 0, len = map_layer_agv.length; j < len; j++)
			map_layer_agv[j].update_whxy(w, h, x0, y0, w_ratio, h_ratio);
		for (j = 0, len = map_layer_agv.length; j < len; j++)
			map_layer_agv[j].draw(draw);
	}

	//夹层拣选
	function draw_pick(x0, y0, w, h, draw) {
		var w_ratio = w / 1600;
		var h_ratio = h / 1080;
		for (j = 0, len = map_layer_pick.length; j < len; j++)
			map_layer_pick[j].update_whxy(w, h, x0, y0, w_ratio, h_ratio);
		for (j = 0, len = map_layer_pick.length; j < len; j++)
			map_layer_pick[j].draw(draw);
	}


	function draw_all() {
		draw_15f(x0_15f, y0_15f, w_15f, h_15f, svgdraw);
		draw_10f(x0_10f, y0_10f, w_10f, h_10f, svgdraw);
		draw_hov(x0_hov, y0_hov, w_hov, h_hov, svgdraw);
		draw_pick(x0_pick, y0_pick, w_pick, h_pick, svgdraw);
	}
	intervalId = setInterval(function () {
	init();
	draw_all();
	}, 2000);
})