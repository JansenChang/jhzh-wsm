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
    // 堆垛机模式
    pilerState(num) {
        switch (num) {
            case '0':
                return '未选择'
                break;
            case '1':
                return '手动'
                break;
            case '2':
                return '自动'
                break;
            case '3':
                return '联机自动'
                break;
        }
    }
    // 堆垛机类型
    pilerType(num) {
        switch (num) {
            case '0':
                return '-'
                break;
            case '1':
                return '入库'
                break;
            case '2':
                return '出库'
                break;
            case '3':
                return '移库'
                break;
        }
    }
    getPartdate(time) {
        var date1 = new Date(time);
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + 30);
        return date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate() + '  ' + date2.getHours() + ":" + date2.getMinutes() + ":" + date2.getSeconds()
    }
    getMousePos(event) {
        var _this = this;
        var html = '';
        var e = event || window.event;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;

        // 堆垛机
        if (_this.explain == 'piler') {
            $(".title_name").empty().html('堆垛机')
            html += '<table class = "table table-responsive table-bordered table-hover piler_box" width = "100%">' +
                '<tr><th width="25%"> 控制模式 </th><td width="25%">' + _this.pilerState(_this.dataobj[0]) + ' </td><th width="25%"> 作业类型 </th ><td width="25%" > ' + _this.pilerType(_this.dataobj[1]) + ' </td></tr>' +
                '<tr><th width="25%"> 警报 </th><td width="25%">' + pilerTips(_this.dataobj[2]) + '</td><th width = "25%"> 取货站台 </th> <td width="25%">' + (_this.dataobj[3] ? _this.dataobj[3] : '-') + '</td></tr>' +
                '<tr><th width="25%"> 入库号 </th><td width="25%"> ' + _this.dataobj[4] + ' </td><th width="25%">出库号 </th><td width="25%"> ' + _this.dataobj[5] + ' </td></tr>' +
                '<tr><th width="25%"> 任务号 </th><td width="25%"> ' + (_this.dataobj[6]) + ' </td><th width="25%"> 当前位置 </th><td width="25%"> ' + _this.dataobj[7] + ' </td></tr>' +
                '</table>';
            $(".plist").empty().html(html).show();
            $(".whcell_15f").show();
        }

        //一楼库位查询
        if (_this.explain == 'pilerSeat' || _this.explain == 'pick' ) {
            $(".title_name").empty().html('一楼' + _this.name + '库位');
            html += '<table class = "table table-responsive table-bordered table-hover piler_box" width = "100%">' +
                '<tr><th width="15%">托盘号</th><td width="35%"><input type="text" id="newtrayno" value="' + (_this.dataobj.trayno ? _this.dataobj.trayno : '-') + '"></td><th width="15%">物料号</th><td><input type="text" id="newpartid" value="' + (_this.dataobj.partid ? _this.dataobj.partid : '-') + '"></td></tr>' +
                '<tr><th>工单号</th><td><input type="text" id="newpartwoid" value="' + (_this.dataobj.partwoid ? _this.dataobj.partwoid : '-') + '"></td><th>数量</th><td><input type="text" id="newpartnum" value="' + (_this.dataobj.partnum ? _this.dataobj.partnum : '-') + '"></td></tr>' +
                '<tr><th>时间</th><td><input type="text" id="newpartdate" value="' + _this.dataobj.partdate + '"></td><th></th><td></td></tr>' +
                '</table><div class="btn_box"></div>';
                // <button type="button" class="btn btn-success">保存</button>
            $(".list").empty().html(html).show();
            $(".whcell_15f").show();
            var strs=_this.name.split("");
            // 修改一楼数据库
            $(".btn-success").click(function () {
                var changeData = {
                    "app": 900,
                    "areano": 10,
                    "cmd": 0,
                    "cmdstatus": 0,
                    "col": strs[2]+strs[3],
                    "id": _this.name,
                    "layer": strs[4]+strs[5],
                    "locked": 0,
                    "lockedtype": 0,
                    "name": _this.name,
                    "partdate":$("#newpartdate").val(),
                    "partid":$("#newpartid").val(),
                    "partlotdiv": 0,
                    "partlotid": 0,
                    "partnum": $("#newpartnum").val(),
                    "partwoid":$("#newpartwoid").val(),
                    "row": strs[0]+strs[1],
                    "trayid": 0,
                    "trayno": $("#newtrayno").val(),
                    "unt": 9,
                }
                console.log(changeData);
                $.ajax({
                    type: "POST",
                    url: url+"/wms/updateRepertroy",
                    contentType: "application/json;charset=utf-8",
                    dataType: "JSON",
                    async: false,
                    data: JSON.stringify(changeData),
                    success: function (resul) {
                       if(resul.errorMsg == "ok"){
                           alert('修改成功')
                       }
                    },
                    error: function (jqxhr, textStatus, error) {
                        console.log(error);
                
                    }
                
                })
            })

        }


    }

    draw(draw) {
        var _this = this;
        if (_this.svgtype == "rect") {
            var obj = draw.rect(this.w, this.h);
            var piler_1 = localStorage.getItem("piler_1"),
                piler_2 = localStorage.getItem("piler_2");

            if (piler_1 && piler_2) {
                if (_this.name == _this.piler_1) {
                    _this.svgobj = obj.addClass('lv');
                }
                if (_this.name == _this.piler_2) {
                    _this.svgobj = obj.addClass('lv');
                }
            }




            // 警报
            if ((_this.dataobj) && (_this.dataobj[2] > 0)) {
                if (_this.explain == 'piler') {
                    _this.svgobj = obj.addClass('my-clsss');
                    var tip = pilerTips(_this.dataobj[2])
                    $(".piler").empty().html(_this.text + '：' + tip).show();
                }
            }
            // 是否到期
            if (_this.dataobj.partdate) {
                var startTime = new Date(Date.parse(_this.getPartdate(_this.dataobj.partdate)));
                var endTime = new Date();

                if (startTime < endTime) {
                    _this.svgobj = obj.addClass('my-tips');
                }
            }
            // 堆垛机位移
            if (_this.explain == 'piler') {
                if (_this.dataobj[1] == 0) {
                    _this.changecolor(color2);
                }

                if (_this.dataobj[10] == 2) {
                    _this.changeposition(_this.dataobj[10] * 108, _this.y);
                } else if (_this.dataobj[10] == 3) {
                    _this.changeposition(_this.dataobj[10] * 115, _this.y);
                } else if (_this.dataobj[10] == 4) {
                    _this.changeposition(_this.dataobj[10] * 118, _this.y);
                } else if (_this.dataobj[10] == 5) {
                    _this.changeposition(_this.dataobj[10] * 121, _this.y);
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
console.log(dataarr)
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