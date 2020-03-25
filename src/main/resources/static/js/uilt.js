
function page(data,fun) {
    if (pagenum <2 || pagenum == data.pagenum) {
        $(".nextPage").attr("disabled", "disabled").removeClass("btn-primary").addClass("btn-default");
    }
    if (pagenum <2 ){
        $(".prevPage").attr("disabled", "disabled").removeClass("btn-primary").addClass("btn-default");
    }
    // 分页
    $(".nextPage").off('click').click(function (e) {
        e.preventDefault();
        data.pagenum = data.pagenum + 1;
        $(".num").html(data.pagenum);
        fun();
        if (pagenum == 1 || pagenum == data.pagenum) {
            $(this).attr("disabled", "disabled").removeClass("btn-primary").addClass("btn-default");
        }
        if (data.pagenum > 1) {
            $(".prevPage").removeAttr("disabled").removeClass("btn-default").addClass("btn-primary");
        }
    })
    $(".prevPage").off('click').click(function (e) {
        e.preventDefault();
        data.pagenum = data.pagenum - 1;
        $(".num").html(data.pagenum);
        fun();
        if (pagenum == 1 || data.pagenum == 1) {
            $(this).attr("disabled", "disabled").removeClass("btn-primary").addClass("btn-default");
        } else {
            $(".nextPage").removeAttr("disabled").removeClass("btn-default").addClass("btn-primary");
        }
    })
}



function ajaxData(url, data, fun) {
    $.ajax({
        type: "POST",
        url: "http://192.168.43.152:8093/wms/" + url,
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        async: false,
        data: JSON.stringify(data),
        success: function (resul) {
            pagenum = resul.resultData.pages;
            if (pagenum == 1) {
                $(".nextPage,.prevPage").attr("disabled", "disabled").removeClass("btn-primary").addClass("btn-default");
            }
            fun(resul);
        }, error: function (jqxhr, textStatus, error) {
            console.log(error);

        }

    })
}