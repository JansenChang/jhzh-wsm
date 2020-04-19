/**
 * 返回字符串的长度
 * @param chars
 * @returns
 */
function checksum(chars){//返回字符串的长度
	var sum = 0; 
	for (var i=0; i<chars.length; i++){ 
	   var c = chars.charCodeAt(i); 
	   if((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)){ 
	   		sum++; 
	   }else{     
	  		sum+=2; 
	   } 
	}
	return sum;
}

/**
 * 此函数用于时间类型转换为long类型
 * @param strTime
 * @returns {Number}
 */
function timetolong(strTime){
	var date= new Date(Date.parse(strTime.replace(/-/g,"/"))); //转换成Data();
	return date.getTime()/1000;
}


/**
 * 此函数用于转换Long类型时间为指定格式
 * @param l
 * @param pattern "yyyy-MM-dd"或者"yyyy-MM-dd HH:mm:ss"
 * @returns
 */
function longtotime(l,pattern){
	Date.prototype.format = function (format) {
		var o = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"H+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S": this.getMilliseconds()
		};
		if(/(y+)/.test(format)){
			format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for(var k in o){
			if(new RegExp("(" + k + ")").test(format)){
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	};
	 
	function getFormatDate(l, pattern) {
		if(l=='' || l ==0 ||l==null ){
			return '- -';
		}
		l = parseInt(l);
		var date = new Date(l);
		if(date == undefined){
			date = new Date();
		}
		if(pattern == undefined){
			pattern = "yyyy-MM-dd HH:mm:ss";
		}
		return date.format(pattern);
	}
	
	return getFormatDate(l, pattern);
}

function gethhmmss()
{
	var now=new Date();
	var year=now.getFullYear();
	var month=now.getMonth()+1;
	var day=now.getDate();
	var hours=now.getHours();
	var minutes=now.getMinutes();
	var seconds=now.getSeconds();
	
	var str_hours='00';
	var str_minutes='00';
	var str_seconds='00';
	
	//time=year+'/'+month+'/'+day +'/'+hours+':'+minutes+':'+seconds;
	if(hours<10)
		str_hours='0'+hours; 
	else
		str_hours=''+hours; 
	if(minutes<10)
		str_minutes='0'+minutes; 
	else
		str_minutes=''+minutes; 
	
	if(seconds<10)
		str_seconds='0'+seconds; 
	else
		str_seconds=''+seconds; 

	return str_hours+':'+str_minutes+':'+str_seconds;    
	
	
}




/**
 * 判断浏览器类型
 */
function getExplorer() {
	var explorer = window.navigator.userAgent ;
	if (explorer.indexOf("MSIE") >= 0) {// ie
		return "MSIE";
	}else if (explorer.indexOf("Firefox") >= 0) {// firefox
		return "Firefox";
	}else if(explorer.indexOf("Chrome") >= 0){// Chrome
		return "Chrome";
	}else if(explorer.indexOf("Opera") >= 0){// Opera
		return "Opera";
	}else if(explorer.indexOf("Safari") >= 0){// Safari
		return "Safari";
	}
}




