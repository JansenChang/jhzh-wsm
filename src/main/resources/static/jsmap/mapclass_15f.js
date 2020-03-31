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
    getPartdate(time){
        var date1 = new Date(time);
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + 30);
        return date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate()+ '  ' +date2.getHours()+ "-"+ date2.getMinutes()+ "-"+ date2.getSeconds()
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
                    $(".title_name").empty().html('夹层'+ _this.name +'立库');
                    html += '<tr><th></th><th>托盘号</th><th>工单号</th><th>物料号</th><th>数量</th><th>到期时间</th></tr>' ;
                    $(resul.resultData).each(function (i, obj) {
                        html += '<tr><td>' + (i + 1) + '层</td><td>' + obj.trayno + '</td><td>' + (obj.partwoid == 0 ? '-' : obj.partwoid) + '</td><td>' + (obj.partid == 0 ? '-' : obj.partid) + '</td><td>' + (obj.partnum == 0 ? '-' : obj.partnum) + '</td><td>' + (obj.partdate?_this.getPartdate(obj.partdate):'-') + '</td></tr>'
                    })
                    $(".piler_box").empty().html(html);
                    $(".whcell_15f").show();
                },
                error: function (jqxhr, textStatus, error) {
                    console.log(error);

                }

            })
        }


    }

    draw(draw) {
        var _this = this;
        var html ='';
        if (_this.svgtype == "rect") {
            var obj = draw.rect(this.w, this.h);
            var  piler_1 = localStorage.getItem("piler_1"),
                piler_2 = localStorage.getItem("piler_2");

            if (piler_1 && piler_2) {
                if (_this.name == _this.piler_1) {
                    _this.svgobj = obj.addClass('lv');
                }
                if (_this.name == _this.piler_2) {
                    _this.svgobj = obj.addClass('lv');
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