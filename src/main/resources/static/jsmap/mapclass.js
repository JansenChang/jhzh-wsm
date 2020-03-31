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
    CAGEtpye(num) {
        switch (num) {
            case '111':
                return '330101'
                break;
            case '112':
                return '330102'
                break;
            case '211':
                return '220101'
                break;
            case '212':
                return '220102'
                break;
            case '221':
                return '210101'
                break;
            case '222':
                return '240102'
                break;
            case '311':
                return '250101'
                break;
            case '312':
                return '250102'
                break;
            case '313':
                return '250103'
                break;
            case '314':
                return '250104'
                break;
            case '315':
                return '250105'
                break;
            case '316':
                return '250106'
                break;
            case '321':
                return '260101'
                break;
            case '322':
                return '260102'
                break;
            case '323':
                return '260103'
                break;
            case '324':
                return '260104'
                break;
            case '325':
                return '260105'
                break;
            case '326':
                return '260106'
                break;
        }
    }
    conveyorTips(num) {
        switch (num) {
            case '0':
                return '无'
                break;
            case '1':
                return '指令超出范围！'
                break;
            case '2':
                return 'B41有料盘报警！'
                break;
            case '3':
                return 'B21有料盘报警！'
                break;
        }
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
    getPartdate(time){
        var date1 = new Date(time);
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + 30);
        return date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate()+ '  ' +date2.getHours()+ ":"+ date2.getMinutes()+ ":"+ date2.getSeconds()
    }
    getMousePos(event) {
        var _this = this;
        var html = '';
        var e = event || window.event;
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var x = e.pageX || e.clientX + scrollX;
        var y = e.pageY || e.clientY + scrollY;

        var dynData = {
            "rowandcol": _this.name
        }
        // 夹层立柜

        if ((_this.explain == 'cabinet')) {
            $.ajax({
                type: "POST",
                url: url + "/wms/dynamicRepertroyById",
                contentType: "application/json;charset=utf-8",
                dataType: "JSON",
                async: false,
                data: JSON.stringify(dynData),
                success: function (resul) {
                    console.log(resul);

                    html += '<h1>' + _this.objid + '库位详情 <span class="clos">x</span></h1>' +
                        '<table class = "table-responsive" width = "100%">' +
                        '<tr><th></th><th>托盘号</th><th>工单号</th><th>物料号</th><th>数量</th><th>到期时间</th></tr>';
                    $(resul.resultData).each(function (i, obj) {
                        html += '<tr><td>' + (i + 1) + '层</td><td>' + obj.trayno + '</td><td>' + (obj.partwoid == 0 ? '-' : obj.partwoid) + '</td><td>' + (obj.partid == 0 ? '-' : obj.partid) + '</td><td>' + (obj.partnum == 0 ? '-' : obj.partnum) + '</td><td>' + (obj.partdate?_this.getPartdate(obj.partdate):'-') + '</td></tr>'
                    })
                    html += '<table>';
                    $(".tips").empty().html(html).show();
                },
                error: function (jqxhr, textStatus, error) {
                    console.log(error);

                }

            })
        }

        // if (_this.dataobj) {

        // 堆垛机
        if (_this.explain == 'piler') {

            html += '<h1>堆垛机  <span class="clos">x</span></h1>' +
                '<table class = "table-responsive" width = "100%">' +
                '<tr><th width="25%"> 控制模式 </th><td width="25%">' + _this.pilerState(_this.dataobj[0]) + ' </td><th width="25%"> 作业类型 </th ><td width="25%" > ' + _this.pilerType(_this.dataobj[1]) + ' </td></tr>' +
                '<tr><th width="25%"> 警报 </th><td width="25%">' + pilerTips(_this.dataobj[2]) + '</td><th width = "25%"> 取货站台 </th> <td width="25%">' + (_this.dataobj[3] ? _this.dataobj[3] : '-') + '</td></tr>' +
                '<tr><th width="25%"> 入库号 </th><td width="25%"> ' + _this.dataobj[4]  + ' </td><th width="25%">出库号 </th><td width="25%"> ' + _this.dataobj[5]  + ' </td></tr>' +
                '<tr><th width="25%"> 任务号 </th><td width="25%"> ' + (_this.dataobj[6]) + ' </td><th width="25%"> 当前位置 </th><td width="25%"> ' + _this.dataobj[7] + ' </td></tr>' +
                '<table>';
            $(".tips").empty().html(html).show();
        }

        // 吊笼
        if ((_this.explain == '1#') || (_this.explain == '2#')) {


            html += '<h1>' + _this.explain + '吊笼  <span class="clos">x</span>' + _this.id + '</h1>' +
                '<table class = "table-responsive" width = "100%">' +
                '<tr><th width="25%"> 控制模式 </th><td width="25%">' + (_this.dataobj[1] == 1 ? '自动模式' : '手动模式') + ' </td><th width="25%"> 任务状态 </th ><td width="25%" > ' + (_this.dataobj[0] == 1 ? '空闲' : '操作中') + ' </td></tr>' +
                '<tr><th width="25%"> 警报 </th><td width="25%">' + (_this.dataobj[2] == 0 ? '无' : '提升机指令超出范围！') + '</td><th width = "25%"> 是否允许放载具 </th> <td width="25%">' + (_this.dataobj[3] == 1 ? '允许放' : '不允许放') + '</td></tr>' +
                '<tr><th width="25%"> 提升机任务状态 </th><td width="25%"> ' + (_this.dataobj[9] == 1 ? '已完成' : '未完成') + ' </td><th width="25%">指令任务</th><td width="25%"> ' + (_this.dataobj[4] == 1 ? '取货' : '放货') + ' </td></tr>' +
                '<table>';
            $(".tips").empty().html(html).show();
        }
        // 传送带
        if ((_this.explain == 'conveyor') || (_this.explain == 'conveyor_#')) {
            html += '<h1>' + _this.name + '传送带  <span class="clos">x</span>' + _this.id + '</h1>' +
                '<table class = "table-responsive" width = "100%">' +
                '<tr><th width="25%"> 是否有盘 </th ><td width="25%" > ' + (_this.dataobj[1] == 1 ? '有盘' : '无') + ' </td><th width="25%"> 托盘号 </th><td width="25%">' + (_this.dataobj[3] == 0 ? '-' : _this.dataobj[3]) + '</td></tr>';
            if (_this.dataobj[4]) {
                html += '<tr><th width="25%"> 是否放料 </th><td width="25%">' + (_this.dataobj[4] == 0 ? '没有放料' : '完成') + '</td></tr>'
            }
            html += '<table>';
            $(".tips").empty().html(html).show();

        }
        //一楼库位查询
        if(_this.explain=='pilerSeat'){
                    html += '<h1>' + _this.name + '库位详情 <span class="clos">x</span>   </h1>' +
                        '<table class = "table-responsive" width = "100%">' +
                        '<tr><th>托盘号</th><td>'+ (_this.dataobj.trayno?_this.dataobj.trayno:'-') +'</td><th>物料号</th><td>'+ (_this.dataobj.partid?_this.dataobj.partid:'-') +'</td></tr>'+
                        '<tr><th>工单号</th><td>'+ (_this.dataobj.partwoid?_this.dataobj.partwoid:'-') +'</td><th>数量</th><td>'+ (_this.dataobj.partnum?_this.dataobj.partnum:'-') +'</td></tr>'+
                        '<tr><th>到期时间</th><td>'+ (_this.dataobj.partdate?_this.getPartdate(_this.dataobj.partdate):'-') +'</td><th></th><td></td></tr>'+
                        '<table>';
                    $(".tips").empty().html(html).show();
               
        }

        // 3楼存盘
        if (_this.explain == 'trayno') {
            // console.log(_this.dataobj);
            html += '<h1>' + _this.name + '</h1>' +
                '<table class = "table-responsive" width = "100%">' +
                '<tr><th width="25%"> 托盘号 </th><td width="25%">' + (_this.dataobj?_this.dataobj:'-') + '</td></tr>'
            '<table>';


            $(".tips").empty().html(html).show();
        }
    // }

        $(".clos").click(function () {
            $(".tips").hide();
        })

        $(".tips").offset({
            left: x + 20,
            top: y - 20
        })
        var h = $(".tips").offset().top;
        var w = $(".tips").offset().left;
        if ((w - 1000) > 0) {
            $(".tips").offset({
                left: x - 650
            })
        }
        if ((h - 250) > 0) {
            $(".tips").offset({
                top: y - 250
            })
        }
        if ((h - 660) > 0) {
            $(".tips").offset({
                top: y - 650
            })
        }

    }

    draw(draw) {
        var _this = this;
        if (_this.svgtype == "rect") {
            var obj = draw.rect(this.w, this.h);
            // if (_this.color == '#dfdfe7') {
            //     _this.svgobj = obj.addClass('pointer');
            // }
            // 吊笼目标位置
            var H2_CMDHIGH = localStorage.getItem("CAGE2_1"),
                H2_CMDLOW = localStorage.getItem("CAGE2_2"),
                H1_CMDHIGH = localStorage.getItem("CAGE1_1"),
                H1_CMDLOW = localStorage.getItem("CAGE1_2"),
                piler_1 = localStorage.getItem("piler_1"),
                piler_2 = localStorage.getItem("piler_2"),
                piler_3 = localStorage.getItem("piler_3");

            if (_this.CAGEtpye(H2_CMDHIGH) && _this.CAGEtpye(H2_CMDLOW)) {
                if (_this.name == _this.CAGEtpye(H2_CMDHIGH)) {
                    _this.svgobj = obj.addClass('lv');
                }
                if (_this.name == _this.CAGEtpye(H2_CMDLOW)) {
                    _this.svgobj = obj.addClass('lv');
                }
            }

            if (_this.CAGEtpye(H1_CMDHIGH) && _this.CAGEtpye(H1_CMDLOW)) {
                if (_this.name == _this.CAGEtpye(H1_CMDHIGH)) {
                    _this.svgobj = obj.addClass('lv');
                }
                if (_this.name == _this.CAGEtpye(H1_CMDLOW)) {
                    _this.svgobj = obj.addClass('lv');
                }
            }

            // 一楼立库位置

            if (piler_1 && piler_2) {
                console.log(piler_1,piler_2)
                if (_this.name == piler_1) {
                    _this.svgobj = obj.addClass('lv');
                }
                if (_this.name == piler_2) {
                    _this.svgobj = obj.addClass('lv');
                }
            }

            // 是否到期
            if(_this.dataobj.partdate){
                var startTime= new Date(Date.parse(_this.getPartdate(_this.dataobj.partdate)));
                var endTime=new Date();
                if(startTime<endTime){
                    _this.svgobj = obj.addClass('my-tips');
                }
            }


            // 警报
            if ((_this.dataobj) && (_this.dataobj[2] > 0)) {
                if (_this.explain == 'piler') {
                    _this.svgobj = obj.addClass('my-clsss');
                    var tip = pilerTips(_this.dataobj[2])
                    $(".piler").empty().html(_this.text + '：' + tip);
                }
                if ((_this.explain == '1#') || (_this.explain == '2#')) {
                    _this.svgobj = obj.addClass('my-clsss');
                    var tip = cagtTips(_this.dataobj[2])
                    $(".dui").empty().html(_this.explain + '吊笼：' + tip);
                }
                $(".wrap").show();
            }
            // 3楼存放托盘
            if (_this.explain == 'conveyor') {
                // if (_this.dataobj[0] != '0') {
                //     _this.changecolor(color1);
                // }
            } else if (_this.explain == '1#' || _this.explain == '2#' || _this.explain == 'piler') {
                _this.svgobj = obj.addClass('pointer');
                if (_this.dataobj[0] == 0) {
                    _this.changecolor(color2);
                }
                console.log(_this.explain + 'svg--------' + _this.dataobj[0])
            }

            // 堆垛机位移
            if (_this.explain == 'piler') {
                if(_this.dataobj[1] == 0){
                    _this.changecolor(color2);
                }
                if(_this.dataobj[10] ==2 ){
                    _this.changeposition(_this.dataobj[10]*98, _this.y);    
                }else if(_this.dataobj[10] ==3){
                    _this.changeposition(_this.dataobj[10]*104, _this.y);   
                }else if(_this.dataobj[10] ==4){
                    _this.changeposition(_this.dataobj[10]*107, _this.y);   
                }else if(_this.dataobj[10] ==5){
                    _this.changeposition(_this.dataobj[10]*109, _this.y);   
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