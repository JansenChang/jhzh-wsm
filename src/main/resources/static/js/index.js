$(function() {
  // 初始化
  var pagenum = 1;
  $('.nav-tabs a:first').tab('show');
  $(".material").show();
  var dataID = 1;
  var locatorID = 1; //入库有无物料
  var locked="";//是否锁定
  $("#inlineRadio1").prop("checked", true);
  unconditional(dataID); //初始化第一个查询


  // tab切换
  $('.nav-tabs li').click(function(e) {
    // 上一页disabled
    $(".prevPage").attr("disabled", "disabled").removeClass("btn-primary").addClass("btn-default");
    $(".num").html("1");
    pagenum = 1;
    $(".listData").empty()

    e.preventDefault();

    dataID = $(this).attr("data-id");
    // 第一个
    if (dataID == 1) {
      $(".material").show();
      $(".inStorage,.outStorage").hide();
      $(".storage_box").hide(); //没有excel
      unconditional(dataID)

    } else if (dataID == 2) {
      $(".inStorage").show();
      $(".material,.outStorage").hide();

      //入库信息记录
      unconditional(dataID)
      $(".storage_box").show();

    } else if (dataID == 3) {
      $(".outStorage").show();
      $(".material,.inStorage").hide();
      //出库信息记录
      unconditional(dataID)
      $(".storage_box").show();
    }

    $(this).tab('show');
  })



  // 格式化时间
  $('#datetimepicker1').datetimepicker({
    format: 'YYYY-MM-DD',
    locale: moment.locale('zh-CN')
  });

  $('#datetimepicker2').datetimepicker({
    format: 'YYYY-MM-DD',
    locale: moment.locale('zh-CN')
  });

  $('#datetimepicker3').datetimepicker({
    format: 'YYYY-MM-DD HH:mm',
    locale: moment.locale('zh-CN')
  });

  $('#datetimepicker4').datetimepicker({
    format: 'YYYY-MM-DD HH:mm',
    locale: moment.locale('zh-CN')
  });

  $('#datetimepicker5').datetimepicker({
    format: 'YYYY-MM-DD HH:mm',
    locale: moment.locale('zh-CN')
  });

  $('#datetimepicker6').datetimepicker({
    format: 'YYYY-MM-DD HH:mm',
    locale: moment.locale('zh-CN')
  });

  $("#inlineRadio1").change(function() {
    locatorID = this.value
  })
  $("#inlineRadio2").change(function() {
    locatorID = this.value
  })
  $("#inlineRadio6").change(function() {
    locked = this.value
  })
  $("#inlineRadio7").change(function() {
    locked = this.value
  })

  // 查询
  $(".materialBtn").click(function() {
    if (dataID == 1) {
      // 库存物资查询
      var time1 = new Date($("#datetimepicker1 input").val());
      var time2 = new Date($("#datetimepicker2 input").val());
      var data = {
        "partwoid": $(".material .partwoid").val(),
        "partid": $(".material .partid").val(),
        "id": $(".material .id").val(),
        "locked": locked,
        "lastUpdateDateFrom": time1.getTime(time1) / 1000,
        "lastUpdateDateTo": time2.getTime(time2) / 1000,
        "pagesize": 15,
        "pagenum": 1
      }

      if ((data.begindate && data.enddate) || (!data.begindate && !data.enddate)) {
        allData("innerMaterial", data, dataID);
        page(data, function() {
          allData("innerMaterial", data, dataID)
        })
      } else {
        $(".modal-body p").empty().html('请选择完整的起止查询时间。');
        $('#myModal').modal();
      }


    } else if (dataID == 2) {
      //入库信息记录
      var time3 = new Date($("#datetimepicker3 input").val());
      var time4 = new Date($("#datetimepicker4 input").val());
      var data = {
        "taskid": $(".inStorage_taskid").val(),
        "partwoid": $(".inStorage_partwoid").val(),
        "itemcode": $(".inStorage_Itemcode").val(),
        "stockno": $(".inStorage_stockno").val(),
        "locator": locatorID,
        "begindate": time3.getTime(time3),
        "enddate": time4.getTime(time4),
        "pagesize": 15,
        "pagenum": 1
      }

      if ((data.begindate && data.enddate) || (!data.begindate && !data.enddate)) {
        allData("wmsInvInFlow", data, dataID);
        page(data, function() {
          allData("wmsInvInFlow", data, dataID)
        })
      } else {
        $(".modal-body p").empty().html('请选择完整的起止查询时间。');
        $('#myModal').modal();
      }

    } else if (dataID == 3) {
      // 库存物资查询
      var time5 = new Date($("#datetimepicker5 input").val());
      var time6 = new Date($("#datetimepicker6 input").val());
      var data = {
        "taskid": $(".outStorage_taskid").val(),
        "wipentityid": $(".outStorage_wipentityid").val(),
        "itemcode": $(".outStorage_Itemcode").val(),
        "begindate": time5.getTime(time5),
        "enddate": time6.getTime(time6),
        "pagesize": 15,
        "pagenum": 1
      }

      if ((data.begindate && data.enddate) || (!data.begindate && !data.enddate)) {
        allData("wmsInvOutFlow", data, dataID);
        page(data, function() {
          allData("wmsInvOutFlow", data, dataID)
        })
      } else {
        $(".modal-body p").empty().html('请选择完整的起止查询时间。');
        $('#myModal').modal();
      }


    }


  })

  // 重置条件
  $(".resetBtn").click(function() {
    var lo = $(".nav-tabs .active").attr('data-id');
    $("input[type='radio']").prop("checked", false);
    console.log(lo)
    unconditional(lo)
  })

  // 无条件查询
  function unconditional(dataID) {
    $("input[type='text']").val("");
    $("input[type='radio']").removeAttr("checked");
    if (dataID == 1) {
      var data = {
        "partwoid ": '',
        "partid": '',
        "id": '',
        "lastUpdateDateFrom": "",
        "lastUpdateDateTo": "",
        "locked":"",
        "pagesize": 15,
        "pagenum": 1
      }
      allData("innerMaterial", data, dataID)
      page(data, function() {
        allData("innerMaterial", data, dataID)
      })
    } else if (dataID == 2) {

      var data = {
        "taskid": $(".inStorage_taskid").val(),
        "partwoid": $(".inStorage_partwoid").val(),
        "itemcode": $(".inStorage_Itemcode").val(),
        "stockno": $(".inStorage_stockno").val(),
        "locator": 1,
        "begindate": "",
        "enddate": "",
        "pagesize": 15,
        "pagenum": 1
      }
      allData("wmsInvInFlow", data, dataID)
      page(data, function() {
        allData("wmsInvInFlow", data, dataID)
      })
    } else if (dataID == 3) {
      console.log(dataID)
      var data = {
        "taskid ": '',
        "wipentityid": '',
        "itemcode": '',
        "begindate": "",
        "enddate": "",
        "pagesize": 15,
        "pagenum": 1
      }
      allData("wmsInvOutFlow", data, dataID)
      page(data, function() {
        allData("wmsInvOutFlow", data, dataID)
      })
    }
  }


  // html结构
  function allData(url, data, dataID) {
    ajaxData(url, data, function(resul) {
      var getData = resul.resultData;
      var html = "";
      if (getData.list) {
        $(".nextPage").removeAttr("disabled").removeClass("btn-default").addClass("btn-primary");
        $(resul.resultData.list).each(function(index, item) {
          if (dataID == 1) {
            html += '<tr><td >' + (item.partid ? item.partid : '-') + '</td>' +
              '<td>' + (item.partwoid ? item.partwoid : '-') + '</td>' +
              '<td >' + (item.id ? item.id : '-') + '</td>' +
              '<td >' + (item.trayno ? item.trayno : '-') + '</td>' +
              '<td>' + (item.partnum ? item.partnum : '-') + '</td>' +
              '<td >' + item.lockedtype + '</td>' +
              '<td>' + (item.partdate ? item.partdate : '-') + '</td>'+
              '<td>' + (item.duetime ? item.duetime : '-') + '</td>'+
              '<td><button type="button" class="btn btn-primary locked" partid="'+ item.partid +'" id="'+ item.id +'" partwoid="'+ item.partwoid +'" partnum="'+ item.partnum +'">锁定</button></td></tr>'
          } else if (dataID == 2) {
            if (item.locator == 3) {
              html += '<tr class="kong">'
            } else {
              html += '<tr>'
            }

            html += '<td>' + (item.taskid ? item.taskid : '-') + '</td>' +
              '<td>' + (item.tasksource ? item.tasksource : '-') + '</td>' +
              '<td >' + (item.locator ? item.locator : '-') + '</td>' +
              '<td >' + (item.shelfcode ? item.shelfcode : '-') + '</td>' +
              '<td>' + (item.shelflay ? item.shelflay : '-') + '</td>' +
              '<td >' + (item.wipentityid ? item.wipentityid : '-') + '</td>' +
              '<td>' + (item.stockno ? item.stockno : '-') + '</td>' +
              '<td >' + (item.ismultipalforlot ? item.ismultipalforlot : '-') + '</td>' +
              '<td >' + (item.lotcode ? item.lotcode : '-') + '</td>' +
              '<td>' + (item.quantity ? item.quantity : '-') + '</td>' +
              '<td >' + (item.itemcode ? item.itemcode : '-') + '</td>' +
              '<td>' + (item.status ? item.status : '-') + '</td>' +
              '<td>' + (item.partdate ? item.partdate : '-') + '</td></tr>'

          } else if (dataID == 3) {
            html += '<tr><td>' + (item.taskid ? item.taskid : '-') + '</td>' +
              '<td>' + (item.tasksource ? item.tasksource : '-') + '</td>' +
              '<td >' + (item.locator ? item.locator : '-') + '</td>' +
              '<td >' + (item.shelfcode ? item.shelfcode : '-') + '</td>' +
              '<td>' + (item.invouttype ? item.invouttype : '-') + '</td>' +
              '<td >' + (item.wipentityid ? item.wipentityid : '-') + '</td>' +
              '<td>' + (item.stockno ? item.stockno : '-') + '</td>' +
              '<td >' + (item.Itemcode ? item.Itemcode : '-') + '</td>' +
              '<td>' + (item.quantity ? item.quantity : '-') + '</td>' +
              '<td >' + (item.outtime ? item.outtime : '-') + '</td>' +
              '<td>' + (item.statuscode ? item.statuscode : '-') + '</td>' +
              '<td>' + (item.statusinfor ? item.statusinfor : '-') + '</td></tr>'

          }

        })
        $(".listData").empty().append(html);
              // 锁定
      $(".locked").click(function(){
        var _this=this;
        console.log($(this).attr('partwoid'),$(this).attr('partid'))
        var num = $(this).attr('partnum');
        var html='<h2 class="title_name">提示 <span class="cols">X</span>  </h2>'+
        '<div class="list">'+
        '<table class="table table-responsive table-bordered table-hover piler_box" width="100%">'+
        '<tr>'+
                    '<th width="20%">工单号</th>'+
                    '<td  width="30%">'+ $(this).attr('partwoid') +'</td>'+
                    '<th width="20%">物料号</th>'+
                    '<td width="30%">'+ $(this).attr('partid') +'</td>'+
                '</tr>'+
                '<tr>'+
                    '<th width="20%">剩余数量</th>'+
                    '<td width="30%"><input type="text" class="num_text" value="'+ num +'"></td><td></td><td></td>'+
                '</tr>'+
                '<table>'+
                    '<div class="btn_box">'+
                        '<button type="button" class="btn btn-success success">确定锁定</button>'+
                    '</div>'+
        '</div>'
        $(".whcell_15f").html(html).show();
        $(".success").click(function(){
          if($(".num_text").val()>num){
            alert("请输入剩余数量。")
          }else{
            var lockedtypeData ={
            "lockedtype":2,
            "id":$(_this).attr('id'),
            "partnum":$(".num_text").val()
          }
          }

          $.ajax({
            type: "POST",
            url: "wms/updateLocked",
            contentType: "application/json;charset=utf-8",
            dataType: "JSON",
            async: false,
            data: JSON.stringify(lockedtypeData),
            success: function (resul) {
                alert('成功');
                $(".whcell_15f").empty().hide();
                allData("innerMaterial", data, dataID)
                    page(data, function() {
                      allData("innerMaterial", data, dataID)
                    })
            }, error: function (jqxhr, textStatus, error) {
                console.log(error);
    
            }
    
        })
        })
        $(".cols").click(function(){
          $(".whcell_15f").empty().hide();
        })
      })
      } else {
        $(".listData").empty();
      }
    });
  }


})