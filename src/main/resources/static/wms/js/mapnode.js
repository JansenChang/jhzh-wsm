function sum (m,n){//范围随机数
    var num = Math.floor(Math.random()*(m - n) + n);

    return num;
}

function cutbefore3 (num){//截取数字前面3位
    var str=num.toString();
    str=str.substring(0,3);
    num= parseInt(str);
    return num;
}

function cutafter2 (num){//截取数字后面2位
    var str=num.toString();
    var len=str.length;
    str=str.substring(len-2,len);
    num= parseInt(str);
    return num;
}

//上面部分为工具函数
var idle_color="green";
var busy_color="#f00";





class mapNode{//定义了一个绘制节点类
    static svgdraw;
    constructor(arr){//constructor是一个构造方法，用来接收参数
        this.id =arr[0];
        this.objtype = arr[1];
        this.objid=arr[2];
        this.name=arr[3];
        this.text=arr[4];
        this.svgtype=arr[5];
        this.w=arr[6];
        this.h=arr[7];
        this.x=arr[8];
        this.y=arr[9];
        this.svgobj=arr[10];
        this.dataobj=arr[11];
        this.color=arr[12];
    }

    changesvgtype(type){
        this.svgtype=type;
    }
    dataobjadd(key,value){//添加或改变dataobj项
        this.dataobj[key]=value;
    }
    
    getdataobjkey(key){//通过dataobj里等于参数key的键取其值
        return this.dataobj[key];
    }

    changecolor(color){//改变svg颜色
        this.color=color;
    }
    changetext(text){//改变svg文字
        this.text=text;
    }
    changeposition(lastx,lasty){//改变位置
        this.x=lastx;
        this.y=lasty;
    }
    changepositionX(lastx){//改变X坐标
        this.x=lastx;
    }
    changepositionY(lasty){//改变X坐标
        this.y=lasty;
    }

    update_whxy(w, h, x0, y0, w_ratio, h_ratio) {
        this.w = this.w * w_ratio - 1;
        this.h = this.h * h_ratio - 1;
        this.x = x0 + this.x * w_ratio;
        this.y = y0 + this.y * h_ratio;
    }

    draw(draw) {

        if (this.svgtype == "rect"){

           this.svgobj = draw.rect(this.w,this.h).fill(this.color).move(this.x, this.y);

        }

        else
        if (this.svgtype == "text"){
           this.svgobj = draw.text(this.text).fill(this.color).move(this.x, this.y).size(11);

        }

    }
}


//画图所用对象数组,为全局变量
var mapnode_10f=[];
var mapnode_15f=[];
var mapnode_hov=[];
var mapnode_road=[];
var mapnode_agv=[];
var mapnode_duiduoji=[];
var mapnode_select=[];

//创建描绘对象节点的函数,创建一个装有对象节点的数组
function create_node(dataarr){//参数分别为:待转换数组\待改变文字索引\文字改变后值(字符串类型)\待改变颜色索引\颜色改变后值(字符串类型)
    var out=[];

    dataarr.map(function(item){
     var c=new mapNode(item);


        out.push(c);


    });
    switch(dataarr) {
        case mapnode_pri_10f:
            mapnode_10f=out;
            console.log(mapnode_10f);
            break;
        case mapnode_pri_15f:
            mapnode_15f=out;
            console.log(mapnode_15f);
            break;
        case mapnode_pri_hov:
            mapnode_hov=out;
            break;
        case mapnode_pri_road:
            mapnode_road=out;
            break;
        case mapnode_pri_agv:
            mapnode_agv=out;
            break;
        case mapnode_pri_duiduoji:
            mapnode_duiduoji=out;
            break;
        case mapnode_pri_select:
            mapnode_select=out;
            break;

    }




}

//把库位表更新到节点对象
function addcell(arr,flag ){

    for(var i=0;i<cellarr.length;i++){
        for(var j=0;j<arr.length;j++){
            if(arr[j][1]==40&&cellarr[i][0]==arr[j][2]){

                if(flag==1){
                    arr[j][4] =cellarr[i][11];
                }else{
                    arr[j][4] =cellarr[i][14].toString();
                }




            }
        }
    }

    draw_all();
}



//把设备表更新到节点对象
/*function adddev(arr){

    for(var i=0;i<devarr.length;i++){
        for(var j=0;j<arr.length;j++){
            if(arr[j][1]==10&&devarr[i][0]==arr[j][2]){
                switch(devarr[i][5]) {
                    case 0:
                       console.log("堆垛机"+devarr[i][2]+"处于手动模式");
                        break;
                    case 1:
                        console.log("堆垛机"+devarr[i][2]+"处于自动动模式");
                        break;

                }
                switch(devarr[i][6]) {
                    case 0:
                        console.log("堆垛机"+devarr[i][2]+"空闲");
                        arr[j][12]=idle_color;
                        break;
                    case 1:
                        console.log("堆垛机"+devarr[i][2]+"在忙");
                        arr[j][12]=busy_color;
                        for(var i=0;i<devarr.length;i++){
                            for(var j=0;j<arr.length;j++){
                                arr[j][8]=devarr[i][15];
                                arr[j][9]=devarr[i][16];
                            }
                        }
                        break;

                }
                switch(devarr[i][9]) {
                    case 1:
                        console.log("堆垛机"+devarr[i][2]+"在入库,入库位:"+devarr[i][11].toString()+devarr[i][12].toString()+devarr[i][13].toString());

                        break;
                    case 2:
                        console.log("堆垛机"+devarr[i][2]+"在出库,出库位:"+devarr[i][11].toString()+devarr[i][12].toString()+devarr[i][13].toString());
                        break;
                    case 3:
                        console.log("堆垛机"+devarr[i][2]+"在移库,目标库位:"+devarr[i][11].toString()+devarr[i][12].toString()+devarr[i][13].toString());
                        break;

                }
                switch(devarr[i][7]) {
                    case 4999:
                        console.log("堆垛机"+devarr[i][2]+"异常编号:"+devarr[i][7]+"异常信息:"+devarr[i][8]);

                        break;
                    case 33333:
                        console.log("堆垛机"+devarr[i][2]+"异常编号:"+devarr[i][7]+"异常信息:"+devarr[i][8]);
                        break;


                }
            }
        }
    }

    draw_all();
}*/








function update_all(infs122){//这个函数接收一维点表,和信息全表第二维倒数第二位比对,不同的就更新到信息全表第二维倒数
    var infarr2=infarr.map(function(item){
        return item;
    });
    var infarr3=[];
    for(var i=0;i<infs122.length;i++){
        if(infarr[i][9]!=infs122[i]){
            infarr[i][9]=infs122[i];
            for(var i=0;i<infarr.length;i++){
                if(infarr[i][9]==infarr2[i][9]){
                    infarr3.push(infarr[i]);
                }
            }
           console.log(infarr3);
            for(var i=0;i<infarr3.length;i++){
                switch(infarr3[i][3]) {
                    case 10://堆垛机
                        for(var j=0;j<mapnode_duiduoji.length;j++){
                            if(infarr[i][1]==mapnode_duiduoji[j].objid){//找出svg节点对象
                                var cell;
                                switch(cutafter2(infarr[i][0])) {//比对信息全表id后2位
                                    case 03:
                                        console.log("堆垛机"+infarr[i][1]+"入库行"+devarr[i][9]);
                                        cell+=infarr[i][9].toString();
                                        break;
                                    case 04:
                                        console.log("堆垛机"+infarr[i][1]+"入库列"+devarr[i][9]);
                                        cell+=infarr[i][9].toString();
                                        break;
                                    case 05:
                                        console.log("堆垛机"+infarr[i][1]+"入库层"+devarr[i][9]);
                                        cell+=infarr[i][9].toString();
                                        break;
                                    case 12:
                                        mapnode_duiduoji[j].changecolor(idle_color);//如果堆垛机空闲,变色
                                        console.log(mapnode_duiduoji[j].color);
                                        draw_all();


                                        break;
                                        console.log(cell);


                                }


                            }


                        }
                        break;
                    case 20:
                        for(var j=0;j<mapnode_hov.length;j++){
                            if(infarr[i][1]==mapnode_hov[j].objid){//找出svg节点对象

                            }
                        }
                        break;

                    case 30:
                        for(var j=0;j<mapnode_agv.length;j++){
                            if(infarr[i][1]==mapnode_agv[j].objid){//找出svg节点对象

                            }
                        }
                        break;

                }
            }





        }
    }


}





function update_one(objid,svgobj){//更新单个画图节点属性的函数


}