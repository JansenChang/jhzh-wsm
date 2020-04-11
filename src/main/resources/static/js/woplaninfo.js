$(function () {
    // 查询
    $(".queryBtn").click(function () {
        var wipEntityId = $("#wipEntityId").val();
        var data={"wipEntityId": wipEntityId}
        if (wipEntityId) {
            $.ajax({
        type: "POST",
        url: "woPlayInfo",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        async: false,
        data: JSON.stringify(data),
        success: function (resultData) {
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
                        alert("成功");
                    } else {
                        alert("查无配套");
                    }
        }, error: function (jqxhr, textStatus, error) {
            console.log(error);

        }

    })
            // ajaxData('woPlayInfo', {"wipEntityId": wipEntityId}, function(resul) {
            //      var html = '';
            //         if (resultData.errorCode == 0 && resultData.resultData) {
            //             $(".listData").html('');
            //             var list = resultData.resultData.itemList;
            //             $(list).each(function (index, item) {
            //                 html += '<tr><td >' + item.wipEntityId + '</td>' +
            //                     '<td>' + item.wipEntityName + '</td>' +
            //                     '<td >' + item.sortId + '</td>' +
            //                     '<td >' + item.wipQty + '</td>' +
            //                     '<td>' + item.wipQtyPcs + '</td>' +
            //                     '<td >' + item.itemCode + '</td>' +
            //                     '<td>' + item.itemDesc + '</td></tr>'
            //             })
            //             $(".listData").append(html);
            //             tips("成功");
            //         } else {
            //             tips("查无配套");
            //         }
            // })

           
        } else {


            alert("请输入工单ID。")
        }
    })
})
