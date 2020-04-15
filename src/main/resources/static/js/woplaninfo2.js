$(function () {
    // 查询
    $(".queryBtn").click(function () {
        var wipEntityId = $("#wipEntityId").val();
        if (wipEntityId) {
            ajaxData('woPlayInfo2', {"wipEntityId": wipEntityId}, function(resultData) {
                 var html = '';
                    if (resultData.errorCode == 0 && resultData.resultData) {
                        $(".listData").html('');
                        var list = resultData.resultData.itemList;
                        var bomlist;
                        if(list.length>0){
                            bomlist=resultData.resultData.bomlist.itemList;
                        }
                        $(list).each(function (index, item) {
                            html += '<tr><td >' + item.wipEntityId + '</td>' +
                                '<td>' + item.wipEntityName + '</td>' +
                                '<td >' + item.sortId + '</td>' +
                                '<td >' + item.wipQty + '</td>' +
                                '<td>' + item.wipQtyPcs + '</td>' +
                                '<td >' + item.itemCode + '</td>' +
                                '<td>' + item.itemDesc + '</td></tr>'
                        })
                        var bomhtml;
                        if(bomlist.length>0){
                            $(bomlist).each(function (index, item) {
                                bomhtml += '<tr><td>' + item.componentItemId + '</td>' +
                                               '<td >' + item.componentItemCode + '</td>' +
                                               '<td >' + item.componentItemDesc + '</td>' +
                                               '<td>' + item.componentUnitQty + '</td></tr>'
                           })
                         }
                        $(".listData").append(html);
                        $(".bomlistData").append(bomhtml);
                        tips(resultData.resultData.msg);
                    } else {
                        tips("查无配套");
                    }
            })

           
        } else {


            tips("请输入工单ID。")
        }
    })
})
