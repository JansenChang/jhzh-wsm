$(function () {
	var svgdivid;
	var svgdiv;
	var svgdraw; //object
	var w_max, h_max;

	var w_10f, h_10f, x0_10f, y0_10f;
	var w_15f, h_15f, x0_15f, y0_15f;
	//var w_20f,h_20f;

	var x0_hov, y0_hov;

	var map_layer_10f;

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
			url: url+"/wms/infonews",
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

				var pilerPresent1='-',pilerPresent2='-',pilerPresent3='-';
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
				
			},
			error: function (jqxhr, textStatus, error) {
				console.log(error);

			}

		})
		var dynamicRepertroy={
			"areano":10
		}
		$.ajax({
			type: "POST",
			url: url+"/wms/dynamicRepertroy",
			contentType: "application/json;charset=utf-8",
			dataType: "JSON",
			async: false,
			data: JSON.stringify(dynamicRepertroy),
			success: function (resul) {
				var hasMaterial=[];
				var hasTrayno=[];
				$(resul.resultData).each(function(num,itme){
					if(itme.partnum>0){
						hasMaterial.push(itme);
					}
					if(itme.trayno !='000000' && itme.partnum<1){
						hasTrayno.push(itme);
					}
				})
				for (var i = 0; i < mapnode_pri_10f.length; i++) {
					if(mapnode_pri_10f[i][13]=='pilerSeat'){
						for (var j = 0; j < hasMaterial.length; j++) {
							if(mapnode_pri_10f[i][3]==hasMaterial[j].name){
								mapnode_pri_10f[i][12]="#61a51e";
								mapnode_pri_10f[i][11]=hasMaterial[j];
							}
						}

						for (var j = 0; j < hasTrayno.length; j++) {
							if(mapnode_pri_10f[i][3]==hasTrayno[j].name){
								mapnode_pri_10f[i][12]="#7c9266";
								mapnode_pri_10f[i][11]=hasTrayno[j];
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

		//使用画图数组(全局变量)，mapclass.js定义??
		map_layer_10f = mapnode_10f;

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
		x0_10f = 20; y0_10f = y0_hov+200; w_10f = 1 * w_max; h_10f = 1 * h_max;

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



	function draw_all() {
		draw_10f(x0_10f, y0_10f, w_10f, h_10f, svgdraw);
	}
	intervalId = setInterval(function () {
		init();
		draw_all();
	}, 2000);
})