$(function(){
	$("#salepsnLogin").click(function(){
		ajaxLogin(path+"","salepsn","salepsnAjaxLogin");
	});
	
	$("#memberLogin").click(function(){
		ajaxLogin(path+"","member","memberAjaxLogin");
	});
	
	function ajaxLogin(path,action,a){
		var usr = $("#loginEmail").val();
		var pwd = $("#loginPassword").val();
		$.ajax({
			type : "get", //ʹ��get�������ʺ�̨
			url : path+action, //Ҫ���ʵĺ�̨��ַ
			dataType : "html",
			data : "a="+a+"&usr="+usr+"&pwd="+pwd, //Ҫ���͵Ĳ���
			async : false,//ͬ������
			success : function(msg) {
				if(msg=="" || msg==null){
					alert("�û��������������");
				}else{
					$("#MyCenter").text(msg.substring(0,9)+"...");
					if(action=="salepsn"){
						$("#MyCenter").attr("href",path+"salepsn?a=salepsnCenter");
						$("#toMyCenter").attr("href",path+"salepsn?a=salepsnCenter");
						$("#logOut").attr("href",path+"salepsn?a=logOut").parent("li").show();
					}else if(action=="member"){
						$("#MyCenter").attr("href",path+"member?a=memberCenter");
						$("#toMyCenter").attr("href",path+"member?a=memberCenter");
						$("#logOut").attr("href",path+"member?a=logOut").parent("li").show();
					}
					$(".to-top").trigger("click");
					$("#loginEmail").val("");
					$("#loginPassword").val("");
				}
			}
		});
	}
	
	showSaleorg(jsonrowSaleorgs);
	showSalepsn(jsonrowSalepsns);
	
	$("map#map").children("area").each(function(){//���ϼ���ʵ���
		var storeId = $(this).attr("id");
		var xOffset = -10;//x����ƫ����
     	var yOffset = 10;//Y����ƫ����
     	
     	var preview = $("#preview_container");//���body���Ƿ��Ѿ����ڴ�id������
     	if(preview.length<=0){
            $("body").append("<div id='preview_container' style='z-index:10; background:#fff;' class='padding-large'></div>");//�ŵ��ȵ�DIV�����DIV
            preview = $("#preview_container");
    	}
     	preview.css({"display":"none","position":"absolute"});//�ŵ��ȵ�DIV�����DIV����ʽ
     	
    	
		$(this).mousemove(function(e){
			if(jsonrowSaleorgs!=""){
				var list = eval('('+jsonrowSaleorgs+')');
				for(var i=0;i<list.length;i++){
					var id = list[i]['id'];
					if(id == storeId){
						var name = list[i]['name'];
						var addr = list[i]['addr'];
						var tel = list[i]['tel'];
						var id = list[i]['id'];
						var wxpic = list[i]['wxpic']; 
						var notice = "<div><strong>"+name+"</strong><br /><span>��ַ��"+addr+"</span><br /><span>�绰��"+tel+"</span><br /><img src='uploaded/image/"+wxpic+"' style='width:20%'/><div class='tishi'>ɨ���ά�뼴����ӵ곤΢�ţ�</div></div>";
						preview.html("<div class='mapDiv'>"+notice+"</div>");//���DIV������ŵ��ȵ�DIV
						preview.css("top",(e.pageY - xOffset) + "px").css("left",(e.pageX + yOffset) + "px").css("opaticy",0).show().stop().animate({"opacity":0.9},300);
					}
				}
			}
		});
		
		$(this).mouseout(function(){
			 preview.stop().animate({"opacity":0},300,function(){
			 	$(this).hide();
			 });
		});
});
});

function showSaleorg(str){
	if(str !="" ){
		list = eval('('+str+')');
		var $div = $("<div class='row'></div>");
		for(var i=0;i<list.length;i++){
			var name = list[i]['name'];
			var addr = list[i]['addr'];
			var tel = list[i]['tel'];
			var id = list[i]['id'];
			$div.append("<div class='large-6 columns left'><h6><a href='"+path+"salepsn/store-"+id+".html' target='_blank'>"+name+"</a></h6><p>��ַ��"+addr+"<br />�绰��"+tel+"</p></div>");
			if(i%2!=0){
				$("#saleorg").append($div);
				$div = $("<div class='row'></div>");
			}else if(i%2==0 && i==list.length-1){
				$("#saleorg").append($div);
			}
			
			var coords = "";
			if(id==1){//��ɽ
				coords = "529,27,419,97,472,179,574,140";
			}else if(id==2){//����
				coords = "172,6,171,75,293,17,288,0";
			}else if(id==3){//�Ϻ�
				coords = "301,280,246,386,402,386,423,316";
			}else if(id==4){//����
				coords = "212,232,189,282,251,321,292,239";
			}else if(id==5){//�~��
				coords = "73,128,74,202,188,202,182,114";
			}
			$("#map").append("<area shape='poly' coords='"+coords+"' href='javascript:void(0);' id='"+id+"' alt='"+name+"' />");
			
		}
	}
}

function showSalepsn(str){
	if(str != ""){
		list = eval('('+str+')');
		var $d = $("<div class='row'></div>");
		$("div#salePsn").empty();
		for(var i=0;i<list.length;i++){
			var id = list[i]['id'];
			var icon = list[i]['icon'];
			var qqno = list[i]['qqno'];
			var motto = list[i]['motto'];
			var mobile = list[i]['mobile'];
			var name = list[i]['name'];
			var $c = $("<div class='large-3 pad-6 columns margin-bottom-small'><div class='row'><div class='large-4 small-4 columns reset-padding'><a href='"+path+"salepsn/salepsnDetail-"+id+".html'><img src='"+path+"uploaded/image/"+icon+"' /></a></div><div class='large-8 small-8 columns'><h6><a href='"+path+"salepsn/salepsnDetail-"+id+".html'>"+name+"</a></h6><p class='font-size-14 reset-border-bottom'>�绰��"+mobile+"<br />QQ��"+qqno+"<br /><span class='french-grey'>"+motto+"</span></p></div></div></div>");
			if((i+1)%4 == 0){
				$d.append($c);
				$("div#salePsn").append($d);
				$d = $("<div class='row'></div>");
			}else{
				if((i+1)==list.length){
					$d.append($c);
					$("div#salePsn").append($d);
				}else{
					$d.append($c);
				}
			}
		}
	}
}