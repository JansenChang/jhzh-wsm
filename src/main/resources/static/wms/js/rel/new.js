/**
 * 全局变量
 */
var jsonstr = "";

function createNewsCats(){//文章分类
	 var str = jsonstr;
	 str = eval('('+str+')');
	 var jsoncols = str[0]['jsoncols'];
	 var jsonrow = str[0]['jsonrow'];
	
	  var colList = (new Function("return ("+ jsoncols +")"))();
	  var rowList = (new Function("return ("+ jsonrow +")"))();
	  
	  var $outDiv = $("<div class='row border-solid relative padding-top-large clear absolute bgcolor-f9' style='z-index:5; width:195% ;display:none;' id='catsDiv'></div>");
	  var $close = $("<a class='close-reveal-modal normal-a' id='closeCatsDiv'>×</a>");
	  
	  for(var i=0;i<rowList.length;i++){
		  var $innerDiv = $("<div class='row border-bottom-solid margin-small'></div>");
		  var $firstLevUl = $("<ul class='large-2 columns'></ul>");
		  if(rowList[i]['pid']==0 && rowList[i]['level']==1){
			  $firstLevUl.append("<li> "+rowList[i]['name']+"</li>");
			  $innerDiv.append($firstLevUl);
			  var $secLevUl = $("<ul class='large-10 columns'></ul>");
			  for(var j=0;j<rowList.length;j++){
				  if(rowList[i]['id']==rowList[j]['pid'] && rowList[j]['level']==2){
					  var $selLevLi = $("<li class='large-12 columns'></li>");
					  var $div_01 = $("<div class='large-3 columns'><input type='checkbox' name='category' value='"+rowList[j]['name']+"'/> "+rowList[j]['name']+"</div>");
					  var $div_02 = $("<div class='large-9 columns'></div>");
					  $selLevLi.append($div_01);
					  for(var k=0;k<rowList.length;k++){
						  if(rowList[k]['pid']==rowList[j]['id'] && rowList[k]['level']==3){
							  $div_02.append("<span class='padding-right-small'><input type='checkbox' name='category' value='"+rowList[k]['name']+"'/> "+rowList[k]['name']+"</span>");
						  }
					  }
					  $selLevLi.append($div_02);
					  $secLevUl.append($selLevLi);
				  }
			  }
			  $innerDiv.append($secLevUl);
			  $outDiv.append($innerDiv);  
		  }
	  }
	  $outDiv.append($close);
	  $("#cats").parent("div").append($outDiv);
}

function searchParent(node) {
	var str = jsonstr;
	str = eval('('+str+')');
	var jsonrow = str[0]['jsonrow'];
	var rowList = (new Function("return ("+jsonrow+")"))();
	
	for(var i=0;i<rowList.length;i++){
		if(rowList[i]['name']==node && rowList[i]['pid'] != 0){
			for(var j=0;j<rowList.length;j++){
				if(rowList[i]['pid'] == rowList[j]['id']){
					$("input[name='category']").each(function(){
						if(rowList[j]['name']==$(this).val()){
							$(this).attr("checked",true);
							return false;
						}
					});
					searchParent(rowList[j]['name']);
				}
			}
		}
	}	
}

function ajaxGetValFromTbl(path,tbl,cols,where){//ajax去表中取值
	$.ajax({
		type : "get", //使用get方法访问后台
		url : path+"ajax", //要访问的后台地址
		dataType : "html",
		data : "a=getValueFromTbl&tbl="+ tbl+ "&cols="+cols+"&where="+where, //要发送的参数
		async : false,//同步调用
		success : function(msg) {
			jsonstr = msg;
		}
	});
};

function callFunByTbl(path,tbl){
	if(tbl=="yx_inf_news"){//资讯表
		ajaxGetValFromTbl(path,"yx_inf_cat","[id,name,pid,level]","status= '1'");
		createNewsCats();
	}
}

$(function(){
	$("input#cats").focus(function(){
		$("div#catsDiv").show();
	});
	
	$("input[name='category']").click(function(){
		searchParent($(this).val());
		var cats = "";
		$('input[name="category"]:checked').each(function(){
			cats += "【"+$(this).val()+"】";
 	 	});
		$("#cats").val(cats);
	});
	
	$("a#closeCatsDiv").click(function(){
		$("div#catsDiv").hide();
	});
	
});