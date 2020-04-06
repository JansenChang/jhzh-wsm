$(document).ready(function () {

    // $(document).foundation();

    //点击弹窗
    $(".inquiryPop").click(function(){
        $(".pop_div").show();
        var id = $(this).attr('id');
        console.log(id);
    });
//点击关闭弹窗
    $(".cancel").click(function(){
        $(".pop_div").hide();
    });

});
$(".smallinput").attr("disabled", true);//所有输入框设为disabled
$(".tablecontainer button").attr("disabled", true);//所有按钮设为disabled

function enabletag(eleid) {//使input和button从disabled状态恢复正常的函数,参数为input或button的id(字符串类型)
    $('#' + eleid).attr("disabled", false);
}
enabletag("sys_id_wcs_clean");
enabletag("sys_id_wms_clean");
enabletag("sys_id_mes_clean");

enabletag("sys_id_cell1to15_clean");
enabletag("sys_id_cell16_clean");
enabletag("sys_id_cell17_clean");
enabletag("sys_id_cell55_clean");

enabletag("go_id_cellidsrc");
enabletag("go_id_celliddst");
enabletag("go_id_button");

enabletag("bind_id_cellid");
enabletag("bind_id_trayid");
enabletag("bind_id_partid");
enabletag("bind_id_partdesc");
enabletag("bind_id_partnum");
enabletag("bind_id_partwoid");
enabletag("bind_id_partlotid");
enabletag("bind_id_button");

enabletag("p1_id_po");
enabletag("p1_id_ti");
enabletag("p1_id_to");
enabletag("p1_id_pi");
enabletag("p1_id_button_partnumadd");
enabletag("p1_id_button_partnumsub");
enabletag("p1_id_partwoid");
enabletag("p1_id_partid");



