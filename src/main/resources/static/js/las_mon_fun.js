function las_partnum_add(i){
	var arg="p"+i+"_id_partnum";
	if(Number(document.getElementById(arg).innerText)+1>40)
		return ;
	var p=document.getElementById(arg).innerText; 
	document.getElementById(arg).innerText = Number(document.getElementById(arg).innerText)+1; 
}

function las_partnum_sub(i){
	var arg="p"+i+"_id_partnum";
	if(Number(document.getElementById(arg).innerText)-1<0)
		return ;
	var p=document.getElementById(arg).innerText; 
	document.getElementById(arg).innerText = Number(document.getElementById(arg).innerText)-1; 
}

function las_plannum_set(plannum){  //设置料数--计划数
	var p=document.getElementById("p1_id_partnum").innerText;
	var n=p*1;//第一种，如果有别的字符串就会弹出NaN
	var n1=Number(p);//依旧会跳出NaN
	n1=plannum;
	document.getElementById("p1_id_plannum").innerText = n1;
}

function las_traynum_set(traynum){  //设置盘数
	var p=document.getElementById("p1_id_traynum").innerText;
	var n=p*1;//第一种，如果有别的字符串就会弹出NaN
	var n1=Number(p);//依旧会跳出NaN
	n1=traynum;
	document.getElementById("p1_id_traynum").innerText = n1;
}

function las_mesgo(mesid){//  
	//如果没有填写  锁定库位信息， 告诉由系统自动分配库位
	//系统自动填写MES信息，目前是自动的

	$.ajax({  
		type : "get", //使用get方法访问后台        
		url : "/yxpower/ajax",		
		dataType : "html",  			
		data : "a=las_mesgo&id="+mesid    , //要发送的参数  
		async : false,//同步调用   			
		success : function(msg) {
			alert("已发送指令");
		}
	});
}


function las_pick(mesid,action){// 上架 

	if(mesid==IDX_MES_CTO){//空盘出库
		p_cellid = $('input[type="radio"][name="p1_name_cellid"]:checked').val(); // 获取一组radio被选中项的值  	
		p_partnum = 0;//Number(document.getElementById("p1_id_partnum").innerText*1);
		p_partid=0;//$("#p1_id_partid").val(); 
		p_partwoid=0;//$("#p1_id_partid").val(); 
	}
	else
	if(mesid==IDX_MES_CPI){//料盘入库
		p_cellid = $('input[type="radio"][name="p1_name_cellid"]:checked').val(); // 获取一组radio被选中项的值  	
		p_partnum = Number(document.getElementById("p1_id_partnum").innerText*1);
		p_partid=$("#p1_id_partid").val(); 
		p_partwoid=$("#p1_id_partwoid").val(); 
	}
	else
	if(mesid==IDX_MES_B1PO && action==WMS_ACTION_PARTOUT){//上架
		p_cellid = 0;
		p_partnum = 0;//Number(document.getElementById("p1_id_partnum").innerText*1);
		p_partid=0;//$("#p1_id_partid").val(); 
		p_partwoid=0;//$("#p1_id_partid").val(); 
	}
	else
	if(mesid==IDX_MES_B1PO && action==WMS_ACTION_TRAYIN){//下架
		p_cellid = 0;
		p_partnum = 0;//Number(document.getElementById("p1_id_partnum").innerText*1);
		p_partid=0;//$("#p1_id_partid").val(); 
		p_partwoid=0;//$("#p1_id_partid").val(); 
	}
	else
	if(mesid==IDX_MES_B2PO){//二检
	}
	else
	if(mesid==IDX_MES_B3PO){//三拣
	}
	else{
		alert("error");
		return ;
	}
	
	$.ajax({  
		type : "get", //使用get方法访问后台        
		url : "/yxpower/ajax",		
		dataType : "html",  			
		data : "a=las_pick&mesid="+mesid +"&action="+action +"&cellid="+p_cellid+"&partid="+p_partid+"&partnum="+p_partnum+ "&partwoid="+p_partwoid  , //要发送的参数  
		async : false,//同步调用   			
		success : function(msg) {
			alert("已发送指令");
		}
	});
}

function las_sys(obj){	//  手工调试
	$.ajax({  
		type : "get", //使用get方法访问后台        
		url : "/yxpower/ajax",		
		dataType : "html",  			
		data : "a=las_sys&obj="+obj, //要发送的参数  
		async : false,//同步调用   			
		success : function(msg) {
			//$("#patinfo").val(msg); 
			//getlistjust(15);
			alert("已发送指令");
		}
	});
}




function las_go(){	//  手工调试

	go_devid = $('input[type="radio"][name="go_name_devid"]:checked').val(); // 获取一组radio被选中项的值  	
	go_cmdtype = $('input[type="radio"][name="go_name_cmdtype"]:checked').val(); // 获取一组radio被选中项的值  	
	go_cellidsrc=$("#go_id_cellidsrc").val(); 
	go_celliddst=$("#go_id_celliddst").val(); 

	$.ajax({  
		type : "get", //使用get方法访问后台        
		url : "/yxpower/ajax",		
		dataType : "html",  			
		data : "a=las_go&devid="+go_devid+"&cmdtype="+go_cmdtype+"&cellidsrc="+go_cellidsrc+"&celliddst="+go_celliddst, //要发送的参数  
		async : false,//同步调用   			
		success : function(msg) {
			//$("#patinfo").val(msg); 
			//getlistjust(15);
			alert("已发送指令");
		}
	});
}

function las_bind(){	//  

	bind_cellid=$("#bind_id_cellid").val(); 
	bind_trayid=$("#bind_id_trayid").val(); 
	bind_partid=$("#bind_id_partid").val(); 
	bind_partdesc=$("#bind_id_partdesc").val(); 
	if(checksum(bind_partdesc)>=32)  //字符串截断
		bind_partdesc.substr(0,30);
	
	bind_partnum=$("#bind_id_partnum").val(); 
	bind_partwoid=$("#bind_id_partwoid").val(); 
	bind_partlotid=$("#bind_id_partlotid").val(); 

	$.ajax({  
		type : "get", //使用get方法访问后台        
		url : "/yxpower/ajax",		
		dataType : "html",  			
		data : "a=las_bind&cellid="+bind_cellid+"&trayid="+bind_trayid+"&partid="+bind_partid+"&partdesc="+bind_partdesc    +"&partnum="+bind_partnum   +"&partwoid="+bind_partwoid+"&partlotid="+bind_partlotid     , //要发送的参数  
		async : false,//同步调用   			
		success : function(msg) {
			//$("#patinfo").val(msg); 
			//getlistjust(15);
			alert("已发送指令");
		}
	});
}
