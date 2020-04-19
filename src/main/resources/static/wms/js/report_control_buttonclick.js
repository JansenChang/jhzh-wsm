/**
 * Created by Administrator on 2020/2/11 0011.
 */
//report控制面板按钮点击事件(与html页面的关联已验)


//自定义菜单
//获取菜单（菜单为预先写好，用css设为隐藏）
var menu = document.getElementById("menu");

var tr;




//在菜单点击事件中再度隐藏菜单
menu.onclick=function(e){
    menu.style.display="none";
}

// 左键点击关闭自定义菜单
document.onclick=function(e){
    menu.style.display="none";
}
//搜索按钮事件
function search_1(){

    workid1=$("#workid1").val();
    palletid1=$("#palletid1").val();
    code1=$("#code1").val();
    store1=$("#store1").val();
    starttime1=$("#starttime1").val();
    endtime1=$("#endtime1").val();
    type1=$("#type1").val();
    alert(workid1+"+"+palletid1+"+"+code1+"+"+store1+"+"+starttime1+"+"+endtime1+"+"+type1);

    $.ajax({
        type : "get", //使用get方法访问后台
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=search_1&workid1="+workid1+"&palletid1="+palletid1+"&code1="+code1+"&store1="+store1  +"& starttime1="+ starttime1+"& endtime1="+ endtime1 +"& type1="+ type1  , //要发送的参数
        async : false,//同步调用
        success : function(msg) {
            if (msg.code == 200) {
                var htmlstr = '';
                $.each(msg.data, function (index, item) {
                    //物资编码	工单ID	托盘号	库位	数量	入库时间	出库时间	进出库类型
                    htmlstr += " <tr><td>" + item.goodscode + "</td><td>" + item.workid + "</td><td>" + item.palletid + "</td><td>" + item.cell + "</td><td>" + item.num + "</td><td>" + item.in_time + "</td><td>" + item.out_time + "</td><td>" + item.in_out_type + "</td></tr>";
                    $("#tb1 tbody").html(htmlstr);

                })
            }
        }
    });



    //获取tr集合
    tr = document.querySelectorAll("tr");
    //帮每个tr对象绑定右键菜单事件

    for(var i=1;i<tr.length;i++){

        tr[i].oncontextmenu = function(e){
            //禁止默认菜单
            e.preventDefault();
            var e = e || window.event;
            //把预先写好的自定义菜单设为可见
            menu.style.display="block";
            console.log(e.target);



            if (e.target.parentNode.parentNode.parentNode.id == "tb1" || e.target.parentNode.parentNode.parentNode.id == "tb3") {
                $("#unlock").hide();
                $("#lock").hide();


            } else {
                $("#unlock").show();
                $("#lock").show();
            }






            //获得事件发生坐标并把它作为菜单的绝对定位坐标
            var x = e.clientX-15;
            var y = e.clientY-10;
            menu.style.left=x/15+'rem';
            menu.style.top=y/15+'rem';

        }






    }




}


function search_2(){

    workid2=$("#workid2").val();
    palletid2=$("#palletid2").val();
    code2=$("#code2").val();
    store2=$("#store2").val();
    lockstatus=$("#lockstatus").val();
    alert(workid2+"+"+palletid2+"+"+code2+"+"+store2+"+"+lockstatus);
    console.log(workid2);


    $.ajax({
        type : "get", //使用get方法访问后台
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=search_2&workid2="+workid2+"&palletid2="+palletid2+"&code2="+code2+"&store2="+store2  +"&lockstatus="+lockstatus   , //要发送的参数
        async : false,//同步调用
        success : function(msg) {
            if (msg.code == 200) {
                var htmlstr = '';
                $.each(msg.data, function (index, item) {
                    //物资编码	工单ID	托盘号	库位	数量	入库时间	出库时间		在库时长	库存状态
                    htmlstr += " <tr><td>" + item.goodscode + "</td><td>" + item.workid + "</td><td>" + item.palletid + "</td><td>" + item.cell + "</td><td>" + item.num + "</td><td>" + item.in_time + "</td><td>" + item.out_time + "</td><td>" + item.howlong + "</td><td>" + item.locktext + "</td></tr>";
                    $("#tb2 tbody").html(htmlstr);

                })
            }
        }
    });


    //获取tr集合
    tr = document.querySelectorAll("tr");
    //帮每个tr对象绑定右键菜单事件

    for(var i=1;i<tr.length;i++){

        tr[i].oncontextmenu = function(e){
            //禁止默认菜单
            e.preventDefault();
            var e = e || window.event;
            //把预先写好的自定义菜单设为可见
            menu.style.display="block";


            if (e.target.parentNode.parentNode.parentNode.id == "tb1" || e.target.parentNode.parentNode.parentNode.id == "tb3") {
                $("#unlock").hide();
                $("#lock").hide();

            } else {
                $("#unlock").show();
                $("#lock").show();
            }






            //获得事件发生坐标并把它作为菜单的绝对定位坐标
            var x = e.clientX-15;
            var y = e.clientY-10;
            menu.style.left=x/15+'rem';
            menu.style.top=y/15+'rem';

        }






    }




}


function search_3(){

    overtime=$("#overtime").val();
    alert(overtime);

    $.ajax({
        type : "get", //使用get方法访问后台
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=search_3&overtime="+overtime   , //要发送的参数
        async : false,//同步调用
        success : function(msg) {
            if (msg.code == 200) {
                var htmlstr = '';
                $.each(msg.data, function (index, item) {
                    //物资编码	工单ID	托盘号	库位	数量	入库时间	出库时间		在库时长	超期时长
                    htmlstr += "<tr><td>" + item.goodscode + "</td><td>" + item.workid + "</td><td>" + item.palletid + "</td><td>" + item.cell + "</td><td>" + item.num + "</td><td>" + item.in_time + "</td><td>" + item.out_time + "</td><td>"+item.howlong+"</td><td>"+item.overtimetext+"</td></tr>";

                    $("#tb3 tbody").html(htmlstr);

                })
            }
        }
    });

    //获取tr集合
    tr = document.querySelectorAll("tr");
    //帮每个tr对象绑定右键菜单事件

    for(var i=1;i<tr.length;i++){

        tr[i].oncontextmenu = function(e){
            //禁止默认菜单
            e.preventDefault();
            var e = e || window.event;
            //把预先写好的自定义菜单设为可见
            menu.style.display="block";


            if (e.target.parentNode.parentNode.parentNode.id == "tb1" || e.target.parentNode.parentNode.parentNode.id == "tb3") {
                $("#unlock").hide();
                $("#lock").hide();

            } else if(e.target.parentNode.parentNode.parentNode.id == "tb2" ) {
                alert(0);
                $("#unlock").show();
                $("#lock").show();
            }






            //获得事件发生坐标并把它作为菜单的绝对定位坐标
            var x = e.clientX-15;
            var y = e.clientY-10;
            menu.style.left=x/15+'rem';
            menu.style.top=y/15+'rem';

        }






    }




}

function reset(){
    $('input[type="text"]').val("");
    $('#starttime1').val("2020-02-09T00:00:00");
    $('#endtime1').val("2020-02-10T00:00:00");
    $('select').val(10);
}

