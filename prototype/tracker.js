$('.tracker-content').click(function(){
  trackerMapper[this.id]();
});

var thoughts = function() {
  $("#darken").toggleClass("active")
  $('#thought-popup').toggleClass("active");
};

var weight = function() {
  $("#darken").toggleClass("active")
  $('#weight-popup').toggleClass("active");
};

var calories = function() {
  $("#darken").toggleClass("active")
  $('#calories-popup').toggleClass("active");
};

var trackerMapper = {
  "thoughts": thoughts,
  "weight": weight,
  "calories": calories,
}

$("#darken, .popup-wrapper").click(function(e){
  console.log(e.target);
  var target = $(e.target);
  if(!(target.parents('div.popup').length || target.is('.popup')) 
    ||(target.is('.popup-x'))){
    // Close the popup
    $('.active').toggleClass('active');
  }
})