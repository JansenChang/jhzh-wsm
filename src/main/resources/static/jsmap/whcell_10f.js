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
	var map_layer_pick;  //拣选区

	localStorage.setItem("CAGE2_1", '');
	localStorage.setItem("CAGE2_2", '');
	localStorage.setItem("CAGE1_1", '');
	localStorage.setItem("CAGE1_2", '');
	localStorage.setItem("piler_1", '');
	localStorage.setItem("piler_2", '');
	localStorage.setItem("piler_3", '');

	function init() {
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
				localStorage.setItem("piler_1", inr[2] + inr[3] + inr[4]);
				localStorage.setItem("piler_2", inr[5] + inr[6] + inr[7]);

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

				var a = [
					[1, 40, 330201, "330201", ".", "rect", 50, 19, 110, 100, null, [inr[82]], color_EA, "pilerSeat"],
					[2, 40, 330202, "330202", ".", "rect", 50, 19, 110, 80, null, [inr[84]], color_EA, "pilerSeat"],
					[3, 40, 330101, "330101", ".", "rect", 50, 19, 60, 100, null, [inr[81]], color_EA, "pilerSeat"],
					[4, 40, 330102, "330102", ".", "rect", 50, 19, 60, 80, null, [inr[83]], color_EA, "pilerSeat"],
					[5, 40, 330201, "330201", "330201", "text", 50, 19, 110, 119, null, [], color_text],
					[6, 40, 330202, "330202", "330202", "text", 50, 19, 110, 60, null, [], color_text],
					[7, 40, 330101, "330101", "330101", "text", 50, 19, 60, 119, null, [], color_text],
					[8, 40, 330102, "330102", "330102", "text", 50, 19, 60, 60, null, [], color_text],
					[9, 40, 160101, "160101", ".", "rect", 100, 19, 600, 119, null, [], color_EA, 'pick'],
					[10, 40, 160102, "160102", ".", "rect", 100, 19, 600, 140, null, [], color_EA, 'pick'],
					[11, 40, 160101, "160101", "160101", "text", 100, 19, 600, 100, null, [], color_text,],
					[12, 40, 160102, "160102", "160102", "text", 100, 19, 600, 160, null, [], color_text],
				]
				$(a).each(function (i, itme) {
					mapnode_pri_10f.push(itme);
				})


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

				var pickList = resul.resultData.var16;
				// 一楼立库
				console.log(pickList)
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

						// 立库
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

						// 拣选台
						if (mapnode_pri_10f[i][13] == 'pick') {

							for (var j = 0; j < pickList.length; j++) {

								if (mapnode_pri_10f[i][3] == pickList[j].name) {
									if (pickList[j].trayno != '000000') {
										if (pickList[j].partwoid > 0) {
											mapnode_pri_10f[i][12] = "#61a51e";
											mapnode_pri_10f[i][11] = pickList[j];
										} else {
											mapnode_pri_10f[i][12] = "#c8deb1";
											mapnode_pri_10f[i][11] = pickList[j];
										}
									}
									// mapnode_pri_10f[i][12] = "#61a51e";
									// mapnode_pri_10f[i][11] = hasMaterial[j];
								}
							}
						}

						// 物流线
						if (mapnode_pri_10f[i][13] == 'pilerSeat') {
							if(mapnode_pri_10f[i][11][0] == '1'){
								mapnode_pri_10f[i][12] = "#c8deb1";
							}
						}


					}
				}

				// var pickList = []
				// for (var i = 0; i < mapnode_pri_pick.length; i++) {
				// 		mapnode_pri_pick[i][12] = "#dfdfe7";
				// 		if(mapnode_pri_pick[i][3]=='160101' || mapnode_pri_pick[i][3]=='160102'){
				// 			if(mapnode_pri_pick[i][13]=='pick'){
				// 				pickList.push(mapnode_pri_pick[i])
				// 			}

				// 		}
				// }
				// $(resul.resultData.var16).each(function (num, itme) {
				// 	if(itme.trayno != '000000'){
				// 		if(itme.partwoid>0){
				// 			pickList[num][12] = "#61a51e";
				// 			pickList[num][11] =itme;
				// 		}else{
				// 			pickList[num][12] = "#c8deb1";
				// 			pickList[num][11] =itme;
				// 		}
				// 	}
				// })
				// console.log(resul.resultData.var16)
				// mapnode_pri_pick = pickList;
			},
			error: function (jqxhr, textStatus, error) {
				console.log(error);

			}

		})




		// 获取静态数??
		create_node(mapnode_pri_10f);
		// create_node(mapnode_pri_pick);  //拣选区

		//使用画图数组(全局变量)，mapclass.js定义??
		map_layer_10f = mapnode_10f;
		// map_layer_pick = mapnode_pick;

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

		x0_hov = 0; y0_hov = 30; w_hov = 0.5 * w_max; h_hov = 0.6 * h_max;
		x0_10f = 0; y0_10f = y0_hov + 180; w_10f = 0.7 * w_max; h_10f = 1 * h_max;
		x0_pick = 850; y0_pick = 370; w_pick = 1 * w_max; h_pick = 0.6 * h_max;

	}



	// 1楼立库
	function draw_10f(x0, y0, w, h, draw) {
		var w_ratio = w / 680;
		var h_ratio = h / 600;

		for (j = 0, len = map_layer_10f.length; j < len; j++)
			map_layer_10f[j].update_whxy(w, h, x0, y0, w_ratio, h_ratio);
		for (j = 0, len = map_layer_10f.length; j < len; j++)
			map_layer_10f[j].draw(draw);
	}

	//夹层拣选
	// function draw_pick(x0, y0, w, h, draw) {
	// 	var w_ratio = w / 1600;
	// 	var h_ratio = h / 1080;
	// 	for (j = 0, len = map_layer_pick.length; j < len; j++)
	// 		map_layer_pick[j].update_whxy(w, h, x0, y0, w_ratio, h_ratio);
	// 	for (j = 0, len = map_layer_pick.length; j < len; j++)
	// 		map_layer_pick[j].draw(draw);
	// }

	function draw_all() {
		draw_10f(x0_10f, y0_10f, w_10f, h_10f, svgdraw);
		// draw_pick(x0_pick, y0_pick, w_pick, h_pick, svgdraw);
	}
	init();
	draw_all();
	intervalId = setInterval(function () {
	init();
	draw_all();
	}, 2000);
})