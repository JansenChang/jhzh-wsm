﻿var cspath=getMyPath();var jsN=finds(cspath,'/',2);function finds(str,cha,num){var x=str.indexOf(cha);for(var i=0;i<num;i++){x=str.indexOf(cha,x+1);}
return x;}
if(cspath.indexOf("http:")>-1||cspath.indexOf("https:")>-1)
{var cspath=cspath.substr(jsN);}
function getcsUrl(t,o){$("head").append("<link>");css=$("head").children(":last");if(o==1){css.attr({rel:"stylesheet",type:"text/css",href:t+'css1.css'});}else if(o==2){css.attr({rel:"stylesheet",type:"text/css",href:t+'css2.css'});}else if(o==3){css.attr({rel:"stylesheet",type:"text/css",href:t+''});}else if(o==4){css.attr({rel:"stylesheet",type:"text/css",href:t+'css4.css'});}else if(o==5){css.attr({rel:"stylesheet",type:"text/css",href:t+'css5.css'});}}
var Objarr=[];var ObjControlIndex={index:0};(function(){var dmm=function(options1){$("#"+options1.container+"").html("");var page="<div class='w-btn-group x-pages-f' id='"+options1.container+"_page'></div>";var options=$.extend({index:1,container:"",callback:function(){},size:[10,20],skip:false,cssStyle:1,setSize:false},options1);getcsUrl(cspath,options.cssStyle);var Obj1={index:options.index,countpage:1,infocount:1,pageSize1:options.size[0],isSkip:false,huidiao:options.callback,sizearr:options.size,container:options.container,controlIndex:ObjControlIndex.index};if(options.skip!=undefined){Obj1.isSkip=options.skip;}
Objarr.push(Obj1);var sele="<div class='selPa'><select class='w-select' id='"+options.container+"_w-select' onchange='changess("+JSON.stringify(Obj1)+")'></div>";$("#"+options.container+"").append(page);hui(Obj1);for(var o=0;o<Obj1.sizearr.length;o++){sele+="<option value='"+Obj1.sizearr[o]+"' >"+Obj1.sizearr[o]+"</option>";}
sele+="</select>";if(options.setSize)
{$("#"+options.container+"").append(sele);}
ObjControlIndex.index++;};window.dmm=dmm;})();function hui(obj){var options1=obj;Objarr[obj.controlIndex].huidiao(options1);}
function xian(obj){$("#"+obj.container+"_page.w-btn-group").html("");var shoustr="<button id='"+obj.container+"_btnFirst' type='button' class='button gray firstPage' onclick='page("+JSON.stringify(obj)+",1)'>首页</button>"+
"<button id='"+obj.container+"_btnPre' type='button' class='button gray' onclick='page("+JSON.stringify(obj)+",2)'>上一页</button>"+
"<button id='"+obj.container+"_btnLas' type='button' class='button gray' onclick='page("+JSON.stringify(obj)+",3)'>下一页</button>";if(obj.isSkip){shoustr+="<button id='"+obj.container+"_btnEnd' type='button' class='button gray epage lastPage' onclick='page("+JSON.stringify(obj)+",4)'>尾页</button>&nbsp;&nbsp;跳转<input type='text' id='"+obj.container+"_toindex' class='jumps'/>页&nbsp;&nbsp;<button type='button' onclick='rediretoheadindex("+JSON.stringify(obj)+")' class='button gray imsury'>确定</button><span class='w-show'>页数："+(obj.infocount==0?0:obj.index)+" / "+obj.countpage+" &nbsp;&nbsp;&nbsp;总条数："+obj.infocount+"</span>";}else{shoustr+="<button id='"+obj.container+"_btnEnd' type='button' class='button gray lastPage' onclick='page("+JSON.stringify(obj)+",4)'>尾页</button>&nbsp;&nbsp;页数："+(obj.infocount==0?0:obj.index)+" / "+obj.countpage+" &nbsp;&nbsp;&nbsp;总条数："+obj.infocount+"</span>";}
$("#"+obj.container+"_page.w-btn-group").append(shoustr);if(obj.countpage<6||obj.index>=obj.countpage-4){for(var i=obj.countpage,j=0;j<5&&i>0;i--,j++){var str="<button id='"+obj.container+"_child"+i+"' type='button' class='button gray' onclick='redire("+JSON.stringify(obj)+","+i+")'>"+i+"</button>";$("#"+obj.container+"_page.w-btn-group").children().eq(1).after(str);}}
else if(obj.index<obj.countpage-4&obj.countpage>=6){for(var i=obj.countpage,j=0;j<5;j++){if(j==1){var str=str="<button id='"+obj.container+"_child"+i+"' type='button' class='button gray'>┄</button>";$("#"+obj.container+"_page.w-btn-group").children().eq(1).after(str);i=obj.index+2;}
else{var str=str="<button id='"+obj.container+"_child"+i+"' type='button' class='button gray' onclick='redire("+JSON.stringify(obj)+","+i+")'>"+i+"</button>";$("#"+obj.container+"_page.w-btn-group").children().eq(1).after(str);i--;}}}
$("#"+obj.container+"_child"+obj.index).addClass("active");$("#"+obj.container+"_page").children().not("#"+obj.container+"_child"+obj.index).each(function(){$(this).removeClass("active");});ceshi(obj);}
function changess(obj){obj.index=1;obj.pageSize1=$('#'+obj.container+'_w-select').val();hui(obj);}
function redire(obj,o){obj.index=o;hui(obj);}
function rediretoheadindex(obj){if($("#"+obj.container+"_toindex").val()==""||$("#"+obj.container+"_toindex").val()==""){return;}
var reg=/^[0-9]*$/;if(!reg.test($("#"+obj.container+"_toindex").val())){alert("请输入数字");return;}
if($("#"+obj.container+"_toindex").val()>obj.countpage){alert("不能大于总页数");return;}
if($("#"+obj.container+"_toindex").val()<1){alert("不能小于1");return;}
obj.index=Number($("#"+obj.container+"_toindex").val());hui(obj);}
function page(obj,o){if(o==1){$("#"+obj.container+"_btnLas").attr("disabled","false");obj.index=1;}
if(o==2){$("#"+obj.container+"_btnLas").attr("disabled","false");if(obj.index>1){obj.index--;}
else{$("#"+obj.container+"_btnPre").attr("disabled","true");$("#"+obj.container+"_btnPre").css({"color":"#ddd","cursor":"not-allowed"});}}
if(o==3){$("#"+obj.container+"_btnPre").attr("disabled","false");if(obj.index<obj.countpage){obj.index++;}
else{$("#"+obj.container+"_btnLas").attr("disabled","true");$("#"+obj.container+"_btnLas").css({"color":"#ddd","cursor":"not-allowed"});}}
if(o==4){$("#"+obj.container+"_btnPre").attr("disabled","false");obj.index=obj.countpage;}
hui(obj);}
function ceshi(obj){if(obj.index==obj.countpage){$("#"+obj.container+"_btnLas").attr("disabled","true");$("#"+obj.container+"_btnLas").css({"color":"#ddd","cursor":"not-allowed"});$("#"+obj.container+"_btnEnd").attr("disabled","true");$("#"+obj.container+"_btnEnd").css({"color":"#ddd","cursor":"not-allowed"});}
if(obj.index==1){$("#"+obj.container+"_btnPre").attr("disabled","true");$("#"+obj.container+"_btnPre").css({"color":"#ddd",'cursor':'not-allowed'});$("#"+obj.container+"_btnFirst").attr("disabled","true");$("#"+obj.container+"_btnFirst").css({"color":"#ddd","cursor":"not-allowed"});}
if(obj.countpage<1)
{$("#"+obj.container+"_btnLas").attr("disabled","true");$("#"+obj.container+"_btnLas").css({"color":"#ddd","cursor":"not-allowed"});$("#"+obj.container+"_btnEnd").attr("disabled","true");$("#"+obj.container+"_btnEnd").css({"color":"#ddd","cursor":"not-allowed"});}}
function getMyPath(){var scriptSrc=document.getElementsByTagName('script')[document.getElementsByTagName('script').length-1].src;var jsName=scriptSrc.split('/')[scriptSrc.split('/').length-1];return scriptSrc.replace(jsName,'');}