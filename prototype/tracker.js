var weightData = {
  labels: ["April 28", "April 29", "April 30", "May 1", "May 2", "May 3", "May 4"],
  datasets: [
    {
      label: "My Weight",
      fillColor: "rgba(225,105,92,0.2)",
      strokeColor: "rgba(225,105,92,1)",
      pointColor: "rgba(225,105,92,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(225,105,92,1)",
      data: [136, 142, 140, 147, 145, 149, null],
    },
    {
      label: "Similar User",
      fillColor: "rgba(140,49,93,0.2)",
      strokeColor: "rgba(140,49,93,1)",
      pointColor: "rgba(140,49,93,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(140,49,93,1)",
      data: [null, null, null, null, null, null, null],
    },
    {
      label: "Previous Pregnancy",
      fillColor: "rgba(219, 18, 0,0.2)",
      strokeColor: "rgba(219, 18, 0,1)",
      pointColor: "rgba(219, 18, 0,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(219, 18, 0,1)",
      data: [null, null, null, null, null, null, null],
    }
  ]
};
var weightSimilarUserData = [135, 133, 134, 135, 138, 142, 145];
var weightPreviousPregnancyData = [130, 131, 132, 132, 134, 136, 135];
var weightOptions = {
  pointDotRadius: 8,
};
var weightLineChart;
var CalorieData = {
  labels: ["April 28", "April 29", "April 30", "May 1", "May 2", "May 3", "May 4"],
  datasets: [
    {
      label: "My Calorie",
      fillColor: "rgba(225,105,92,0.2)",
      strokeColor: "rgba(225,105,92,1)",
      pointColor: "rgba(225,105,92,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(225,105,92,1)",
      data: [1900, 2100, 2400, 2000, 2250, 2200, null],
    },
  ]
};
var CalorieOptions = {
  pointDotRadius: 8,
};
var CalorieLineChart;

$('.tracker-content').click(function(){
  if($(this).hasClass("send-active")) return;  // Don't activate popup if send is active

  $("#darken").toggleClass("active");
  $('#'+this.id+'-popup').toggleClass("active");
  if (this.id == 'weight') {
    var ctx = document.getElementById("weightChart").getContext("2d");
    $("#weightChart").attr('width', $("#weightPopup").width());
    $("#weightChart").attr('height', $("#weightPopup").width()/1.618);
    weightLineChart = new Chart(ctx).Line(weightData, weightOptions);
    document.getElementById("weightTextarea").focus();
  } else if (this.id == 'calories') {
    var ctx = document.getElementById("CalorieChart").getContext("2d");
    $("#CalorieChart").attr('width', $("#CaloriePopup").width());
    $("#CalorieChart").attr('height', $("#CaloriePopup").width()/1.618);

    // Note that the code snippet below is based on:
    // http://stackoverflow.com/questions/31092489/chart-js-draw-horizontal-line
    Chart.types.Bar.extend({
        name: "LineWithLine",
        initialize: function () {
            Chart.types.Bar.prototype.initialize.apply(this, arguments);
        },
        draw: function () {
            Chart.types.Bar.prototype.draw.apply(this, arguments);

            var point = this.datasets[0].bars[3];
            var scale = this.scale;

            // draw line
            this.chart.ctx.beginPath();
            this.chart.ctx.setLineDash([8]);
            this.chart.ctx.moveTo(scale.startPoint + 19.5, point.y);
            this.chart.ctx.strokeStyle = '#4d947c';
            this.chart.ctx.lineTo(this.chart.width - 17, point.y);
            this.chart.ctx.stroke();
            this.chart.ctx.setLineDash([]);
        }
    });

    CalorieLineChart = new Chart(ctx).LineWithLine(CalorieData, CalorieOptions, {
        datasetFill : false,
    });
    document.getElementById("CalorieTextarea").focus();

  } else {
    // We are in Journal
    document.getElementById("journalTextarea").focus();
    
  };
});
//Change the button colors on hovering over the tracker boxes
$('.tracker-content').hover(function(){
    $(this).find('.trackerButton').css('background-color',"#4d947c");
    $(this).find('.trackerButton').css('border-color',"#286853");
    $(this).find('img').css('bottom',"10px");

  }, function(){
    $(this).find('.trackerButton').css('background-color',"#8DC9B5");
    $(this).find('.trackerButton').css('border-color',"#4d947c");
    $(this).find('img').css('bottom',"0px");
});

$("#darken, .popup-wrapper").click(function(e){
  // console.log(e.target);
  var target = $(e.target);
  if(!(target.parents('div.popup').length || target.is('.popup')) 
    ||(target.is('.popup-x'))){
    // Close the popup
    $('.active').toggleClass('active');
    $('#similarCheckBox').attr('checked', false);
    $('#previousCheckBox').attr('checked', false);
    // weightData.datasets = [weightData.datasets[0]];
    // CalorieData.datasets = [CalorieData.datasets[0]];
  }
})

$("#submitWeight").click(function(){
  var val = $("#weightTextarea").val();
  $("#weightTextarea").val("");
  if (val != ""){
    if (!isNaN(val)) {
      weightLineChart.datasets[0].points[6].value = parseFloat(val);
      weightData.datasets[0].data[6] = parseFloat(val);
      weightLineChart.update();
      // weightData.datasets[0].data.push(146);
      // weightLineChart.destroy();
      // var ctx = document.getElementById("weightChart").getContext("2d");
      // weightLineChart = new Chart(ctx).Line(weightData, weightOptions);
      $("#weightSubmitArea").css("display","none");
      $(".weightdisplay").text(val + ' lbs');
      $("#afterWeightSubmit").css("display","block");
    } else {
      $("#weightTextarea").css("display","none");
      $("#submitWeight").css("display","none");
      $("#invalidWeightSubmit").css("display","block");
      setTimeout( function(){
        $("#weightTextarea").css("display","inline").focus();
        $("#submitWeight").css("display","inline");
        $("#invalidWeightSubmit").css("display","none");
      }, 1000 );
    }
  }
})

//Also submit weight when pressing enter in weight textbox
$('#weightTextarea').keydown(function (event) {
  var keypressed = event.keyCode || event.which;
  if (keypressed == 13) {
    var val = $("#weightTextarea").val();
    $("#weightTextarea").val("");
    if (val != ""){
      if (!isNaN(val)) {
        weightLineChart.datasets[0].points[6].value = parseFloat(val);
        weightData.datasets[0].data[6] = parseFloat(val);
        weightLineChart.update();
        $("#weightSubmitArea").css("display","none");
        $(".weightdisplay").text(val + ' lbs');
        $("#afterWeightSubmit").css("display","block");
      } else {
        $("#weightTextarea").css("display","none");
        $("#submitWeight").css("display","none");
        $("#invalidWeightSubmit").css("display","block");
        setTimeout( function(){
          $("#weightTextarea").css("display","inline").focus();
          $("#submitWeight").css("display","inline");
          $("#invalidWeightSubmit").css("display","none");
        }, 1000 );
      }
    }
  }
});

$("#editWeight").click(function(){
  $("#afterWeightSubmit").css("display","none");
  $("#weightSubmitArea").css("display","block");
  $("#weightTextarea").focus();
});

$("#submitCalorie").click(function(){
  var val = $('#CalorieTextarea').val();
  $("#CalorieTextarea").val("");
  if (val != ""){
    if (!isNaN(val)) {
      CalorieLineChart.datasets[0].bars[6].value = parseFloat(val);
      CalorieData.datasets[0].data[6] = parseFloat(val);
      CalorieLineChart.update();
      // CalorieData.datasets[0].data.push(2000);
      // CalorieLineChart.destroy();
      // var ctx = document.getElementById("CalorieChart").getContext("2d");
      // CalorieLineChart = new Chart(ctx).Bar(CalorieData, CalorieOptions);
      $("#CalorieSubmitArea").css("display","none");
      $(".Caloriedisplay").text(val + ' cal.');
      $("#afterCalorieSubmit").css("display","block");
    } else {
      $("#CalorieTextarea").css("display","none");
      $("#submitCalorie").css("display","none");
      $("#invalidCalorieSubmit").css("display","block");
      setTimeout( function(){
        $("#CalorieTextarea").css("display","inline").focus();
        $("#submitCalorie").css("display","inline");
        $("#invalidCalorieSubmit").css("display","none");
      }, 1000 );
    }
  }
})

//Also submit weight when pressing enter in weight textbox
$('#CalorieTextarea').keydown(function (event) {
  var keypressed = event.keyCode || event.which;
  if (keypressed == 13) {
    var val = $('#CalorieTextarea').val();
    $("#CalorieTextarea").val("");
    if (val != ""){
      if (!isNaN(val)) {
        CalorieLineChart.datasets[0].bars[6].value = parseFloat(val);
        CalorieData.datasets[0].data[6] = parseFloat(val);
        CalorieLineChart.update();
        $("#CalorieSubmitArea").css("display","none");
        $(".Caloriedisplay").text(val + ' cal.');
        $("#afterCalorieSubmit").css("display","block");
      } else {
        $("#CalorieTextarea").css("display","none");
        $("#submitCalorie").css("display","none");
        $("#invalidCalorieSubmit").css("display","block");
        setTimeout( function(){
          $("#CalorieTextarea").css("display","inline").focus();
          $("#submitCalorie").css("display","inline");
          $("#invalidCalorieSubmit").css("display","none");
        }, 1000 );
      }
    }
  }
});

$("#editCalorie").click(function(){
  $("#afterCalorieSubmit").css("display","none");
  $("#CalorieSubmitArea").css("display","block");
  $("#CalorieTextarea").focus();
});

$("#similarCheckBox").click(function(){
  if($(this).is(':checked')) {
    weightSimilarUserData.forEach(function(val, i) {
      weightLineChart.datasets[1].points[i].value = val;
    });
  } else {
    for (var i = 0; i < 7; i++) {
      weightLineChart.datasets[1].points[i].value = null;
    };
  };
  weightLineChart.update()
});

$("#previousCheckBox").click(function(){
  if($(this).is(':checked')) {
    weightPreviousPregnancyData.forEach(function(val, i) {
      weightLineChart.datasets[2].points[i].value = val;
    });
  } else {
    for (var i = 0; i < 7; i++) {
      weightLineChart.datasets[2].points[i].value = null;
    };
  };
  weightLineChart.update()
});
