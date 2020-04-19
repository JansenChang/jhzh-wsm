
function sum (m,n){//??¦Ά?????
    var num = Math.floor(Math.random()*(m - n) + n);

    return num;
}

function cutbefore3 (num){//??????????3¦Λ
    var str=num.toString();
    str=str.substring(0,3);
    num= parseInt(str);
    return num;
}

function cutafter2 (num){//??????????2¦Λ
    var str=num.toString();
    var len=str.length;
    str=str.substring(len-2,len);
    num= parseInt(str);
    return num;
}

function ifadd0(num){
    var str="";
    if(num<10){
        str=0+num.toString();
        return str;
    }else{
        str= num.toString();
        return str;
    }
}

//???ΡΨ??????????
var idle_color="green";//???????
var busy_color="#f00";//????????
var busy_color2="#444";//??????????





class mapNode{//?????????????????
    static svgdraw;
    constructor(arr){//constructor????????????????????????
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
    dataobjadd(key,value){//???????dataobj??
        this.dataobj[key]=value;
    }
    
    getdataobjkey(key){//???dataobj????????key???????
        return this.dataobj[key];
    }

    changecolor(color){//???svg???
        this.color=color;
    }
    changetext(text){//???svg????
        this.text=text;
    }
    changeposition(lastx,lasty){//???¦Λ??
        this.x=lastx;
        this.y=lasty;
    }
    changepositionX(lastx){//???X????
        this.x=lastx;
    }
    changepositionY(lasty){//???X????
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

//??????????????,???????
var mapnode_10f=[];
var mapnode_15f=[];
var mapnode_hov=[];
var mapnode_road=[];
var mapnode_agv=[];
var mapnode_srm=[];
var mapnode_pick=[];

//????????????????,?????????§Ψ??????????
function create_node(dataarr){//????????:?????????\?????????????\????????(?????????)\????????????\????????(?????????)
    var out=[];

    dataarr.map(function(item){
     var c=new mapNode(item);
        out.push(c);
    });
    switch(dataarr) {
        case mapnode_pri_10f:
            mapnode_10f=out;
            break;
        case mapnode_pri_15f:
            mapnode_15f=out;
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
        case mapnode_pri_srm:
            mapnode_srm=out;
            break;
        case mapnode_pri_pick:
            mapnode_pick=out;
            break;
    }
}

//???¦Λ?????????????
function addcell(arr,flag ){
    for(var i=0;i<cellarr.length;i++){
        for(var j=0;j<arr.length;j++){
            if(arr[j][1]==40&&cellarr[i][0]==arr[j][2]){
                if(flag==1)
                    arr[j][4] =cellarr[i][11];
                else
                    arr[j][4] =cellarr[i][14].toString();
            }
        }
    }
    draw_all();
}



//???υτ?????????????
/*function adddev(arr){

    for(var i=0;i<devarr.length;i++){
        for(var j=0;j<arr.length;j++){
            if(arr[j][1]==10&&devarr[i][0]==arr[j][2]){
                switch(devarr[i][5]) {
                    case 0:
                       console.log("????"+devarr[i][2]+"?????????");
                        break;
                    case 1:
                        console.log("????"+devarr[i][2]+"???????????");
                        break;

                }
                switch(devarr[i][6]) {
                    case 0:
                        console.log("????"+devarr[i][2]+"????");
                        arr[j][12]=idle_color;
                        break;
                    case 1:
                        console.log("????"+devarr[i][2]+"???");
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
                        console.log("????"+devarr[i][2]+"?????,???¦Λ:"+devarr[i][11].toString()+devarr[i][12].toString()+devarr[i][13].toString());

                        break;
                    case 2:
                        console.log("????"+devarr[i][2]+"?????,????¦Λ:"+devarr[i][11].toString()+devarr[i][12].toString()+devarr[i][13].toString());
                        break;
                    case 3:
                        console.log("????"+devarr[i][2]+"?????,????¦Λ:"+devarr[i][11].toString()+devarr[i][12].toString()+devarr[i][13].toString());
                        break;

                }
                switch(devarr[i][7]) {
                    case 4999:
                        console.log("????"+devarr[i][2]+"?????:"+devarr[i][7]+"?????:"+devarr[i][8]);

                        break;
                    case 33333:
                        console.log("????"+devarr[i][2]+"?????:"+devarr[i][7]+"?????:"+devarr[i][8]);
                        break;


                }
            }
        }
    }

    draw_all();
}*/









function update_all(infs122){//????????????????,???????????????????¦Λ???,????????????????????????

    var infarr3=[];
    for(var i=0;i<infs122.length;i++){
        if(infarr[i][9]!=infs122[i]) {
            infarr[i][9] = infs122[i];
        }
    }
        for (var i = 0; i < infarr.length; i++) {
            if (infarr[i][9] != infarr2[i][9]) 
                infarr3.push(infarr[i]);
        }

           console.log(infarr3);
            var cellin="";
            var cellout="";
            var cell="";
            for(var i=0;i<infarr3.length;i++){
                switch(infarr3[i][3]) {
                    case 10://????
                        for(var j=0;j<mapnode_srm.length;j++){
                            if(infarr3[i][1]==mapnode_srm[j].objid){//???svg??????
                                switch(cutafter2(infarr3[i][0])) {//?????????id??2¦Λ
                                    case 01:
                                        console.log("????"+mapnode_srm[j].objid+"?????"+infarr3[i][9]);
                                        break;
                                    case 02:
                                        console.log("????"+mapnode_srm[j].objid+"???????"+infarr3[i][9]);
                                        break;
                                    case 03:
                                        console.log("????"+mapnode_srm[j].objid+"?????"+infarr3[i][9]);
                                        cellin+=ifadd0(infarr3[i][9]+30);
                                        break;
                                    case 04:
                                        console.log("????"+mapnode_srm[j].objid+"?????"+infarr3[i][9]);
                                        cellin+=ifadd0(infarr3[i][9]);
                                        break;
                                    case 05:
                                        console.log("????"+mapnode_srm[j].objid+"????"+infarr3[i][9]);
                                        cellin+=ifadd0(infarr3[i][9]);
                                        console.log("????"+mapnode_srm[j].objid+"????¦Λ"+cellin);
                                        break;
                                    case 06:
                                        console.log("????"+mapnode_srm[j].objid+"??????"+infarr3[i][9]);
                                        cellout+=ifadd0(infarr3[i][9]+30);
                                        break;
                                    case 07:
                                        console.log("????"+mapnode_srm[j].objid+"??????"+infarr3[i][9]);
                                        cellout+=ifadd0(infarr3[i][9]);
                                        break;
                                    case 08:
                                        console.log("????"+mapnode_srm[j].objid+"?????"+infarr3[i][9]);
                                        cellout+=ifadd0(infarr3[i][9]);
                                        console.log("????"+mapnode_srm[j].objid+"?????¦Λ"+cellout);
                                        break;
                                    case 09:
                                        console.log("????"+mapnode_srm[j].objid+"????????"+infarr3[i][9]);
                                        break;
                                    case 10:
                                        console.log("????"+mapnode_srm[j].objid+"PC????????????");
                                        break;
                                    case 11:
                                        console.log("????"+mapnode_srm[j].objid+"?????????"+infarr3[i][9]);
                                        mapnode_srm[j].changecolor(busy_color);//??????????????,???
                                        for(var k=0;k<mapnode_pri_srm.length;k++){//?????????????????????????(?????????????)
                                            if(mapnode_pri_srm[k][2]==mapnode_srm[j].objid){
                                                mapnode_pri_srm[k][12] =mapnode_srm[j].color;
                                            }
                                        }
                                        draw_all();
                                        break;
                                    case 12:
                                        console.log("????"+mapnode_srm[j].objid+"????");
                                        mapnode_srm[j].changecolor(idle_color);//???????????,???

                                        for(var k=0;k<mapnode_pri_srm.length;k++){//?????????????????????????(?????????????)
                                            if(mapnode_pri_srm[k][2]==mapnode_srm[j].objid){
                                                mapnode_pri_srm[k][12] =mapnode_srm[j].color;
                                            }
                                        }
                                        draw_all();


                                        break;
                                    case 13:
                                        switch (infarr3[i][9]){
                                            case 0:
                                                console.log("????"+mapnode_srm[j].objid+"??¦Δ???");
                                                break;
                                            case 1:
                                                console.log("????"+mapnode_srm[j].objid+"?????????");
                                                break;
                                            case 2:
                                                console.log("????"+mapnode_srm[j].objid+"?????????");
                                                break;
                                            case 3:
                                                console.log("????"+mapnode_srm[j].objid+"?????????????");
                                                break;
                                        }

                                        break;
                                    case 14:
                                        console.log("????"+mapnode_srm[j].objid+"?????"+infarr3[i][9]);
                                        cell+=ifadd0(infarr3[i][9]+30);

                                        break;

                                    case 15:
                                        console.log("????"+mapnode_srm[j].objid+"?????"+infarr3[i][9]);
                                        cell+=ifadd0(infarr3[i][9]);
                                        break;

                                    case 16:
                                        console.log("????"+mapnode_srm[j].objid+"?????"+infarr3[i][9]);
                                        cell+=ifadd0(infarr3[i][9]);
                                        console.log("????"+mapnode_srm[j].objid+"?????¦Λ"+cell);
                                        /*for(var i=0;i<mapnode_pri_10f.length;i++){
                                            if(mapnode_srm[j].objid==mapnode_pri_10f[i][2]){//
                                                mapnode_srm[j].changeposition(mapnode_pri_10f[i][8],mapnode_pri_10f[i][9]);//???????????????¦Λ
                                            }

                                        }
                                        for(var k=0;k<mapnode_pri_srm.length;k++){//??????????¦Λ?????????????(?????????????)
                                            if(mapnode_pri_srm[k][2]==mapnode_srm[j].objid){
                                                mapnode_pri_srm[k][8] =mapnode_srm[j].x;
                                                mapnode_pri_srm[k][9] =mapnode_srm[j].y;
                                            }
                                        }*/
                                        break;
                                    case 17:
                                        console.log("????"+mapnode_srm[j].objid+"????????"+infarr3[i][9]);

                                        break;
                                    case 18:
                                        console.log("????"+mapnode_srm[j].objid+"???????"+infarr3[i][9]);

                                        break;
                                    case 19:
                                        console.log("????"+mapnode_srm[j].objid+"????????,wcs?????:"+infarr3[i][9]);

                                        break;
                                    case 20:
                                        console.log("????"+mapnode_srm[j].objid+"???????????"+infarr3[i][9]);

                                        break;
                                    case 21:
                                        console.log("????"+mapnode_srm[j].objid+"?¦Λ,?????");
                                        mapnode_srm[j].changecolor(idle_color);//???

                                        for(var k=0;k<mapnode_pri_srm.length;k++){//?????????????????????????(?????????????)
                                            if(mapnode_pri_srm[k][2]==mapnode_srm[j].objid){
                                                mapnode_pri_srm[k][12] =mapnode_srm[j].color;
                                            }
                                        }
                                        draw_all();
                                        break;
                                }
                            }
                        }//????
                        break;
                    case 20://??????
                        for(var j=0;j<mapnode_hov.length;j++){
                            if(infarr3[i][1]==mapnode_hov[j].objid){//???svg??????
                                switch(cutafter2(infarr3[i][0])){//?????????id??2¦Λ
                                    case 01:
                                        if(infarr3[i][9]==0){
                                            console.log("??????"+mapnode_hov[j].objid+"???");
                                        }else if(infarr3[i][9]==1){
                                            console.log("??????"+mapnode_hov[j].objid+"???");
                                        }
                                        break;
                                    case 02:
                                        if(infarr3[i][9]==0){
                                            console.log("??????"+mapnode_hov[j].objid+"????");
                                            mapnode_hov[j].changecolor(idle_color);//?????????????,???
                                            for(var k=0;k<mapnode_pri_hov.length;k++){//?????????????????????????(?????????????)
                                                if(mapnode_pri_hov[k][2]==mapnode_hov[j].objid){
                                                    mapnode_pri_hov[k][12] =mapnode_hov[j].color;
                                                }
                                            }
                                            draw_all();
                                        }else if(infarr3[i][9]==1){
                                            console.log("??????"+mapnode_hov[j].objid+"???");
                                            mapnode_hov[j].changecolor(busy_color2);//????????????,???

                                            for(var k=0;k<mapnode_pri_hov.length;k++){//?????????????????????????(?????????????)
                                                if(mapnode_pri_hov[k][2]==mapnode_hov[j].objid){
                                                    mapnode_pri_hov[k][12] =mapnode_hov[j].color;
                                                }
                                            }
                                            draw_all();
                                        }
                                        break;
                                    case 03:
                                        if(infarr3[i][9]==0){
                                            console.log("??????"+mapnode_hov[j].objid+"?????");
                                        }else if(infarr3[i][9]>0){
                                            console.log("??????"+mapnode_hov[j].objid+"?§Ò???");
                                        }
                                        break;
                                    case 04:
                                        break;
                                    case 05:
                                        break;
                                    case 06:
                                        break;
                                }
                            }
                        }//??????
                        break;

                    case 30:
                        for(var j=0;j<mapnode_agv.length;j++){
                            if(infarr[i][1]==mapnode_agv[j].objid){//???svg??????
                            }
                        }
                        break;
                }
            }
}





function update_one(objid,svgobj){//?????????????????????


}