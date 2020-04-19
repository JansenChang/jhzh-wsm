//画图所用对象数组,为全局变量
var mapnode_10f = [];
var mapnode_15f = [];
var mapnode_hov = [];
var mapnode_road = [];
var mapnode_agv = [];
var mapnode_srm = [];
var mapnode_pick = [];
var idList;
var infs;
var color1 = "#00bf24";//有盘或者有料
var color2 = "#f39e18";//运行中

class mapNode { //定义了一个绘制节点类
    static svgdraw;
    constructor(arr) { //constructor是一个构造方法，用来接收参数
        this.id = arr[0];
        this.objtype = arr[1];
        this.objid = arr[2];
        this.name = arr[3];
        this.text = arr[4];
        this.svgtype = arr[5];
        this.w = arr[6];
        this.h = arr[7];
        this.x = arr[8];
        this.y = arr[9];
        this.svgobj = arr[10];
        this.dataobj = arr[11];
        this.color = arr[12];
        if (arr[13]) {
            this.explain = arr[13];
        }
    }

    changesvgtype(type) {
        this.svgtype = type;
    }
    dataobjadd(key, value) { //添加或改变dataobj项
        this.dataobj[key] = value;
    }

    getdataobjkey(key) { //通过dataobj里等于参数key的键取其值
        return this.dataobj[key];
    }

    changecolor(color) { //改变svg颜色
        this.color = color;
    }
    changetext(text) { //改变svg文字
        this.text = text;
    }
    changeposition(lastx, lasty) { //改变位置
        this.x = lastx;
        this.y = lasty;
    }
    changepositionX(lastx) { //改变X坐标
        this.x = lastx;
    }
    changepositionY(lasty) { //改变X坐标
        this.y = lasty;
    }

    update_whxy(w, h, x0, y0, w_ratio, h_ratio) {
        this.w = this.w * w_ratio - 1;
        this.h = this.h * h_ratio - 1;
        this.x = x0 + this.x * w_ratio;
        this.y = y0 + this.y * h_ratio;
    }
    getPartdate(time) {
        var date1 = new Date(time);
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + 30);
        return date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate() + '  ' + date2.getHours() + "-" + date2.getMinutes() + "-" + date2.getSeconds()
    }
    getMousePos(event) {
        var _this = this;
        var html = '';
        var e = event || window.event;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;

        if (_this.explain == 'cabinet') {
            var dynData = {
                "rowandcol": _this.name
            }
            $.ajax({
                type: "POST",
                url: url + "/wms/dynamicRepertroyById",
                contentType: "application/json;charset=utf-8",
                dataType: "JSON",
                async: false,
                data: JSON.stringify(dynData),
                success: function (resul) {
                    $(".title_name").empty().html('夹层' + _this.name + '立库');
                    html += '<tr><th></th><th>托盘号</th><th>工单号</th><th>物料号</th><th width="7%">数量</th><th width="25%">时间</th></tr>';
                    $(resul.resultData).each(function (i, obj) {

                        var startTime = new Date(Date.parse(_this.getPartdate(_this.dataobj.partdate)));
                        var endTime = new Date();

                        if (startTime < endTime) {
                             html += '<tr class="bg-pink"><td>' + (i + 1) + '层</td><td><input type="text" id="newtrayno_'+ i +'" value="' + obj.trayno + '"></td><td><input type="text" id="newpartwoid_'+ i +'" value="' + (obj.partwoid == 0 ? '-' : obj.partwoid) + '"></td><td><input type="text" id="newpartid_'+ i +'" value="' + (obj.partid == 0 ? '-' : obj.partid) + '"></td><td><input type="text" id="newpartnum_'+ i +'" value="' + (obj.partnum == 0 ? '-' : obj.partnum) + '"></td><td><input type="text" id="newpartdate_'+ i +'" value="' + obj.partdate + '"></td></tr>'
                        }

                        html += '<tr><td>' + (i + 1) + '层</td><td><input type="text" id="newtrayno_'+ i +'" value="' + obj.trayno + '"></td><td><input type="text" id="newpartwoid_'+ i +'" value="' + (obj.partwoid == 0 ? '-' : obj.partwoid) + '"></td><td><input type="text" id="newpartid_'+ i +'" value="' + (obj.partid == 0 ? '-' : obj.partid) + '"></td><td><input type="text" id="newpartnum_'+ i +'" value="' + (obj.partnum == 0 ? '-' : obj.partnum) + '"></td><td><input type="text" id="newpartdate_'+ i +'" value="' + obj.partdate + '"></td></tr>'
                    })
                    $(".piler_box").empty().html(html);
                    $(".whcell_15f").show();

                    var strs = _this.name.split("");
                    // 修改一楼数据库
                    $(".btn-success").click(function () {
                        var orderID=$(this).attr("orderID");
                        var changeData = {
                            "app": 900,
                            "areano": 10,
                            "cmd": 0,
                            "cmdstatus": 0,
                            "col": strs[2] + strs[3],
                            "id": _this.name,
                            "layer": strs[4] + strs[5],
                            "locked": 0,
                            "lockedtype": 0,
                            "name": _this.name,
                            "partdate": $("#newpartdate_"+orderID).val(),
                            "partid": $("#newpartid_"+orderID).val(),
                            "partlotdiv": 0,
                            "partlotid": 0,
                            "partnum": $("#newpartnum_"+orderID).val(),
                            "partwoid": $("#newpartwoid_"+orderID).val(),
                            "row": strs[0] + strs[1],
                            "trayid": 0,
                            "trayno": $("#newtrayno_"+orderID).val(),
                            "unt": 9,
                        }
                        $.ajax({
                            type: "POST",
                            url: url + "/wms/updateRepertroy",
                            contentType: "application/json;charset=utf-8",
                            dataType: "JSON",
                            async: false,
                            data: JSON.stringify(changeData),
                            success: function (resul) {
                                if (resul.errorMsg == "ok") {
                                    alert('修改成功')
                                }
                            },
                            error: function (jqxhr, textStatus, error) {
                                console.log(error);

                            }

                        })
                    })
                    },
                        error: function (jqxhr, textStatus, error) {
                            console.log(error);

                        }

            })
        }


    }

    draw(draw) {
        var _this = this;
        var html = '';
        if (_this.svgtype == "rect") {
            var obj = draw.rect(this.w, this.h);
            // 是否到期
            if (_this.dataobj.partdate) {
                var startTime = new Date(Date.parse(_this.getPartdate(_this.dataobj.partdate)));
                var endTime = new Date();

                if (startTime < endTime) {
                    _this.svgobj = obj.addClass('my-tips');
                }
            }

            _this.svgobj = obj.fill(_this.color).move(_this.x, _this.y).addClass('pointer');



            _this.svgobj.click(function (event) {
                _this.getMousePos(event)
            })

        } else if (this.svgtype == "text") {

            this.svgobj = draw.text(this.text).fill(this.color).move(this.x, this.y).size(15);
        }
    }
}



//创建描绘对象节点的函数,创建一个装有对象节点的数组
function create_node(dataarr) { //参数分别为:待转换数组\待改变文字索引\文字改变后值(字符串类型)\待改变颜色索引\颜色改变后值(字符串类型)
    var out = [];

    dataarr.map(function (item) {
        var c = new mapNode(item);
        out.push(c);
    });
    switch (dataarr) {
        case mapnode_pri_10f:
            mapnode_10f = out;
            break;
        case mapnode_pri_15f:
            mapnode_15f = out;
            break;
        case mapnode_pri_hov:
            mapnode_hov = out;
            break;
        case mapnode_pri_road:
            mapnode_road = out;
            break;
        case mapnode_pri_agv:
            mapnode_agv = out;
            break;
        case mapnode_pri_srm:
            mapnode_srm = out;
            break;
        case mapnode_pri_pick:
            mapnode_pick = out;
            break;
    }
}