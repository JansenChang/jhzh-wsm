/**
 * Created by Administrator on 2020/2/11 0011.
 */
//report������尴ť����¼�(��htmlҳ��Ĺ�������)


//�Զ���˵�
//��ȡ�˵����˵�ΪԤ��д�ã���css��Ϊ���أ�
var menu = document.getElementById("menu");

var tr;




//�ڲ˵�����¼����ٶ����ز˵�
menu.onclick=function(e){
    menu.style.display="none";
}

// �������ر��Զ���˵�
document.onclick=function(e){
    menu.style.display="none";
}
//������ť�¼�
function search_1(){

    workid1=$("#workid1").val();
    palletid1=$("#palletid1").val();
    code1=$("#code1").val();
    store1=$("#store1").val();
    starttime1=$("#starttime1").val();
    endtime1=$("#endtime1").val();
    type1=$("#type1").val();
    alert(workid1+"+"+palletid1+"+"+code1+"+"+store1+"+"+starttime1+"+"+endtime1+"+"+type1);

    $.ajax({
        type : "get", //ʹ��get�������ʺ�̨
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=search_1&workid1="+workid1+"&palletid1="+palletid1+"&code1="+code1+"&store1="+store1  +"& starttime1="+ starttime1+"& endtime1="+ endtime1 +"& type1="+ type1  , //Ҫ���͵Ĳ���
        async : false,//ͬ������
        success : function(msg) {
            if (msg.code == 200) {
                var htmlstr = '';
                $.each(msg.data, function (index, item) {
                    //���ʱ���	����ID	���̺�	��λ	����	���ʱ��	����ʱ��	����������
                    htmlstr += " <tr><td>" + item.goodscode + "</td><td>" + item.workid + "</td><td>" + item.palletid + "</td><td>" + item.cell + "</td><td>" + item.num + "</td><td>" + item.in_time + "</td><td>" + item.out_time + "</td><td>" + item.in_out_type + "</td></tr>";
                    $("#tb1 tbody").html(htmlstr);

                })
            }
        }
    });



    //��ȡtr����
    tr = document.querySelectorAll("tr");
    //��ÿ��tr������Ҽ��˵��¼�

    for(var i=1;i<tr.length;i++){

        tr[i].oncontextmenu = function(e){
            //��ֹĬ�ϲ˵�
            e.preventDefault();
            var e = e || window.event;
            //��Ԥ��д�õ��Զ���˵���Ϊ�ɼ�
            menu.style.display="block";
            console.log(e.target);



            if (e.target.parentNode.parentNode.parentNode.id == "tb1" || e.target.parentNode.parentNode.parentNode.id == "tb3") {
                $("#unlock").hide();
                $("#lock").hide();


            } else {
                $("#unlock").show();
                $("#lock").show();
            }






            //����¼��������겢������Ϊ�˵��ľ��Զ�λ����
            var x = e.clientX-15;
            var y = e.clientY-10;
            menu.style.left=x/15+'rem';
            menu.style.top=y/15+'rem';

        }






    }




}


function search_2(){

    workid2=$("#workid2").val();
    palletid2=$("#palletid2").val();
    code2=$("#code2").val();
    store2=$("#store2").val();
    lockstatus=$("#lockstatus").val();
    alert(workid2+"+"+palletid2+"+"+code2+"+"+store2+"+"+lockstatus);
    console.log(workid2);


    $.ajax({
        type : "get", //ʹ��get�������ʺ�̨
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=search_2&workid2="+workid2+"&palletid2="+palletid2+"&code2="+code2+"&store2="+store2  +"&lockstatus="+lockstatus   , //Ҫ���͵Ĳ���
        async : false,//ͬ������
        success : function(msg) {
            if (msg.code == 200) {
                var htmlstr = '';
                $.each(msg.data, function (index, item) {
                    //���ʱ���	����ID	���̺�	��λ	����	���ʱ��	����ʱ��		�ڿ�ʱ��	���״̬
                    htmlstr += " <tr><td>" + item.goodscode + "</td><td>" + item.workid + "</td><td>" + item.palletid + "</td><td>" + item.cell + "</td><td>" + item.num + "</td><td>" + item.in_time + "</td><td>" + item.out_time + "</td><td>" + item.howlong + "</td><td>" + item.locktext + "</td></tr>";
                    $("#tb2 tbody").html(htmlstr);

                })
            }
        }
    });


    //��ȡtr����
    tr = document.querySelectorAll("tr");
    //��ÿ��tr������Ҽ��˵��¼�

    for(var i=1;i<tr.length;i++){

        tr[i].oncontextmenu = function(e){
            //��ֹĬ�ϲ˵�
            e.preventDefault();
            var e = e || window.event;
            //��Ԥ��д�õ��Զ���˵���Ϊ�ɼ�
            menu.style.display="block";


            if (e.target.parentNode.parentNode.parentNode.id == "tb1" || e.target.parentNode.parentNode.parentNode.id == "tb3") {
                $("#unlock").hide();
                $("#lock").hide();

            } else {
                $("#unlock").show();
                $("#lock").show();
            }






            //����¼��������겢������Ϊ�˵��ľ��Զ�λ����
            var x = e.clientX-15;
            var y = e.clientY-10;
            menu.style.left=x/15+'rem';
            menu.style.top=y/15+'rem';

        }






    }




}


function search_3(){

    overtime=$("#overtime").val();
    alert(overtime);

    $.ajax({
        type : "get", //ʹ��get�������ʺ�̨
        url : "/yxpower/ajax",
        dataType : "html",
        data : "a=search_3&overtime="+overtime   , //Ҫ���͵Ĳ���
        async : false,//ͬ������
        success : function(msg) {
            if (msg.code == 200) {
                var htmlstr = '';
                $.each(msg.data, function (index, item) {
                    //���ʱ���	����ID	���̺�	��λ	����	���ʱ��	����ʱ��		�ڿ�ʱ��	����ʱ��
                    htmlstr += "<tr><td>" + item.goodscode + "</td><td>" + item.workid + "</td><td>" + item.palletid + "</td><td>" + item.cell + "</td><td>" + item.num + "</td><td>" + item.in_time + "</td><td>" + item.out_time + "</td><td>"+item.howlong+"</td><td>"+item.overtimetext+"</td></tr>";

                    $("#tb3 tbody").html(htmlstr);

                })
            }
        }
    });

    //��ȡtr����
    tr = document.querySelectorAll("tr");
    //��ÿ��tr������Ҽ��˵��¼�

    for(var i=1;i<tr.length;i++){

        tr[i].oncontextmenu = function(e){
            //��ֹĬ�ϲ˵�
            e.preventDefault();
            var e = e || window.event;
            //��Ԥ��д�õ��Զ���˵���Ϊ�ɼ�
            menu.style.display="block";


            if (e.target.parentNode.parentNode.parentNode.id == "tb1" || e.target.parentNode.parentNode.parentNode.id == "tb3") {
                $("#unlock").hide();
                $("#lock").hide();

            } else if(e.target.parentNode.parentNode.parentNode.id == "tb2" ) {
                alert(0);
                $("#unlock").show();
                $("#lock").show();
            }






            //����¼��������겢������Ϊ�˵��ľ��Զ�λ����
            var x = e.clientX-15;
            var y = e.clientY-10;
            menu.style.left=x/15+'rem';
            menu.style.top=y/15+'rem';

        }






    }




}

function reset(){
    $('input[type="text"]').val("");
    $('#starttime1').val("2020-02-09T00:00:00");
    $('#endtime1').val("2020-02-10T00:00:00");
    $('select').val(10);
}

