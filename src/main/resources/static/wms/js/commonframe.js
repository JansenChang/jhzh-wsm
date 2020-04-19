
var ACTION_DETAIL = "detail";//��ϸ
var ACTION_EDITGO = "editgo";//��ʼ���༭
var ACTION_EDIT = "edit";//�༭
var ACTION_DEL = "del";//ɾ��
var ACTION_MNT = "mnt";//ά��
var ACTION_ADDGO = "addgo";//��ʼ�����
var ACTION_ADD = "add";//���



/**
 * �˺����û��б�չʾ 
 * �ֱ���� disp_list_title() disp_list_content()
 * �������Ҫͬʱ��ʾ��������ݣ���ô�����ֱ�ӵ�������������
 */

function disp_list(containerid,tbl,jsoncols,jsonrows,roleattrname,colsgo){
	disp_list_title(containerid,jsoncols);
	disp_list_content(containerid,tbl,jsoncols,jsonrows);
}



/**
 * �ú��������б��չʾʱ���г�����
 *containerid ����id
 *jsoncols �ֵ��������
 */
function disp_list_title(containerid,jsoncols){
	if(jsoncols == undefined || jsoncols==null || jsoncols==''){
		alert("����Ϊ��,�����������");
		return ;		
	}
	var list_cols = (new Function("return (" + jsoncols + ")"))();
	var $container = $("#"+containerid);
	var container_nodeName = $container.get(0).nodeName;
	if(container_nodeName=="TABLE"){//����Ϊtable
		var $thead = $("<thead></thead>");
		var $tr = $("<tr></tr>");
		for(var i=0;i<list_cols.length;i++){
			var title = list_cols[i]['title'];
			var $td = $("<td>"+title+"</td>");
			$tr.append($td);
		}
		var $handle = $("<td>����</td>");
		$tr.append($handle);
		$thead.append($tr);
		$container.append($thead);
	}
}


/**
 * չʾ�б�ҳ�棬�г�����
 * @param  containerid  ����id 
 * @param  tbl  ��
 * @param  jsoncols  �ֵ��������
 * @param  jsonrow  
 */
function disp_list_content(containerid,tbl,jsoncols,jsonrows){
	if(jsoncols == undefined || jsoncols==null || jsoncols==''){
		alert("����Ϊ��,���˵�����");
		return ;		
	}
	if(jsonrows == undefined|| jsonrows ==null ||  jsonrows=='' ){
		alert("����Ϊ��,���˵�����");
		return ;		
	}
	var list_cols = (new Function("return ("+ jsoncols +")"))();
	var list_rows = (new Function("return ("+ jsonrows +")"))();
	var $container = $("#"+containerid);
	var container_nodeName = $container.get(0).nodeName;
	if(container_nodeName=="TABLE"){//����Ϊtable
		var $tbody = $("<tbody></tbody>");
		for(var i=0;i<list_rows.length;i++){
			var $tr = $("<tr></tr>");
			var id = list_rows[i]['id'];
			for(var j=0;j<list_cols.length;j++){
				var col = list_cols[j]['col'];
				var type = list_cols[j]['type'];
				var value = list_rows[i][col];
				if(type==41){//��������
					value = value+"";
					value = parseFloat(value).toFixed(2);
					//value = value.toFixed(2);
				}else if(type==43){//����
					value = longtotime(value*1000,"yyyy-MM-dd");
				}else if(type==46){//ʱ��
					value = longtotime(value*1000,"yyyy-MM-dd HH:mm:ss");
				}else if(type==610){
					value = value.replace(/<br>/g,"");
					if(value.length>15){
						value = value.substring(0,14)+"...";
						if(col=="pwd")
							value="************";
					}
				}
				if(col=='id'){
					value =  "<input  type=checkbox  name=ids  value=" + id  +"   /> &nbsp; " +value;
				}
				var $td = $("<td>"+value+"</td>");
				$tr.append($td);
			}
			var other = "";
			if(tbl=="yx_dic"){
				other = $.trim(list_rows[i]['name']);
			}
			//var handle = handleFun(tbl,id,other);  //zhou 20150215
			var $handle = $("<td>&nbsp;"+"</td>");//var $handle = $("<td>"+handle+"</td>");
			$tr.append($handle);
			$tbody.append($tr);
		}
		$container.append($tbody);
	}
}

/**
 * ����һ����¼
 * @param path ·��
 * @param containerid ����ID
 * @param jsoncols �ֵ�
 */
function createAdd(path,containerid,jsoncols){
	if(jsoncols=="" || jsoncols==null  ||jsoncols=="null"){
		return;
	}
	var prefix = "pre_";
	var $container = $("#"+containerid);
	var container_nodeName = $container.get(0).nodeName;
	var listcols = eval('('+jsoncols+')');
	if(container_nodeName=="TABLE"){//����Ϊtable
		for(var n=0;n<listcols.length;n++){
			var col = listcols[n]['col'];
			var title = listcols[n]['title'];
			var $tr = $("<tr></tr>");
			if(n==0){
				$tr = $("<tr style='display:none;'></tr>");
			}
			var $th = $("<th>"+title+"</th>");
			var $td = $("<td id='"+prefix+col+"'></td>");
			$tr.append($th,$td);
			$container.append($tr);
		}
	}else if(container_nodeName=="DIV"){//����ΪDIV
		for(var n=0;n<listcols.length;n++){
			var col = listcols[n]['col'];
			var title = listcols[n]['title'];
			var $outerDiv = $("<div class='row'></div>");
			if(n==0){
				$outerDiv = $("<div class='row' style='display:none;'></div>");
			}
			var $innerDiv_01 = $("<div class='large-2 small-4 columns text-center line-height'>"+title+"</div>");
			var $innerDiv_02= $("<div id='"+prefix+col+"'></div>");
			$outerDiv.append($innerDiv_01,$innerDiv_02);
			$container.append($outerDiv);
		} 
	}
	fillNode(path,container_nodeName,listcols,prefix);
}

/**
 * �˺������ڱ༭ʱ��ʼ��ҳ��
 * @param containerid ����ID
 * @param jsoncols 
 * @param jsonrow
 * @param prefix td��ǰ׺ ����Ϊ��
 */
function createEdit(path,containerid,jsoncols,jsonrow,prefix){
	if(jsoncols=="" || jsoncols==null){
		return;
	}
	if(jsonrow=="" || jsonrow==null){
		return;
	}
	if(prefix==""){
		prefix = "pre_";
	}else{
		prefix = prefix+"_";
	}
	var listcols = (new Function("return ("+ jsoncols +")"))();
	var listrow = (new Function("return ("+ jsonrow +")"))();
	var $container = $("#"+containerid);
	var container_nodeName = $container.get(0).nodeName;
	if(container_nodeName=="TABLE"){
		for(var i=0;i<listcols.length;i++){
			var col = listcols[i]['col'];
			var title = listcols[i]['title'];
			var remark = listcols[i]['remark'];
			if(remark=="." || remark=="0"){
				remark="";
			}
			var $tr = $("<tr></tr>");
			if(i==0){
				$tr = $("<tr style='display:none;'></tr>");
			}
			var $th = $("<th>"+title+"</th>");
			var $td = $("<td id='"+prefix+col+"'></td>");
			var $remark = $("<td>"+remark+"</td>");
			$tr.append($th,$td,$remark);
			$container.append($tr);
		}
		fillNode(path,container_nodeName,listcols,prefix);
		fillEditVal(path,listcols,listrow);
	}else if(container_nodeName=="DIV"){
		for(var i=0;i<listcols.length;i++){
			var col = listcols[i]['col'];
			var title = listcols[i]['title'];
			var remark = listcols[i]['remark'];
			if(remark=="." || remark=="0"){
				remark="";
			}
			var $outerDiv = $("<div class='row'></div>");
			if(i==0){
				$outerDiv = $("<div class='row' style='display:none;'></div>");
			}
			var $innerDiv_01 = $("<div class='large-2 small-4 columns text-center line-height'>"+title+"</div>");
			var $innerDiv_02= $("<div id='"+prefix+col+"'></div>");
			$outerDiv.append($innerDiv_01,$innerDiv_02);
			$container.append($outerDiv);
		}
		fillNode(path,container_nodeName,listcols,prefix);
		fillEditVal(path,listcols,listrow);
	}
}


/**
 * ���ڵ�
 * @param path ·��
 * @param listcols �ֵ�
 * @param prefix ǰ׺�����ڵ��ô˺���ʱ������Ϊ�գ��Ѿ�����Ĭ��ֵ
 */
function fillNode(path,containerName,listcols,prefix){
	if(containerName=="TABLE"){
		for(var k=0;k<listcols.length;k++){
			var col = listcols[k]['col'];
			var type = listcols[k]['type'];
			var reftable = listcols[k]['reftable'];
			var args = listcols[k]['args'];
			var $td = $("#"+prefix+col);
			var $td_child = $("");
			var t = new Date().getTime();
			if(reftable=='.'){
				if(type=="46"){
					t = longtotime(t, "yyyy-MM-dd HH:mm:ss");
					$td_child = $("<input type='text' id='"+col+"' onclick='WdatePicker({isShowClear:false,readOnly:true,dateFmt:\"yyyy-MM-dd HH:mm:ss\"});' value='"+t+"'/>");
				}else if(type=="43"){
					t = longtotime(t, "yyyy-MM-dd");
					$td_child = $("<input type='text' id='"+col+"' onclick='WdatePicker({isShowClear:false,readOnly:true,dateFmt:\"yyyy-MM-dd\"});' value='"+t+"'/>");
				}else if(type=="41"){
					$td_child = $("<input type='text' id='"+col+"' />");
				}else if(type=="80"){
						$td_child = $("<input type='text' id='"+col+"' />");
				}else if(type=="610"){
					if(args=="" || args=="." || args=="0"){
						$td_child = $("<input type='text' id='"+col+"' />");
					}else{
						var tag = getValFromArgs(args,"deftag");
						if(tag=="password"){
							$td_child = $("<input type='password' id='"+col+"' />");    //password -->text
						}
						else
						if(tag=="textarea"){
							$td_child = $("<textarea id='"+col+"' cols='50' rows='8'></textarea>");
						}else if(tag=="img"){
							$td_child = $("<input type='button' class='upload_img' id='upload_img_"+col+"' value='�ϴ�ͼƬ'/><input type='hidden' id='"+col+"' />&nbsp;&nbsp;&nbsp;&nbsp;<img id='imgurl_"+col+"' src='images/foundation_back/nopic.jpg' width='118' height='94' />");
						}else if(tag=="editor"){
							$td_child = $("<textarea name='content' id='"+col+"' cols='100' rows='16' style='height:300px;'></textarea>");
						}else if(tag=="files"){
							$td_child = $("<input type='button' class='upload_img' id='upload_img_"+col+"' value='�ϴ�����'/><input type='hidden' id='"+col+"' />&nbsp;&nbsp;&nbsp;&nbsp;<img id='imgurl_"+col+"' src='images/foundation_back/nopic.jpg' width='118' height='94' />");
						}else{
							$td_child = $("<input type='text' id='"+col+"' />");
						}
					}	
				}else{
					$td_child = $("<textarea id='"+col+"' cols='50' rows='8'></textarea>");
				}
			}else if(type=="510"){
				$td_child = $("<input type='text' id='"+col+"' />");
			}else{
				if(type=="49"){
					jqAjax(path,reftable,col, listcols[k]["refiid"],listcols[k]["refname"], listcols[k]["refcat"],prefix);
				}else if(type=="89"){
					jqAjax(path,reftable,col, listcols[k]["refiid"],listcols[k]["refname"], "",prefix);
				}else if(type=="510"){
					$td_child = $("<input type='text' id='"+col+"' />");
				}
			}
			$td.append($td_child);
		}
	}else if(containerName=="DIV"){
		for(var k=0;k<listcols.length;k++){
			var col = listcols[k]['col'];
			var type = listcols[k]['type'];
			var reftable = listcols[k]['reftable'];
			var args = listcols[k]['args'];
			var $innerDiv_02 = $("#"+prefix+col);
			var $child = $("");
			var t = new Date().getTime();
			if(reftable=='.'){
				if(type=="46"){
					t = longtotime(t, "yyyy-MM-dd HH:mm:ss");
					$child = $("<input type='text' id='"+col+"' onclick='WdatePicker({isShowClear:false,readOnly:true,dateFmt:\"yyyy-MM-dd HH:mm:ss\"});' value='"+t+"'/>");
					$innerDiv_02.addClass("large-4 small-8 columns");
				}else if(type=="43"){
					t = longtotime(t, "yyyy-MM-dd");
					$child = $("<input type='text' id='"+col+"' onclick='WdatePicker({isShowClear:false,readOnly:true,dateFmt:\"yyyy-MM-dd\"});' value='"+t+"'/>");
					$innerDiv_02.addClass("large-4 small-8 columns");
				}else if(type=="41"){
					$child = $("<input type='text' id='"+col+"' />");
					$innerDiv_02.addClass("large-4 small-8 columns");
				}else if(type=="80"){
						$child = $("<input type='text' id='"+col+"' />");
						$innerDiv_02.addClass("large-4 small-8 columns");
				}else if(type=="610"){
					if(args=="" || args=="." || args=="0"){
						$child = $("<input type='text' id='"+col+"' />");
						$innerDiv_02.addClass("large-4 small-8 columns");
					}else{
						var tag = getValFromArgs(args,"deftag");
						if(tag=="password"){
							$child = $("<input type='text' id='"+col+"' />");  //password -->text
							$innerDiv_02.addClass("large-4 small-8 columns");
						}
						else
						if(tag=="textarea"){
							$child = $("<textarea id='"+col+"' cols='50' rows='8'></textarea>");
							$innerDiv_02.addClass("large-8 small-8 columns");
						}else if(tag=="img"){
							//$child = $("<input type='button' class='upload_img' id='upload_img_"+col+"' value='�ϴ�ͼƬ'/><input type='hidden' id='"+col+"' />&nbsp;&nbsp;&nbsp;&nbsp;<img id='imgurl_"+col+"' src='images/nopic.jpg' width='118' height='94' />");
							$child = $("<a class='small button radius upload_img' href='#' id='upload_img_"+col+"'>�ϴ�ͼƬ</a>");
							$innerDiv_02.after("<div class='large-4 small-4 columns margin-bottom-small'><img id='imgurl_"+col+"'src='images/foundation_back/nopic.jpg' width=200 height=90/><input type='hidden' id='"+col+"' /></div>");
							$innerDiv_02.addClass("large-1 small-4 columns");
						}else if(tag=="editor"){
							$child = $("<textarea name='content' id='"+col+"' cols='100' rows='16' style='height:300px;'></textarea>");
							$innerDiv_02.addClass("large-8 small-8 columns margin-bottom-large");
						}else if(tag=="files"){
							//$child = $("<input type='button' class='upload_img' id='upload_img_"+col+"' value='�ϴ�ͼƬ'/><input type='hidden' id='"+col+"' />&nbsp;&nbsp;&nbsp;&nbsp;<img id='imgurl_"+col+"' src='images/nopic.jpg' width='118' height='94' />");
							
							//<input type="button" id="insertfile" value="ѡ���ļ�" class="up"/>
							//<input type="hidden" name="addins" id="addins"/>&nbsp;&nbsp;&nbsp;&nbsp;
							//<span id="url"></span>
							
							$child = $("<a class='small button radius insertfile'  id='insertfile_"+col+"'>�ϴ�����</a><input type='hidden' name='url' id='"+col+"' class='url'/>&nbsp;&nbsp;&nbsp;&nbsp;<span id='addins'></span>");
							//$innerDiv_02.after("<div class='large-4 small-4 columns margin-bottom-small'><img id='imgurl_"+col+"'src='images/foundation_back/nopic.jpg' width=200 height=90/><input type='hidden' id='"+col+"' /></div>");
							$innerDiv_02.addClass("large-1 small-4 columns");
						}else{
							$child = $("<input type='text' id='"+col+"' />");
							$innerDiv_02.addClass("large-4 small-8 columns");
						}
					}	
				}else{
					$child = $("<input type='text' id='"+col+"' />");
					$innerDiv_02.addClass("large-4 small-8 columns");
				}
			}else{
				if(type=="49"){
					jqAjax(path,reftable,col, listcols[k]["refiid"],listcols[k]["refname"], listcols[k]["refcat"],prefix);
				}else if(type=="89"){
					jqAjax(path,reftable,col, listcols[k]["refiid"],listcols[k]["refname"], "",prefix);
				}else if(type=="510"){
					$child = $("<textarea id='"+col+"' cols='20' rows='4'></textarea>");
					$innerDiv_02.addClass("large-8 small-8 columns");
				}
			}
			$innerDiv_02.append($child);
		}
	}
	
}



/**
 * ���Ѿ���ʼ��OK��ҳ�棬�������
 * @param path ·��
 * @param listcols �ֵ�
 * @param listrow ��Ҫ��ʾ������
 */
function fillEditVal(path,listcols,listrow){
	for(var k=0;k<listcols.length;k++){
		var col = listcols[k]['col'];
		var type = listcols[k]['type'];
		var args = listcols[k]['args'];
		var $col = $("#"+col);
		var value = listrow[0][col];
		if(type=="46"){
			value = longtotime(value*1000,"yyyy-MM-dd HH:mm:ss");
			$col.val(value);
		}else if(type=="43"){
			value = longtotime(value*1000,"yyyy-MM-dd");
			$col.val(value);
		}else if(type=="41"){
			//if(value==0 || value==0.00){
			//	value = "";
			//}else{
				value = value+"";
				value = parseFloat(value).toFixed(2);
			//}
			$col.val(value);
		}else if(type==610){
			if(args=="" || args=="." || args=="0"){
				if(value=="0" || value==0 || value=="."){
					value=value;
				}
				$col.val(value);
			}else{
				var tag = getValFromArgs(args,"deftag");
				if(value=="." || value==0 || value=="0"){
					value = value;
				}
				if(tag=="password"){
					value = "";  //�����޸ģ�������գ���������
				}
				else
				if(tag=="textarea"){
					if(getExplorer()=="MSIE"){
						value = value.replace(/<br>/g,"\r\n");
					}else{
						value = value.replace(/<br>/g,"\n");
					}
					$col.html(value);
				}else if(tag=="editor"){
					value=value.replace(/\&quot;/g,"\"");//�滻��ǵ�����Ϊȫ�ǵ�����
					$col.text(value);
				}else if(tag=="img"){
					$col.val(value);
					$("#imgurl_"+col).attr("src",path+"uploaded/image/"+value);
				}else{
					$col.val(value);
				}
			}
		}else{
			$col.val(value);
		}
	}
}

/**
 * �˺�������ȡ����JSON
 * @param path ·�� "<%=basePath%>"
 * @param tbl ����
 * @param col �ֶ�
 * @param refiid
 * @param refname
 * @param refcat
 * @param prefix ǰ׺
 */
function jqAjax(path, tbl,col, refiid, refname, refcat ,prefix) {
	if(path){
		if(path.substring(path.length-2, path.length-1) != "/"){
			path = path+"/";
		}
	}
	var condition = "";
	if(tbl=='yx_sys_code'){
		condition = "cat="+ refcat;
	}
	//alert(tbl);
	$.ajax({
			type : "get", //ʹ��get�������ʺ�̨
			url : path+"ajax", //Ҫ���ʵĺ�̨��ַ
			dataType : "html",
			data : "a=getSelectValue&tbl=" + tbl + "&cols=["+ refiid + "," + refname + "]&condition=" + condition , //Ҫ���͵Ĳ���
			async : false,//ͬ������
			success : function(msg) {
				if (msg != '') {
					//alert(msg)
					fillSelect(tbl,col, msg, refname ,prefix);
				}
			}
		});
}


/**
 *�˺��������������ֵ
 * @param tbl ����
 * @param col �ֶ���
 * @param rows 
 * @param refname ָ���������col
 * @param prefix ǰ׺
 */
function fillSelect(tbl,col, rows, refname ,prefix){
	var $innerDiv_02 = $("#"+prefix+col);
	var $select = $("<select id='"+col+"'></select>");
	var strlist = eval("(" + rows+ ")");
	$innerDiv_02.empty();
	$innerDiv_02.addClass("large-4 small-8 columns");
	$select.append("<option value='0'>��ѡ��</option>");
	for(var n=0;n<strlist.length;n++){
		if(tbl=="yx_sys_code"){
			var $option = $("<option value='"+strlist[n]["iid"]+"'>"+strlist[n][refname]+"</option>");
			$select.append($option);
		}else{
			var $option = $("<option value='"+strlist[n]["id"]+"'>"+strlist[n][refname]+"</option>");
			$select.append($option);
		}
	}
	$innerDiv_02.append($select);
}


/**
 * �˺�������չʾ������¼������
 * @param jsonstrcols
 * @param jsonstr_row
 * @param tb_detail_id
 */
function disp_detail(containerid,jsoncols,jsonrow){
	if(jsoncols=="" || jsoncols==null){
		return;
	}
	if(jsonrow=="" || jsonrow==null){
		return;
	}
	var listcols = (new Function("return ("+ jsoncols +")"))();
	var listrow = (new Function("return ("+ jsonrow +")"))();;
	var $container = $("#"+containerid);
	var container_nodeName = $container.get(0).nodeName;
	if(container_nodeName=="TABLE"){
		for(var i=0;i<listcols.length;i++){
			var $tr = $("<tr></tr>");
			var col = listcols[i]['col'];
			var type = listcols[i]['type'];
			var title = listcols[i]['title'];
			var remark = listcols[i]['remark']; 
			var args= listcols[i]['args']; 
			if(remark=="." || remark=="0"){
				remark="";
			}
			var value= listrow[0][col];
			if(type==41){//��������
				value = value+"";
				value = parseFloat(value).toFixed(2);
				//value = value.toFixed(2);
			}else if(type==43){//����
				value = longtotime(value*1000,"yyyy-MM-dd");
			}else if(type==46){//ʱ��
				value = longtotime(value*1000,"yyyy-MM-dd HH:mm:ss");
			}else if(type==610){
				var arg = getValFromArgs(args,"deftag");
				if(arg=="img"){
					value = "<img src='uploaded/image/"+value+"' width='100px' height='70px'>";//path+"uploaded/image/"+value
				}else if(arg=="editor"){
					value=value.replace(/\&quot;/g,"\"");//�滻��ǵ�����Ϊȫ�ǵ�����
				}
			}
			$th = $("<th>"+title+"</th>");
			$td = $("<td>"+value+"</td>");
			$remark = $("<td>"+remark+"</td>");
			$tr.append($th,$td,$remark);
			$container.find("tbody").append($tr);
		}
	}else if(container_nodeName=="DIV"){
		for(var i=0;i<listcols.length;i++){
			var col = listcols[i]['col'];
			var type = listcols[i]['type'];
			var title = listcols[i]['title'];
			var args= listcols[i]['args']; 
			var value= listrow[0][col];
			if(type==41){//��������
				value = value+"";
				value = parseFloat(value).toFixed(2);
			}else if(type==43){//����
				value = longtotime(value*1000,"yyyy-MM-dd");
			}else if(type==46){//ʱ��
				value = longtotime(value*1000,"yyyy-MM-dd HH:mm:ss");
			}else if(type==610){
				var arg = getValFromArgs(args,"deftag");
				if(arg=="img"){
					value = "<img src='uploaded/image/"+value+"' width='100px' height='70px'>";//path+"uploaded/image/"+value
				}else if(arg=="editor"){
					value=value.replace(/\&quot;/g,"\"");//�滻��ǵ�����Ϊȫ�ǵ�����
				}
			}
			var $outerDiv = $("<div class='row'></div>");
			var $innerDiv_01 = $("<div class='large-2 small-4 columns text-center line-height'>"+title+"</div>");
			var $innerDiv_02= $("<div id='"+col+"' class='large-8 small-8 columns margin-bottom-large border-bottom-dashed' style='line-height:2em;'>"+value+"</div>");
			$outerDiv.append($innerDiv_01,$innerDiv_02);
			$container.append($outerDiv);
		}
	}
}


/**
 * �˺������ڻ�ȡ�༭����������������ϵ�����
 * @param tbl
 * @param jsoncols
 */
function getFormValue(action,tbl,jsoncols){
	if(tbl=="" || tbl==null){
		return;
	}
	if(jsoncols=="" || jsoncols==null){
		return;
	}
	var listcols = eval('('+jsoncols+')');
	if(checkData(listcols)==false){
		return;
	}
	var jsonrow = "[{";
	for(var i=0;i<listcols.length;i++){
		var col = listcols[i]['col'];
		var type = listcols[i]['type'];
		var args = listcols[i]['args'];
		var datalen = listcols[i]['datalen'];
		var value = "";
		if(type=="46"){
			value = $("#"+col).val();
			value = timetolong(value+"");
		}else if(type=="43"){
			value = $("#"+col).val();
			value = timetolong(value+"");
		}else if(type=="80"){
			if(col=='id' && action==ACTION_EDITGO){
				continue;
			}else if(col=='id' && action==ACTION_ADDGO){
				value = -1;
			}else{
				value = $.trim($("#"+col).val());
			}
		}else if(type=="610"){
			var tag = getValFromArgs(args,"deftag");
			if(tag=="editor"){
				//var value = $("#"+col).prev("div").find("iframe").contents().find("body").html();
				var value = $("#"+col).prev("div").find("iframe").get(0).contentWindow.document.body.innerHTML;
				value = value.replace(/\'/g, "&quot;");//�滻��ǵ�����Ϊȫ�ǵ�����
				value = value.replace(/\"/g, "&quot;");//�滻���˫����Ϊȫ��˫����
				//value = value.replace(/\r\n/g, "");
				value = value.replace(/\n/g, "");
			}
			else if(tag=="password"){
				var value = $("#"+col).val();   // �޸����뱣�����md5��
				value = hex_md5(value);
			}
			else if(tag=="textarea"){
				var value = $("#"+col).val();
				if(getExplorer()=="MSIE"){
					value = value.replace(/\r\n/g,"<br>");
				}else{
					value = value.replace(/\n/g,"<br>");
				}
			}else if(tag=="img"){
				var value = $("#"+col).val();
			}else{
				var value = $("#"+col).val();
			}
		}else{
			value = $.trim($("#"+col).val());
		}
		jsonrow += "'"+col+"':'"+value+"',";
	}
	jsonrow = jsonrow.substring(0,jsonrow.length-1);
	jsonrow += "}]";
	var obj = eval("document.editform.jsonrow");
	obj.value = jsonrow;
	//alert(jsonrow);
	return jsonrow;
}


/**�������޸ģ�����ύʱ���������ݵĺϷ���
 * @param jsoncols
 * @returns {Boolean}
 */
function checkData(jsoncols){
	for(var i=0;i<jsoncols.length;i++){
		var col = jsoncols[i]['col'];
		var title = jsoncols[i]['title'];
		var type = jsoncols[i]['type'];
		var args = jsoncols[i]['args'];
		var title = jsoncols[i]['title']; 
		var datalen = jsoncols[i]['datalen']; 
		if(type=="40" || type=="41"){
			var reg = getReg(type);
			var value = $.trim($("#"+col).val());
			if(value=="" || value==null){
				$("#"+col).focus();
				alert(title+"Ϊ��");
				return false;
			}else if(!reg.test(value)){
				$("#"+col).focus();
				alert(title+"��ֵ�����Ϲ淶");
				return false;
			}
		}else if(type=="43"){
			var value = $.trim($("#"+col).val());;
			if(value=="" || value==null){
				$("#"+col).focus();
				alert(title+"Ϊ��");
				return false;
			}
			
		}else if(type=="46"){
			var value = $.trim($("#"+col).val());;
			if(value=="" || value==null){
				$("#"+col).focus();
				alert(title+"Ϊ��");
				return false;
			}
		}else if(type=="49"){
			var value = $("#"+col).val();
			//if(value=="0"){
				//$("#"+col).focus();
				//alert("��ѡ��"+title);
				//return false;
			//}
		}else if(type=="80"){
			if(col=="id"){
				continue;
			}else{
				var reg = getReg(type);
				var value = $.trim($("#"+col).val());
				if(value=="" || value==null){
					$("#"+col).focus();
					alert(title+"Ϊ��");
					return false;
				}else if(!reg.test(value)){
					$("#"+col).focus();
					alert(title+"��ֵ�����Ϲ淶");
					return false;
				}
			}
			
		}else if(type=="89"){
			var value = $("#"+col).val();
			if(value=="0"){
				$("#"+col).focus();
				alert("��ѡ��"+title);
				return false;
			}
		}else if(type=="510"){
			var value = $.trim($("#"+col).val());
			if(value=="0"){
				$("#"+col).focus();
				alert("��ѡ��"+title);
				return false;
			}
		}else if(type=="610"){
			if(args=="" || args=="." || args=="0"){
				var value = $.trim($("#"+col).val());
				if(value=="" || value==null){
					$("#"+col).focus();
					alert(title+"Ϊ��");
					return false;
				}else if(checksum(value)>=datalen){
					$("#"+col).focus();
					alert(title+"��������������ɾ����");
					return false;
				}
			}else{
				var tag = getValFromArgs(args,"deftag");
				if(tag == "editor"){
					//var value = $("#"+col).prev("div").find("iframe").contents().find("body").html();
					var value = $("#"+col).prev("div").find("iframe").get(0).contentWindow.document.body.innerHTML;
					if(value=="" || value==null){
						$("#"+col).focus();
						alert(title+"Ϊ��");
						return false;
					}else if(checksum(value)>=datalen){
						$("#"+col).focus();
						alert(title+"��������������ɾ����");
						return false;
					}
					value = value.replace(/\'/g, "&quot;");//�滻��ǵ�����Ϊȫ�ǵ�����
					value = value.replace(/\"/g, "&quot;");//�滻���˫����Ϊȫ��˫����
				}else if(tag == "textarea"){
					var value = document.getElementById(col).value;
					if(getExplorer()=="MSIE"){
						value = value.replace(/\r\n/g,"<br>");
					}else{
						value = value.replace(/\n/g,"<br>");
					}
					if(value=="" || value==null){
						$("#"+col).focus();
						alert(title+"Ϊ��");
						return false;
					}else if(checksum(value)>=datalen){
						$("#"+col).focus();
						alert(title+"��������������ɾ����");
						return false;
					}
				}else if(tag == "img"){
					var value = $("#"+col).val();
					if(value=="" || value==null){
						$("#"+col).focus();
						alert(title+"Ϊ��");
						return false;
					}else if(checksum(value)>=datalen){
						$("#"+col).focus();
						alert(title+"��������������ɾ����");
						return false;
					}
				}else{
					value = $.trim($("#"+col).val());
					if(value=="" || value==null){
						$("#"+col).focus();
						alert(title+"Ϊ��");
						return false;
					}else if(checksum(value)>=datalen){
						$("#"+col).focus();
						alert(title+"��������������ɾ����");
						return false;
					}
				}
			}
		}
	}
	return true;
}

/**
 * ���ݲ�ͬtype����������ʽ
 * @param type
 * @returns {RegExp}
 */
function getReg(type){
	if(type==40 || type==80){
		var reg = new RegExp(/^[0-9]+$/);
		return reg;
	}else if(type==41){
		var reg = new RegExp(/^(((0-9)+.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*.[0-9]+)|([0-9]*[1-9][0-9]*))$/);
		return  reg;
	}else if(type==43){
		var reg = new RegExp(/^\[0-2]{1}\[0-6]{1}:\[0-5]{1}\[0-9]{1}:\[0-5]{1}\[0-9]{1}/);
		return  reg;
	}
}


/**
 * ��args��ȡֵ args��dic��args�ֶ�
 * @param args
 * @param name
 * @returns
 */
function getValFromArgs(args,name){
	var arg_arr = new Array();
	args_arr = args.split(";");
	for(var a=0;a<args_arr.length;a++){
		var arg = args_arr[a];
		if(arg.search(name)==0){
			var arg_arr = arg.split(":");
			if(arg_arr[0]==name){
				return arg_arr[1];
			}
		}else{
			return "";
		}
	}
}



function createAdd1(path,containerid,jsoncols){
	if(jsoncols=="" || jsoncols==null  ||jsoncols=="null"){
		return;
	}
	var prefix = "pre_";
	var $container = $("#"+containerid);
	var container_nodeName = $container.get(0).nodeName;
	var listcols = eval('('+jsoncols+')');


		for(var k=0;k<listcols.length;k++){
			var col = listcols[k]['col'];
			var type = listcols[k]['type'];
			var reftable = listcols[k]['reftable'];
			var args = listcols[k]['args'];
			var title = listcols[k]['title'];
			
			
			var $innerDiv_02= $("<div id='"+prefix+col+"'></div>");
			$container.append($innerDiv_02);
			
			//var $innerDiv_02 = $("#"+prefix+col);
			var $child = $("");
			var t = new Date().getTime();
			if(reftable=='.'){
				if(type=="46"){
					t = longtotime(t, "yyyy-MM-dd HH:mm:ss");
					$child = $("<input type='text'    placeholder="  +title+   "    placeholder="  +title+   " id='"+col+"' onclick='WdatePicker({isShowClear:false,readOnly:true,dateFmt:\"yyyy-MM-dd HH:mm:ss\"});' />");
					$innerDiv_02.addClass("large-2 small-2 columns");
				}else if(type=="43"){
					t = longtotime(t, "yyyy-MM-dd");
					$child = $("<input type='text'  placeholder="  +title+   " id='"+col+"' onclick='WdatePicker({isShowClear:false,readOnly:true,dateFmt:\"yyyy-MM-dd\"});' />");
					$innerDiv_02.addClass("large-2 small-2 columns");
				}else if(type=="41"){
					$child = $("<input type='text'  placeholder="  +title+   " id='"+col+"' />");
					$innerDiv_02.addClass("large-2 small-2 columns");
				}else if(type=="80"){
						$child = $("<input type='text'  placeholder="  +title+   " id='"+col+"' />");
						$innerDiv_02.addClass("large-2 small-2 columns");
				}else if(type=="610"){
					if(args=="" || args=="." || args=="0"){
						$child = $("<input type='text'  placeholder="  +title+   " id='"+col+"' />");
						$innerDiv_02.addClass("large-2 small-2 columns");
					}else{
						var tag = getValFromArgs(args,"deftag");
						if(tag=="password"){
							$child = $("<input type='text'  placeholder="  +title+   " id='"+col+"' />");  //password -->text
							$innerDiv_02.addClass("large-4 small-8 columns");
						}
						else
						if(tag=="textarea"){
							$child = $("<textarea  placeholder="  +title+   "    id='"+col+"' cols='50' rows='8'></textarea>");
							$innerDiv_02.addClass("large-8 small-8 columns");
						}else if(tag=="img"){
							//$child = $("<input type='button' class='upload_img' id='upload_img_"+col+"' value='�ϴ�ͼƬ'/><input type='hidden' id='"+col+"' />&nbsp;&nbsp;&nbsp;&nbsp;<img id='imgurl_"+col+"' src='images/nopic.jpg' width='118' height='94' />");
							$child = $("<a class='small button radius upload_img' href='#' id='upload_img_"+col+"'>�ϴ�ͼƬ</a>");
							$innerDiv_02.after("<div class='large-4 small-4 columns margin-bottom-small'><img id='imgurl_"+col+"'src='images/foundation_back/nopic.jpg' width=200 height=90/><input type='hidden' id='"+col+"' /></div>");
							$innerDiv_02.addClass("large-1 small-4 columns");
						}else if(tag=="editor"){
							$child = $("<textarea  placeholder="  +title+   "  name='content' id='"+col+"' cols='100' rows='16' style='height:300px;'></textarea>");
							$innerDiv_02.addClass("large-8 small-8 columns margin-bottom-large");
						}else if(tag=="files"){
							//$child = $("<input type='button' class='upload_img' id='upload_img_"+col+"' value='�ϴ�ͼƬ'/><input type='hidden' id='"+col+"' />&nbsp;&nbsp;&nbsp;&nbsp;<img id='imgurl_"+col+"' src='images/nopic.jpg' width='118' height='94' />");
							
							//<input type="button" id="insertfile" value="ѡ���ļ�" class="up"/>
							//<input type="hidden" name="addins" id="addins"/>&nbsp;&nbsp;&nbsp;&nbsp;
							//<span id="url"></span>
							
							$child = $("<a class='small button radius insertfile'  id='insertfile_"+col+"'>�ϴ�����</a><input type='hidden' name='url' id='"+col+"' class='url'/>&nbsp;&nbsp;&nbsp;&nbsp;<span id='addins'></span>");
							//$innerDiv_02.after("<div class='large-4 small-4 columns margin-bottom-small'><img id='imgurl_"+col+"'src='images/foundation_back/nopic.jpg' width=200 height=90/><input type='hidden' id='"+col+"' /></div>");
							$innerDiv_02.addClass("large-1 small-4 columns");
						}else{
							$child = $("<input  type='text' placeholder="  +title+   "  id='"+col+"' />");
							$innerDiv_02.addClass("large-2 small-2 columns");
						}
					}	
				}else{
					$child = $("<input type='text' id='"+col+"' />");
					$innerDiv_02.addClass("large-2 small-2 columns");
				}
			}else{
				if(type=="49"){
					jqAjax(path,reftable,col, listcols[k]["refiid"],listcols[k]["refname"], listcols[k]["refcat"],prefix);
					$innerDiv_02.removeClass();
					$innerDiv_02.addClass("large-2 small-2 columns left");
				}else if(type=="89"){
					jqAjax(path,reftable,col, listcols[k]["refiid"],listcols[k]["refname"], "",prefix);
					$innerDiv_02.removeClass();
					$innerDiv_02.addClass("large-2 small-2 columns  left");
				}else if(type=="510"){
					$child = $("<textarea placeholder="  +title+   "  id='"+col+"' cols='20' rows='4'></textarea>");
					$innerDiv_02.removeClass();
					$innerDiv_02.addClass("large-2 small-2 columns  left");
				}
			}
			$innerDiv_02.append($child);
		}


	
}

