$(function () {
    let oId = 1;
    var CageInterval;
    var CabineInterval;
    var  traynoInterval;
    // 获取当前时间
    function getNow(s) {
        return s < 10 ? '0' + s : s;
    }
    setInterval(function () {
        var myDate = new Date();

        var year = myDate.getFullYear();        //获取当前年
        var month = myDate.getMonth() + 1;   //获取当前月
        var date = myDate.getDate();            //获取当前日


        var h = myDate.getHours();              //获取当前小时数(0-23)
        var m = myDate.getMinutes();          //获取当前分钟数(0-59)
        var s = myDate.getSeconds();

        var now = year + '-' + getNow(month) + "-" + getNow(date) + " " + getNow(h) + ':' + getNow(m) + ":" + getNow(s);
        $(".time").empty().html(now);
    }, 1000)

    // 点击切换显示内容
    $('.btn').click(function () {
        oId = $(this).attr('data-id');
        $(this).addClass('activ').siblings().removeClass('activ');
        window.clearInterval(CageInterval);
        window.clearInterval(traynoInterval);
        window.clearInterval(CabineInterval);
        if (oId == 1) {
            traynoFun(oId)
            traynoInterval = setInterval(function () {
                traynoFun(oId)
            }, 5000)
        } else if (oId == 5 || oId == 6) {
            getCage(oId);
            CageInterval = setInterval(function () {
                getCage(oId)
            }, 5000)
        }else if(oId == 0 ){
            if($(".wip").val()){
                 getQitao(oId);
            }else{
                alert("请输入正确的外层工单。")
            }
           
        }else{
            getCabine(oId)
            CabineInterval = setInterval(function () {
                getCabine(oId)
            }, 5000)
        }

    })

    // traynoFun();
    // traynoInterval = setInterval(function () {
    //     traynoFun(oId)
    // }, 5000)

    $.ajax({
        type: "POST",
        url: "http://192.168.43.152:8093/wms/wmsInvInFlow",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        async: false,
        data: JSON.stringify({"pagenum":1,"pagesize": 10}),
        success: function (resul) {
            let dataList = (resul.resultData.var15).reverse();
            let rowList = chunk(dataList, 12);
            // var partwoidList = [];
            $(rowList).each(function (i, itme) {
                itme[key = 'id'] = itme.list[0].row + '-' + itme.list[0].col;
                itme.list.reverse();

            })
            localStorage.setItem('rowList', JSON.stringify(rowList));
            htmlData(1, rowList);
        },
        error: function (jqxhr, textStatus, error) {
            console.log(error);

        }
    })

    // 选择托盘号
    function traynoFun() {
        $.ajax({
            type: "POST",
            url: "wms/dynamicRepertroy",
            contentType: "application/json;charset=utf-8",
            dataType: "JSON",
            async: false,
            data: '',
            success: function (resul) {
                let dataList = (resul.resultData.var15).reverse();
                let rowList = chunk(dataList, 12);
                // var partwoidList = [];
                $(rowList).each(function (i, itme) {
                    itme[key = 'id'] = itme.list[0].row + '-' + itme.list[0].col;
                    itme.list.reverse();

                })
                localStorage.setItem('rowList', JSON.stringify(rowList));
                htmlData(1, rowList);
            },
            error: function (jqxhr, textStatus, error) {
                console.log(error);

            }
        })
    }


    // 全库有物资
    function getCabine(oId,BomList) {
    $.ajax({
        type: "POST",
        url: "wms/getCabinetData",
        contentType: "application/json;charset=utf-8",
        dataType: "JSON",
        async: false,
        data: '',
        success: function (resul) {
            var list = resul.resultData.reverse();
            var BomHtml=[];
            $(list).each(function (i, itme) {
                itme[key = 'id'] = itme.ilsCellDtos[0].row + '-' + itme.ilsCellDtos[0].col;
                if(BomList){
                    var ilsCellDtos= itme.ilsCellDtos;
                    for (var j = 0; j < ilsCellDtos.length; j++) {
                            for (var k = 0; k < BomList.length; k++) {
                                if (ilsCellDtos[j].partid == BomList[k]) {
                                    if($.inArray(itme,BomHtml)==-1) {  
                                        BomHtml.push(itme)  
                                         } 
                                }
                            }
    
                    }
                }
            })
            if(BomList){
                htmlData(3, BomHtml)
            }else{
                htmlData(oId, list)
            }
            
            console.log(BomHtml);
        },
        error: function (jqxhr, textStatus, error) {
            console.log(error);

        }
    })
    // console.log(BomList);
    }

    // 查询工单齐套
    function getQitao(oId){
        var BomList= [];
        var wipEntityId = $(".wip").val();
        $.ajax({
            type: "POST",
            url: "wms/queryItemBomInfo",
            contentType: "application/json;charset=utf-8",
            dataType: "JSON",
            async: false,
            data: JSON.stringify({"wipEntityId": wipEntityId}),
            success: function (resul) {
                var list=resul.resultData.bomlist.itemList;
                $(list).each(function(i,item){
                    var code = item.componentItemCode.replace('-', '');
                    BomList.push(code);
                })
               
            },
            error: function (jqxhr, textStatus, error) {
                console.log(error);
    
            }
        })  
        getCabine(oId,BomList);
    }



    // 吊笼
    function getCage(oId) {
        $.ajax({
            type: "POST",
            url: "wms/getCageData",
            contentType: "application/json;charset=utf-8",
            dataType: "JSON",
            async: false,
            data: '',
            success: function (resul) {
                var longCage = resul.resultData.longCage;
                var shortCage = resul.resultData.shortCage;
                var newLongCage = [], newShortCage = [];
                var rowList = JSON.parse(localStorage.getItem('rowList'));
                console.log(resul.resultData)
                if (longCage.length > 0) {
                    for (var i = 0; i < longCage.length; i++) {
                        var id = longCage[i].row + '-' + longCage[i].col;
                        for (var j = 0; j < rowList.length; j++) {
                            if (id == rowList[j].id) {
                                var list = rowList[j].list;
                                for (var o = 0; o < list.length; o++) {
                                    if (longCage[i].layer == list[o].layer) {
                                        list[o] = longCage[i];
                                        newLongCage.push(rowList[j]);
                                    }
                                }

                            }
                        }
                    }
                }
                if (shortCage.length > 0) {
                    for (var i = 0; i < shortCage.length; i++) {
                        var id = shortCage[i].row + '-' + shortCage[i].col;
                        for (var j = 0; j < rowList.length; j++) {
                            if (id == rowList[j].id) {
                                var list = rowList[j].list;
                                for (var o = 0; o < list.length; o++) {
                                    if (shortCage[i].layer == list[o].layer) {
                                        list[o] = shortCage[i];
                                        newShortCage.push(rowList[j]);
                                    }
                                }
                            }
                        }
                    }
                }
                htmlData(oId, rowList)
                if (oId == 5) {
                    htmlData(oId, newLongCage)
                } else {
                    htmlData(oId, newShortCage)
                }
            },
            error: function (jqxhr, textStatus, error) {
                console.log(error);

            }
        })
    }

    function htmlData(oId, rowList) {
        var html = '';
        if (oId == 1) {
            $(rowList).each(function (i, itme) {
                html += ' <tr>' +
                    '<td>' + itme.id + '</td>';
                $(itme.list).each(function (j, valList) {
                    if (valList.partwoid == 0) {
                        html += '<td >' + (valList.trayno == '000000' ? '-' : valList.trayno) + '</td>';
                    } else {
                        html += '<td class="pink">' + valList.trayno + '</td>';
                    }

                })

                html += '</tr>'

            })
        } else {
            $(rowList).each(function (i, itme) {
                html += ' <tr>' +
                    '<td>' + itme.id + '</td>';
                    if(oId == 5 || oId == 6){
                        var conList =itme.list;
                    }else{
                        var conList =itme.ilsCellDtos;
                    }
                $(conList).each(function (j, valList) {
                    if (oId == 3) {
                        if (valList.partid == 0) {
                            html += '<td >' + (valList.partid == '0' ? '-' : valList.partid) + '</td>';
                        } else {
                            html += '<td class="pink">' + valList.partid + '</td>';
                        }
                    } else if (oId == 4) {
                        if (valList.partnum == 0) {
                            html += '<td >' + (valList.partnum == '0' ? '-' : valList.partnum) + '</td>';
                        } else {
                            html += '<td class="pink">' + valList.partnum + '</td>';
                        }
                    } else {
                        if (valList.partwoid == 0) {
                            html += '<td >' + (valList.partwoid == '0' ? '-' : valList.partwoid) + '</td>';
                        } else {
                            html += '<td  class="pink">' + valList.partwoid + '</td>';
                        }
                    }


                })

                html += '</tr>'

            })
        }
        $(".listData").empty().html(html);
    }

    function chunk(arr, num) {
        let j = 0,
            o = j;
        let newArray = [];

        while (j < arr.length) {
            j += num;
            var a = {
                'id': num,
                'list': arr.slice(o, j)
            }

            newArray.push(a);
            o = j;
        }
        return newArray;
    }
})