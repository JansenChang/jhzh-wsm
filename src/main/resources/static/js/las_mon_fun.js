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

function las_plannum_set(plannum){  //��������--�ƻ���
	var p=document.getElementById("p1_id_partnum").innerText;
	var n=p*1;//��һ�֣�����б���ַ����ͻᵯ��NaN
	var n1=Number(p);//���ɻ�����NaN
	n1=plannum;
	document.getElementById("p1_id_plannum").innerText = n1;
}

function las_traynum_set(traynum){  //��������
	var p=document.getElementById("p1_id_traynum").innerText;
	var n=p*1;//��һ�֣�����б���ַ����ͻᵯ��NaN
	var n1=Number(p);//���ɻ�����NaN
	n1=traynum;
	document.getElementById("p1_id_traynum").innerText = n1;
}

function las_mesgo(mesid){//  
	//���û����д  ������λ��Ϣ�� ������ϵͳ�Զ������λ
	//ϵͳ�Զ���дMES��Ϣ��Ŀǰ���Զ���

	$.ajax({  
		type : "get", //ʹ��get�������ʺ�̨        
		url : "/yxpower/ajax",		
		dataType : "html",  			
		data : "a=las_mesgo&id="+mesid    , //Ҫ���͵Ĳ���  
		async : false,//ͬ������   			
		success : function(msg) {
			alert("�ѷ���ָ��");
		}
	});
}


function las_pick(mesid,action){// �ϼ� 

	if(mesid==IDX_MES_CTO){//���̳���
		p_cellid = $('input[type="radio"][name="p1_name_cellid"]:checked').val(); // ��ȡһ��radio��ѡ�����ֵ  	
		p_partnum = 0;//Number(document.getElementById("p1_id_partnum").innerText*1);
		p_partid=0;//$("#p1_id_partid").val(); 
		p_partwoid=0;//$("#p1_id_partid").val(); 
	}
	else
	if(mesid==IDX_MES_CPI){//�������
		p_cellid = $('input[type="radio"][name="p1_name_cellid"]:checked').val(); // ��ȡһ��radio��ѡ�����ֵ  	
		p_partnum = Number(document.getElementById("p1_id_partnum").innerText*1);
		p_partid=$("#p1_id_partid").val(); 
		p_partwoid=$("#p1_id_partwoid").val(); 
	}
	else
	if(mesid==IDX_MES_B1PO && action==WMS_ACTION_PARTOUT){//�ϼ�
		p_cellid = 0;
		p_partnum = 0;//Number(document.getElementById("p1_id_partnum").innerText*1);
		p_partid=0;//$("#p1_id_partid").val(); 
		p_partwoid=0;//$("#p1_id_partid").val(); 
	}
	else
	if(mesid==IDX_MES_B1PO && action==WMS_ACTION_TRAYIN){//�¼�
		p_cellid = 0;
		p_partnum = 0;//Number(document.getElementById("p1_id_partnum").innerText*1);
		p_partid=0;//$("#p1_id_partid").val(); 
		p_partwoid=0;//$("#p1_id_partid").val(); 
	}
	else
	if(mesid==IDX_MES_B2PO){//����
	}
	else
	if(mesid==IDX_MES_B3PO){//����
	}
	else{
		alert("error");
		return ;
	}
	
	$.ajax({  
		type : "get", //ʹ��get�������ʺ�̨        
		url : "/yxpower/ajax",		
		dataType : "html",  			
		data : "a=las_pick&mesid="+mesid +"&action="+action +"&cellid="+p_cellid+"&partid="+p_partid+"&partnum="+p_partnum+ "&partwoid="+p_partwoid  , //Ҫ���͵Ĳ���  
		async : false,//ͬ������   			
		success : function(msg) {
			alert("�ѷ���ָ��");
		}
	});
}

function las_sys(obj){	//  �ֹ�����
	$.ajax({  
		type : "get", //ʹ��get�������ʺ�̨        
		url : "/yxpower/ajax",		
		dataType : "html",  			
		data : "a=las_sys&obj="+obj, //Ҫ���͵Ĳ���  
		async : false,//ͬ������   			
		success : function(msg) {
			//$("#patinfo").val(msg); 
			//getlistjust(15);
			alert("�ѷ���ָ��");
		}
	});
}




function las_go(){	//  �ֹ�����

	go_devid = $('input[type="radio"][name="go_name_devid"]:checked').val(); // ��ȡһ��radio��ѡ�����ֵ  	
	go_cmdtype = $('input[type="radio"][name="go_name_cmdtype"]:checked').val(); // ��ȡһ��radio��ѡ�����ֵ  	
	go_cellidsrc=$("#go_id_cellidsrc").val(); 
	go_celliddst=$("#go_id_celliddst").val(); 

	$.ajax({  
		type : "get", //ʹ��get�������ʺ�̨        
		url : "/yxpower/ajax",		
		dataType : "html",  			
		data : "a=las_go&devid="+go_devid+"&cmdtype="+go_cmdtype+"&cellidsrc="+go_cellidsrc+"&celliddst="+go_celliddst, //Ҫ���͵Ĳ���  
		async : false,//ͬ������   			
		success : function(msg) {
			//$("#patinfo").val(msg); 
			//getlistjust(15);
			alert("�ѷ���ָ��");
		}
	});
}

function las_bind(){	//  

	bind_cellid=$("#bind_id_cellid").val(); 
	bind_trayid=$("#bind_id_trayid").val(); 
	bind_partid=$("#bind_id_partid").val(); 
	bind_partdesc=$("#bind_id_partdesc").val(); 
	if(checksum(bind_partdesc)>=32)  //�ַ����ض�
		bind_partdesc.substr(0,30);
	
	bind_partnum=$("#bind_id_partnum").val(); 
	bind_partwoid=$("#bind_id_partwoid").val(); 
	bind_partlotid=$("#bind_id_partlotid").val(); 

	$.ajax({  
		type : "get", //ʹ��get�������ʺ�̨        
		url : "/yxpower/ajax",		
		dataType : "html",  			
		data : "a=las_bind&cellid="+bind_cellid+"&trayid="+bind_trayid+"&partid="+bind_partid+"&partdesc="+bind_partdesc    +"&partnum="+bind_partnum   +"&partwoid="+bind_partwoid+"&partlotid="+bind_partlotid     , //Ҫ���͵Ĳ���  
		async : false,//ͬ������   			
		success : function(msg) {
			//$("#patinfo").val(msg); 
			//getlistjust(15);
			alert("�ѷ���ָ��");
		}
	});
}
