/**
 * Created by Administrator on 2020/2/11 0011.
 */
//(��html��������֤)
//ȫ�ֲ���ҳ
function search_fileid(){//����������
    var fileid=$("#fileid").val();

    $.ajax({
        type : "get", //ʹ��get�������ʺ�̨
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=search_fileid&fileid"+fileid   , //Ҫ���͵Ĳ���
        async : false,//ͬ������
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("��ִ��");
        }
    });

}

function search_palletid(){//����������
    var palletid=$("#palletid").val();

    $.ajax({
        type : "get", //ʹ��get�������ʺ�̨
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=search_palletid&palletid"+palletid   , //Ҫ���͵Ĳ���
        async : false,//ͬ������
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("��ִ��");
        }
    });

}


//JF����ҳ

//���Сҳ
function into(){//��ⰴť
    var cell=$("#cell").val();
    var palletid2=$("#palletid2").val();

    console.log(cell);
    $.ajax({
        type : "get", //ʹ��get�������ʺ�̨
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=into&cell"+cell+"&palletid2"+palletid2   , //Ҫ���͵Ĳ���
        async : false,//ͬ������
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("��ִ��");
        }
    });

}

//��λת��Сҳ
function las_move(){//�ƿⰴť
    var type=$('input[name="type"]:checked').val();
    var srccell=$("#srccell").val();
    var dstcell=$("#dstcell").val();

    $.ajax({
        type : "get", //ʹ��get�������ʺ�̨
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=las_move&type"+type+"&srccell"+srccell+"&dstcell"+dstcell   , //Ҫ���͵Ĳ���
        async : false,//ͬ������
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("��ִ��");
        }
    });

}


//�쳣����Сҳ
function backflow(){//������ť
    var backflowcode=1;


    $.ajax({
        type : "get", //ʹ��get�������ʺ�̨
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=backflow&backflowcode"+backflowcode , //Ҫ���͵Ĳ���
        async : false,//ͬ������
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("��ִ��");
        }
    });
}




function enter1(){//���˴��̵��в�ȷ����ť
    var cell2=$("#cell2").val();


    $.ajax({
        type : "get", //ʹ��get�������ʺ�̨
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=enter1&cell2"+cell2 , //Ҫ���͵Ĳ���
        async : false,//ͬ������
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("��ִ��");
        }
    });
}


//���̰���Сҳ
function starttransport(){//�ʹ�����һ¥ȷ����ť
    var layer=$('input[name="layer"]:checked').val();
    var workid=$("#workid").val();
    var bigpalletid=$("#bigpalletid").val();

    $.ajax({
        type : "get", //ʹ��get�������ʺ�̨
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=starttransport&layer"+layer+"&workid"+workid+"&bigpalletid"+bigpalletid , //Ҫ���͵Ĳ���
        async : false,//ͬ������
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("��ִ��");
        }
    });
}




//1F����ҳ

//����Сҳ
function enter2(){//����ȷ����ť
    var palletid3=$("#palletid3").val();


    $.ajax({
        type : "get", //ʹ��get�������ʺ�̨
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=enter2&palletid3"+palletid3 , //Ҫ���͵Ĳ���
        async : false,//ͬ������
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("��ִ��");
        }
    });
}


function enter3(){//������ȷ����ť
    var cell3=$("#cell3").val();


    $.ajax({
        type : "get", //ʹ��get�������ʺ�̨
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=enter3&cell3"+cell3 , //Ҫ���͵Ĳ���
        async : false,//ͬ������
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("��ִ��");
        }
    });
}

//�������Сҳ
function enter4(){//���ȷ����ť
    var palletid4=$("#palletid4").val();


    $.ajax({
        type : "get", //ʹ��get�������ʺ�̨
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=enter4&palletid4"+palletid4 , //Ҫ���͵Ĳ���
        async : false,//ͬ������
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("��ִ��");
        }
    });
}


function enter5(){//������ȷ����ť
    var cell4=$("#cell4").val();

    $.ajax({
        type : "get", //ʹ��get�������ʺ�̨
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=enter5&cell4"+cell4 , //Ҫ���͵Ĳ���
        async : false,//ͬ������
        success : function(msg) {
            //$("#patinfo").val(msg);
            //getlistjust(15);
            alert("��ִ��");
        }
    });
}