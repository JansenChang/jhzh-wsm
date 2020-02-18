function sum (m,n){//��Χ�����
    var num = Math.floor(Math.random()*(m - n) + n);

    return num;
}

function cutbefore3 (num){//��ȡ����ǰ��3λ
    var str=num.toString();
    str=str.substring(0,3);
    num= parseInt(str);
    return num;
}

function cutafter2 (num){//��ȡ���ֺ���2λ
    var str=num.toString();
    var len=str.length;
    str=str.substring(len-2,len);
    num= parseInt(str);
    return num;
}

//���沿��Ϊ���ߺ���
var idle_color="green";
var busy_color="#f00";





class mapNode{//������һ�����ƽڵ���
    static svgdraw;
    constructor(arr){//constructor��һ�����췽�����������ղ���
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
    dataobjadd(key,value){//��ӻ�ı�dataobj��
        this.dataobj[key]=value;
    }
    
    getdataobjkey(key){//ͨ��dataobj����ڲ���key�ļ�ȡ��ֵ
        return this.dataobj[key];
    }

    changecolor(color){//�ı�svg��ɫ
        this.color=color;
    }
    changetext(text){//�ı�svg����
        this.text=text;
    }
    changeposition(lastx,lasty){//�ı�λ��
        this.x=lastx;
        this.y=lasty;
    }
    changepositionX(lastx){//�ı�X����
        this.x=lastx;
    }
    changepositionY(lasty){//�ı�X����
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


//��ͼ���ö�������,Ϊȫ�ֱ���
var mapnode_10f=[];
var mapnode_15f=[];
var mapnode_hov=[];
var mapnode_road=[];
var mapnode_agv=[];
var mapnode_duiduoji=[];
var mapnode_select=[];

//����������ڵ�ĺ���,����һ��װ�ж���ڵ������
function create_node(dataarr){//�����ֱ�Ϊ:��ת������\���ı���������\���ָı��ֵ(�ַ�������)\���ı���ɫ����\��ɫ�ı��ֵ(�ַ�������)
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

//�ѿ�λ����µ��ڵ����
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



//���豸����µ��ڵ����
/*function adddev(arr){

    for(var i=0;i<devarr.length;i++){
        for(var j=0;j<arr.length;j++){
            if(arr[j][1]==10&&devarr[i][0]==arr[j][2]){
                switch(devarr[i][5]) {
                    case 0:
                       console.log("�Ѷ��"+devarr[i][2]+"�����ֶ�ģʽ");
                        break;
                    case 1:
                        console.log("�Ѷ��"+devarr[i][2]+"�����Զ���ģʽ");
                        break;

                }
                switch(devarr[i][6]) {
                    case 0:
                        console.log("�Ѷ��"+devarr[i][2]+"����");
                        arr[j][12]=idle_color;
                        break;
                    case 1:
                        console.log("�Ѷ��"+devarr[i][2]+"��æ");
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
                        console.log("�Ѷ��"+devarr[i][2]+"�����,���λ:"+devarr[i][11].toString()+devarr[i][12].toString()+devarr[i][13].toString());

                        break;
                    case 2:
                        console.log("�Ѷ��"+devarr[i][2]+"�ڳ���,����λ:"+devarr[i][11].toString()+devarr[i][12].toString()+devarr[i][13].toString());
                        break;
                    case 3:
                        console.log("�Ѷ��"+devarr[i][2]+"���ƿ�,Ŀ���λ:"+devarr[i][11].toString()+devarr[i][12].toString()+devarr[i][13].toString());
                        break;

                }
                switch(devarr[i][7]) {
                    case 4999:
                        console.log("�Ѷ��"+devarr[i][2]+"�쳣���:"+devarr[i][7]+"�쳣��Ϣ:"+devarr[i][8]);

                        break;
                    case 33333:
                        console.log("�Ѷ��"+devarr[i][2]+"�쳣���:"+devarr[i][7]+"�쳣��Ϣ:"+devarr[i][8]);
                        break;


                }
            }
        }
    }

    draw_all();
}*/








function update_all(infs122){//�����������һά���,����Ϣȫ��ڶ�ά�����ڶ�λ�ȶ�,��ͬ�ľ͸��µ���Ϣȫ��ڶ�ά����
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
                    case 10://�Ѷ��
                        for(var j=0;j<mapnode_duiduoji.length;j++){
                            if(infarr[i][1]==mapnode_duiduoji[j].objid){//�ҳ�svg�ڵ����
                                var cell;
                                switch(cutafter2(infarr[i][0])) {//�ȶ���Ϣȫ��id��2λ
                                    case 03:
                                        console.log("�Ѷ��"+infarr[i][1]+"�����"+devarr[i][9]);
                                        cell+=infarr[i][9].toString();
                                        break;
                                    case 04:
                                        console.log("�Ѷ��"+infarr[i][1]+"�����"+devarr[i][9]);
                                        cell+=infarr[i][9].toString();
                                        break;
                                    case 05:
                                        console.log("�Ѷ��"+infarr[i][1]+"����"+devarr[i][9]);
                                        cell+=infarr[i][9].toString();
                                        break;
                                    case 12:
                                        mapnode_duiduoji[j].changecolor(idle_color);//����Ѷ������,��ɫ
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
                            if(infarr[i][1]==mapnode_hov[j].objid){//�ҳ�svg�ڵ����

                            }
                        }
                        break;

                    case 30:
                        for(var j=0;j<mapnode_agv.length;j++){
                            if(infarr[i][1]==mapnode_agv[j].objid){//�ҳ�svg�ڵ����

                            }
                        }
                        break;

                }
            }





        }
    }


}





function update_one(objid,svgobj){//���µ�����ͼ�ڵ����Եĺ���


}