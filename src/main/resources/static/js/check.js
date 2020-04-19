$(function() {
   // $(document).foundation();
    function cutafter2 (str){//截取字符串后面2位并转为数字
        var len=str.length;
        str=str.substring(len-2,len);
        num= parseInt(str);
        return num;
    }
    function cutafter5 (str){//截取字符串后面5位并转为数字
        var len=str.length;
        str=str.substring(len-5,len);
        num= parseInt(str);
        return num;
    }

    function cutafter3 (str){//截取字符串后面3位并转为数字
        var len=str.length;
        str=str.substring(len-3,len);
        num= parseInt(str);
        return num;
    }



  palletidtxtonblur();
        // mattertxtonblur();
        getTrayno(1,1);

$(".ask").click(function(){
    var trayno=$("#inquire").val();
    var id=$(".show_tip"); 
    referTrayno(trayno,id)

})

    function palletidtxtonblur(){//盘号输入框失焦事件
        var txts = document.getElementsByClassName("ptxt");
        var tip = document.getElementsByClassName("tips");


        for(var i = 0; i<txts.length;i++){



            var t = txts[i];

            t.index = i;


            t.onkeyup=function(){

                if(event.keyCode == 13){
                    console.log("键码"+event.keyCode);
                    var next = this.index;

                    if(this.value!=""){
                     //此处可写保存语句
                        

                        var pid=this.id;
                        var row=parseInt(document.getElementById("row").value);

                        var col=parseInt(document.getElementById("col").value);

                        var layer=cutafter2(pid) +1;

                        var trayno =document.getElementById(pid).value;
                        if(trayno[0]=="P"){
                            var trayid=cutafter5(trayno);
                        }else if(trayno[0]=="6"){
                            var trayid=cutafter3(trayno);
                        }


                        var objt={
                            'row':row,
                            'col':col,
                            'layer':layer,
                            'trayid':trayid,
                            'trayno':trayno
                        };


                    }else{
                        var pid=this.id;
                        var row=parseInt(document.getElementById("row").value);

                        var col=parseInt(document.getElementById("col").value);

                        var layer=cutafter2(pid) +1;

                        var objt={
                            'row':row,
                            'col':col,
                            'layer':layer,
                            'trayid':0,
                            'trayno':"000000"
                        };

                         
                    }

                    var  id=$(".tips").eq(next);
                    referTrayno(objt.trayno,id,objt,next,txts)

                }else if(event.keyCode == 16){//禁止条码枪默认的shift鍵
                    event.returnValue=false;
                }


            }//

            t.onclick=function(){
                this.focus();
            }


        }


    }





    $(".clearinput").click(function(){
       $('input').val("");
        var data={
            'row':$("#row").val(),
            'col':$("#col").val()
        }

        $.ajax({
            type: "post", //使用post方法访问后台
            url: "/wms/delByRowAndCol",
            contentType: "application/json;charset=utf-8",
            dataType: "JSON",
            data: JSON.stringify(data), //要发送的参数
            async: false, //同步调用
            success: function(resultData) {
                if (resultData.errorMsg == 'ok') {
                    alert('清空完成。')
                } else {

                    console.log(errorMsg);

                }

            },
            error: function(errorMsg) {
                console.log(errorMsg);
            }
        });
    })

 var rowcol=[//夹层库位行列数据
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,22,23,24],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],
        [13,14,15,16,17,18,19],
        [13,14,15,16,17,18,19],
        [13,14,15,16,17,18,19],
        [13,14,15,16,17,18,19],
        [13,14,15,16,17,18,19,20],
        [13,14,15,16,17,18,19,20],
        [13,14,15,16,17,18,19,20],
        [13,14,15,16,17,18,19,20],
        [9,10,11,12,13,14,15,16,17,18,19,20],
        [9,10,11,12,13,14,15,16,17,18,19,20],
        [13,14,15,16,17,18,19,20],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [1,2,3,4,5],
        [2,3,4,5]
    ];


    var row=document.getElementById("row");
    var col=document.getElementById("col");
    $("#row").change(function(){
      $(".tips").empty();
        $(".ptxt").val('');
            var i=row.value;
            var colI= row.value;
            if(i=='31' ||i=='32'){
                $(".grop10,.grop11").hide();
            }else{
                $(".grop10,.grop11").show();
            }
            var htmlstr="";
            // debugger;
            for(var j=0;j<rowcol[i-1].length;j++){
                // console.log(rowcol[i-1]);
                htmlstr+="<option value="+rowcol[i-1][j]+">"+rowcol[i-1][j]+"</option>";

            }
        col.innerHTML=htmlstr;

        getTrayno(i,rowcol[i-1][0]);
    })

      $("#col").change(function(){
        $(".tips").empty();
        $(".ptxt").val('');
            var i=col.value;
            var row=$("#row").val();
         getTrayno(row,i);
      })


    function keyInput(dataList){
        $(dataList).each(function(index, val) {
            $("#player_"+index).val(val);
        });
    }

    function getTrayno(row,col){
                var dataArr = {
            "row":row,
            "col":col
        }

        $.ajax({
            type: "post", //使用post方法访问后台
            url: "/wms/queryTaryByRowCol",
            contentType:"application/json;charset=utf-8",
            dataType: "JSON",
            data:  JSON.stringify(dataArr), //要发送的参数
            async: false,//同步调用
            success : function(resultData) {
                $(resultData.resultData).each(function(i,item){
                        var num = item.layer -1
                        if(item.trayno!='000000'){
                            if(num<10){
                            $("#player0"+num).val(item.trayno);
                        }else{
                            $("#player"+num).val(item.trayno);
                        }

                        }
                
                })
                // keyInput(dataList);
            },
            error:function(errorMsg){
                console.log(errorMsg);
            }
        });
    }

   // 存储托盘号
    function save(objt, next, txts) {
        $.ajax({
            type: "post", //使用post方法访问后台
            url: "/wms/updateData",
            contentType: "application/json;charset=utf-8",
            dataType: "JSON",
            data: JSON.stringify(objt), //要发送的参数
            async: false, //同步调用
            success: function(resultData) {
                if (resultData.errorMsg == 'ok') {
                  $(".tips").empty();
                  if(objt.row == '31' || objt.row == '32'){
                      if(next=='9'){
                        var x = Number($('#col').val()) + 1;
                        $('#col').find('option[value=' + x + ']').prop('selected', true);
                        txts[0].focus(); //第一个重新获得焦点
                        getTrayno(objt.row,x);
                        return;
                      }else {
                        txts[next + 1].focus(); //下一个输入框获得焦点
                    }
                    if(objt.row == '31' && next=='0'){
                        txts[next + 2].focus();
                    }
                  }else if (next == (txts.length - 1)) {
                        var x = Number($('#col').val()) + 1;
                        $('#col').find('option[value=' + x + ']').prop('selected', true);
                        txts[0].focus(); //第一个重新获得焦点
                        getTrayno(objt.row,x);
                        return;
                    } else {
                        txts[next + 1].focus(); //下一个输入框获得焦点
                    }
                }


            },
            error: function(errorMsg) {
                alert('请输入正确的盘号。')
                console.log(errorMsg);
            }
        });
    }

    // 查询托盘号
    function referTrayno(trayno, id, objt, next, txts) {
        var traynoData = {
            "trayno": trayno
        }
        console.log(traynoData.trayno.length);
        if(traynoData.trayno.length>7){
            id.empty().html('请输入合规的盘号。');
            return
        }
        if (trayno != '000000') {
            $.ajax({
                type: "post",
                url: "/wms/queryByTrayno",
                contentType: "application/json;charset=utf-8",
                dataType: "JSON",
                data: JSON.stringify(traynoData), //要发送的参数
                async: false, //同步调用
                success: function(resultData) {
                    if (resultData.resultData.length > 0) {
                        var row = "",
                            col = "",
                            layer = "";
                        var ku = [];
                        $(resultData.resultData).each(function(i, item) {
                            if (item.row < 10) {
                                item.row = '0' + item.row;
                            }
                            if (item.col < 10) {
                                item.col = '0' + item.col;
                            }
                            if (item.layer < 10) {
                                item.layer = '0' + item.layer;
                            }

                            var hao = item.row + '-' + item.col + '-' + item.layer;
                            
                            ku.push(hao);
                        })
                        var place = "";
                        $(ku).each(function(num, kukiu) {
                            place = place + kukiu + ' ';
                        })

                        id.empty().html('目标托盘在<span>' + place + '</span>号库位！');
                        
                    } else {

                        if (objt, next, txts) {
                            save(objt, next, txts);
                        } else {
                            id.html('当前盘号不存在。');
                        }

                    }
                    // keyInput(dataList);
                },
                error: function(errorMsg) {
                    console.log(errorMsg);
                }
            });
        } else {
            save(objt, next, txts);
            console.log('kongpan');
            id.empty();
        }
    }


})