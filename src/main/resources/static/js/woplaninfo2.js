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
