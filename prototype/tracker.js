var weightData = {
  labels: ["April 5", "April 6", "April 7", "April 8", "April 9", "April 10", "April 11"],
  datasets: [
    {
      label: "My Weight",
      fillColor: "rgba(225,105,92,0.2)",
      strokeColor: "rgba(225,105,92,1)",
      pointColor: "rgba(225,105,92,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(225,105,92,1)",
      data: [136, 142, 140, 147, 145, 149],
    },
  ]
};
var weightOptions = {
      pointDotRadius: 8,
};
var weightLineChart;
var CalorieData = {
  labels: ["April 5", "April 6", "April 7", "April 8", "April 9", "April 10", "April 11"],
  datasets: [
    {
      label: "My Calorie",
      fillColor: "rgba(225,105,92,0.2)",
      strokeColor: "rgba(225,105,92,1)",
      pointColor: "rgba(225,105,92,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(225,105,92,1)",
      data: [1900, 2100, 2400, 1900, 2250, 2200],
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
    weightLineChart = new Chart(ctx).Line(weightData, weightOptions);
    document.getElementById("weightTextarea").focus();
  } else if (this.id == 'calories') {
    var ctx = document.getElementById("CalorieChart").getContext("2d");
    CalorieLineChart = new Chart(ctx).Bar(CalorieData, CalorieOptions);
    document.getElementById("CalorieTextarea").focus();
  } else {
    // We are in Journal
    document.getElementById("journalTextarea").focus();
    
  };
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
    weightData.datasets = [weightData.datasets[0]];
    CalorieData.datasets = [CalorieData.datasets[0]];
  }
})


// $("#submitJournal").click(function(){
// 	console.log("click");
// 	if ($("#journalTextarea").val() != ""){
// 		$("#journalTimeline").attr("src", "img/diarytimeline2.png");
// 		$("#journalTextarea").val("");
// 	}
// })

$("#submitWeight").click(function(){
  if ($("#weightTextarea").val() != ""){
    $("#weightTextarea").val("");
    // weightLineChart.datasets[0].points[6].value = 100;
    // weightLineChart.update();
    weightData.datasets[0].data.push(146);
    weightLineChart.destroy();
    var ctx = document.getElementById("weightChart").getContext("2d");
    weightLineChart = new Chart(ctx).Line(weightData, weightOptions);
    $("#weightSubmitArea").css("display","none");
    $("#afterWeightSubmit").css("display","block");
  }
})

//Also submit weight when pressing enter in weight textbox
$('#weightTextarea').keydown(function (event) {
    var keypressed = event.keyCode || event.which;
    if (keypressed == 13) {
          if ($("#weightTextarea").val() != ""){
            $("#weightTextarea").val("");
            weightData.datasets[0].data.push(146);
            weightLineChart.destroy();
            var ctx = document.getElementById("weightChart").getContext("2d");
            weightLineChart = new Chart(ctx).Line(weightData, weightOptions);
            $("#weightSubmitArea").css("display","none");
            $("#afterWeightSubmit").css("display","block");
        }
    }
});

$("#submitCalorie").click(function(){
  if ($("#CalorieTextarea").val() != ""){
    $("#CalorieTextarea").val("");
    CalorieData.datasets[0].data.push(2000);
    CalorieLineChart.destroy();
    var ctx = document.getElementById("CalorieChart").getContext("2d");
    CalorieLineChart = new Chart(ctx).Bar(CalorieData, CalorieOptions);
    $("#CalorieSubmitArea").css("display","none");
    $("#afterCalorieSubmit").css("display","block");
  }
})

//Also submit weight when pressing enter in weight textbox
$('#CalorieTextarea').keydown(function (event) {
    var keypressed = event.keyCode || event.which;
    if (keypressed == 13) {
        if ($("#CalorieTextarea").val() != ""){
          $("#CalorieTextarea").val("");
          CalorieData.datasets[0].data.push(2000);
          CalorieLineChart.destroy();
          var ctx = document.getElementById("CalorieChart").getContext("2d");
          CalorieLineChart = new Chart(ctx).Bar(CalorieData, CalorieOptions);
          $("#CalorieSubmitArea").css("display","none");
          $("#afterCalorieSubmit").css("display","block");
        }
    }
});


$("#similarCheckBox").click(function(){
  if($(this).is(':checked')) {
    weightData.datasets.push({
      label: "Similar User",
      fillColor: "rgba(140,49,93,0.2)",
      strokeColor: "rgba(140,49,93,1)",
      pointColor: "rgba(140,49,93,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(140,49,93,1)",
      data: [135, 133, 134, 135, 138, 142, 145],
    });
  } else {
    if (weightData.datasets[1].label == 'Similar User') {
      weightData.datasets.splice(1, 1);
    } else if (weightData.datasets[2].label == 'Similar User') {
      weightData.datasets.splice(2, 1);
    }
  };
  weightLineChart.destroy();
  var ctx = document.getElementById("weightChart").getContext("2d");
  weightLineChart = new Chart(ctx).Line(weightData, weightOptions);
});

$("#previousCheckBox").click(function(){
  if($(this).is(':checked')) {
    weightData.datasets.push({
      label: "Previous Pregnancy",
      fillColor: "rgba(219, 18, 0,0.2)",
      strokeColor: "rgba(219, 18, 0,1)",
      pointColor: "rgba(219, 18, 0,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(219, 18, 0,1)",
      data: [130, 131, 132, 132, 134, 136, 135],
    });
  } else {
    if (weightData.datasets[1].label == 'Previous Pregnancy') {
      weightData.datasets.splice(1, 1);
    } else if (weightData.datasets[2].label == 'Previous Pregnancy') {
      weightData.datasets.splice(2, 1);
    }
  };
  weightLineChart.destroy();
  var ctx = document.getElementById("weightChart").getContext("2d");
  weightLineChart = new Chart(ctx).Line(weightData, weightOptions);
});
