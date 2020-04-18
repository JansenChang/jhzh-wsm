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

	var map_layer_15f;
	var map_layer_road;
	var map_layer_agv;


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
				var agvnew=[];
				$(agvold).each(function(i,itme){
					var b = [itme[0].substring(0,itme[0].length-4),itme[1]]
					agvnew.push(b)
				});

				var agvXY = [];
				for (var i = 0; i < mapnode_pri_road.length; i++) {
					for (var j = 0; j < agvnew.length; j++) {
						if (mapnode_pri_road[i][3] == agvnew[j][0]) {
							var a = [mapnode_pri_road[i][8], mapnode_pri_road[i][9], agvnew[j][1]];
							agvXY.push(a)
						}
					}
				}
				for (var i = 0; i < mapnode_pri_agv.length; i++) {
					for (var j = 0; j < agvXY.length; j++) {
						if (i == j) {
							mapnode_pri_agv[i][8] = agvXY[j][0];
							mapnode_pri_agv[i][9] = agvXY[j][1];
							mapnode_pri_agv[i][11] = agvXY[j][2];
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
			url: url+"/wms/dynamicRepertroyInterlayer",
			contentType: "application/json;charset=utf-8",
			dataType: "JSON",
			async: false,
			data: '',
			success: function (resul) {
				var list=resul.resultData;
				for (var i = 0; i < mapnode_pri_15f.length; i++) {
					if(mapnode_pri_15f[i][13]=='cabinet'){
						for (var j = 0; j < list.length; j++) {
							if(mapnode_pri_15f[i][3]==list[j]){
								mapnode_pri_15f[i][12]="#61a51e";
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
		create_node(mapnode_pri_15f);
		create_node(mapnode_pri_road);
		create_node(mapnode_pri_agv);

		//使用画图数组(全局变量)，mapclass.js定义??
		map_layer_15f = mapnode_15f;
		map_layer_road = mapnode_road;
		map_layer_agv = mapnode_agv;

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
		x0_15f = 20; y0_15f = 30; w_15f = 0.9 * w_max; h_15f = 1 * h_max;
		x0_pick = 720; y0_pick = h_15f + 32; w_pick = 0.5 * w_max; h_pick = 0.6 * h_max;

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




	function draw_all() {
		draw_15f(x0_15f, y0_15f, w_15f, h_15f, svgdraw);
	}
	intervalId = setInterval(function () {
		init();
		draw_all();
	}, 2000);
})