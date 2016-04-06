$('.tracker-content').click(function(){
  $("#darken").toggleClass("active")
  $('#'+this.id+'-popup').toggleClass("active");
});

$("#darken, .popup-wrapper").click(function(e){
  console.log(e.target);
  var target = $(e.target);
  if(!(target.parents('div.popup').length || target.is('.popup')) 
    ||(target.is('.popup-x'))){
    // Close the popup
    $('.active').toggleClass('active');
  }
})