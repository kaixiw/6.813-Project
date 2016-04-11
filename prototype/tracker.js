var weightData;
var weightOptions;
var weightLineChart;
var CalorieData;
var CalorieOptions;
var CalorieLineChart;

$('.tracker-content').click(function(){
  $("#darken").toggleClass("active");
  $('#'+this.id+'-popup').toggleClass("active");
  if (this.id == 'weight') {
    var ctx = document.getElementById("weightChart").getContext("2d");
    weightData = {
      labels: ["April 5", "April 6", "April 7", "April 8", "April 9", "April 10", "April 11"],
      datasets: [
        {
          label: "My Weight",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [136, 142, 139, 147, 145, 141],
        },
      ]
    };
    weightOptions = {
      pointDotRadius: 8,
    };
    weightLineChart = new Chart(ctx).Line(weightData, weightOptions);
  } else if (this.id == 'calories') {
    var ctx = document.getElementById("CalorieChart").getContext("2d");
    CalorieData = {
      labels: ["April 5", "April 6", "April 7", "April 8", "April 9", "April 10", "April 11"],
      datasets: [
        {
          label: "My Calorie",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [1900, 2100, 2400, 1900, 2250, 2200],
        },
      ]
    };
    CalorieOptions = {
      pointDotRadius: 8,
    };
    CalorieLineChart = new Chart(ctx).Line(CalorieData, CalorieOptions);
  };
});

$("#darken, .popup-wrapper").click(function(e){
  console.log(e.target);
  var target = $(e.target);
  if(!(target.parents('div.popup').length || target.is('.popup')) 
    ||(target.is('.popup-x'))){
    // Close the popup
    $('.active').toggleClass('active');
    $('#similarCheckBox').attr('checked', false);
    $('#previousCheckBox').attr('checked', false);
  }
})


$("#submitJournal").click(function(){
	console.log("click");
	if ($("#journalTextarea").val() != ""){
		$("#journalTimeline").attr("src", "img/diarytimeline2.png");
		$("#journalTextarea").val("");
	}
})

$("#submitWeight").click(function(){
  if ($("#weightTextarea").val() != ""){
    $("#weightTextarea").val("");
    // weightLineChart.datasets[0].points[6].value = 100;
    // weightLineChart.update();
    weightData.datasets[0].data.push(146);
    weightLineChart.destroy();
    var ctx = document.getElementById("weightChart").getContext("2d");
    weightLineChart = new Chart(ctx).Line(weightData, weightOptions);
  }
})

$("#submitCalorie").click(function(){
  if ($("#CalorieTextarea").val() != ""){
    $("#CalorieTextarea").val("");
    CalorieData.datasets[0].data.push(2000);
    CalorieLineChart.destroy();
    var ctx = document.getElementById("CalorieChart").getContext("2d");
    CalorieLineChart = new Chart(ctx).Line(CalorieData, CalorieOptions);
  }
})

$("#similarCheckBox").click(function(){
  if($(this).is(':checked')) {
    weightData.datasets.push({
      label: "Similar User",
      fillColor: "rgba(173,102,31,0.2)",
      strokeColor: "rgba(173,102,31,1)",
      pointColor: "rgba(173,102,31,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(173,102,31,1)",
      data: [135, 133, 140, 135, 138, 142, 145],
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
      fillColor: "rgba(111,51,232,0.2)",
      strokeColor: "rgba(111,51,232,1)",
      pointColor: "rgba(111,51,232,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(111,51,232,1)",
      data: [130, 131, 135, 132, 134, 136, 135],
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
