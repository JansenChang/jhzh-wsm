$(function () {
    // 获取数据列表
        /*$.get('demo.json', function (data) {
            if (data.errorMsg == 'OK') {
                var html = '';
                var list = data.resultData;
                $(data.resultData[0].itemList).each(function (index, item) {
                    html += '<tr><td >' + item.wipEntityId + '</td>' +
                        '<td>' + item.wipEntityName + '</td>' +
                        '<td >' + item.sortId + '</td>' +
                        '<td >' + item.wipQty + '</td>' +
                        '<td>' + item.wipQtyPcs + '</td>' +
                        '<td >' + item.itemCode + '</td>' +
                        '<td>' + item.itemDesc + '</td></tr>'
                })
                $(".listData").append(html);
            }
        })*/
    // 查询
    $(".queryBtn").click(function(){
        var wipEntityId=$("#wipEntityId").val();
        if(wipEntityId){
            $.ajax({
            type: "post", //使用post方法访问后台
            url: "/wms/woPlayInfo",
            contentType:"application/json;charset=utf-8",
            dataType: "JSON",
            data: JSON.stringify({"wipEntityId":wipEntityId}) , //要发送的参数
            async: false,//同步调用
            success : function(resultData) {
                console.log(resultData);
                console.log(resultData.code);
                var html = '';
                if(resultData.errorCode==0&&resultData.resultData){
                    $(".listData").html('');
                    var list = resultData.resultData.itemList;
                     $(list).each(function (index, item) {
                    html += '<tr><td >' + item.wipEntityId + '</td>' +
                        '<td>' + item.wipEntityName + '</td>' +
                        '<td >' + item.sortId + '</td>' +
                        '<td >' + item.wipQty + '</td>' +
                        '<td>' + item.wipQtyPcs + '</td>' +
                        '<td >' + item.itemCode + '</td>' +
                        '<td>' + item.itemDesc + '</td></tr>'
                })
                $(".listData").append(html);
                   alert("成功");
                }else{
                    alert("查无配套");
                }


            },
            error:function(errorMsg){
                console.log(errorMsg);
            }
         });
        }else{/*$.post("wms/woPlayInfo",{"wipEntityId":wipEntityId},function(result){
                if(result.errorMsg=='OK'){
                    alert("查询成功。")
                }else{
                    alert(result.errorMsg)
                }
            })*/


            alert("请输入工单ID。")
        }
        console.log(wipEntityId);
    })
})
