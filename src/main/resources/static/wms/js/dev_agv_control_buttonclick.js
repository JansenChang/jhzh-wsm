/**
 * Created by Administrator on 2020/2/11 0011.
 */
//(和html关联已验证)
//全局操作页
function search_fileid(){//搜索档案号
    var fileid=$("#fileid").val();

    $.ajax({
        type : "get", //使用get方法访问后台
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=search_fileid&fileid"+fileid   , //要发送的参数
        async : false,//同步调用
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("已执行");
        }
    });

}

function search_palletid(){//搜索档案号
    var palletid=$("#palletid").val();

    $.ajax({
        type : "get", //使用get方法访问后台
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=search_palletid&palletid"+palletid   , //要发送的参数
        async : false,//同步调用
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("已执行");
        }
    });

}


//JF操作页

//入库小页
function into(){//入库按钮
    var cell=$("#cell").val();
    var palletid2=$("#palletid2").val();

    console.log(cell);
    $.ajax({
        type : "get", //使用get方法访问后台
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=into&cell"+cell+"&palletid2"+palletid2   , //要发送的参数
        async : false,//同步调用
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("已执行");
        }
    });

}

//库位转移小页
function las_move(){//移库按钮
    var type=$('input[name="type"]:checked').val();
    var srccell=$("#srccell").val();
    var dstcell=$("#dstcell").val();

    $.ajax({
        type : "get", //使用get方法访问后台
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=las_move&type"+type+"&srccell"+srccell+"&dstcell"+dstcell   , //要发送的参数
        async : false,//同步调用
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("已执行");
        }
    });

}


//异常处理小页
function backflow(){//回流按钮
    var backflowcode=1;


    $.ajax({
        type : "get", //使用get方法访问后台
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=backflow&backflowcode"+backflowcode , //要发送的参数
        async : false,//同步调用
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("已执行");
        }
    });
}




function enter1(){//搬运大盘到夹层确定按钮
    var cell2=$("#cell2").val();


    $.ajax({
        type : "get", //使用get方法访问后台
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=enter1&cell2"+cell2 , //要发送的参数
        async : false,//同步调用
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("已执行");
        }
    });
}


//大盘搬运小页
function starttransport(){//送大盘下一楼确定按钮
    var layer=$('input[name="layer"]:checked').val();
    var workid=$("#workid").val();
    var bigpalletid=$("#bigpalletid").val();

    $.ajax({
        type : "get", //使用get方法访问后台
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=starttransport&layer"+layer+"&workid"+workid+"&bigpalletid"+bigpalletid , //要发送的参数
        async : false,//同步调用
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("已执行");
        }
    });
}




//1F操作页

//出库小页
function enter2(){//出库确定按钮
    var palletid3=$("#palletid3").val();


    $.ajax({
        type : "get", //使用get方法访问后台
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=enter2&palletid3"+palletid3 , //要发送的参数
        async : false,//同步调用
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("已执行");
        }
    });
}


function enter3(){//待搬运确定按钮
    var cell3=$("#cell3").val();


    $.ajax({
        type : "get", //使用get方法访问后台
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=enter3&cell3"+cell3 , //要发送的参数
        async : false,//同步调用
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("已执行");
        }
    });
}

//大盘入库小页
function enter4(){//入库确定按钮
    var palletid4=$("#palletid4").val();


    $.ajax({
        type : "get", //使用get方法访问后台
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=enter4&palletid4"+palletid4 , //要发送的参数
        async : false,//同步调用
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("已执行");
        }
    });
}


function enter5(){//待放置确定按钮
    var cell4=$("#cell4").val();

    $.ajax({
        type : "get", //使用get方法访问后台
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=enter5&cell4"+cell4 , //要发送的参数
        async : false,//同步调用
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("已执行");
        }
    });
}