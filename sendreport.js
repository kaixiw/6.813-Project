var emails = ["husband@husband.com"];
function split( val ) {
  return val.split( /,\s*/ );
}
function extractLast( term ) {
  return split( term ).pop();
}
$('#sendTextArea').bind( "keydown", function( event ) {
  if ( event.keyCode === $.ui.keyCode.TAB &&
      $( this ).autocomplete( "instance" ).menu.active ) {
    event.preventDefault();
  }
}).autocomplete({
  minLength: 0,
  source: function( request, response ) {
    // delegate back to autocomplete, but extract the last term
    response( $.ui.autocomplete.filter(
      emails, extractLast( request.term ) ) );
  },
  focus: function() {
    // prevent value inserted on focus
    return false;
  }
}).click(function(){            
            $(this).autocomplete( "search", "" );
});


var addItem = function(){
  console.log(this);
  $(this).toggleClass('send-on');
  return false;
}

var toggleSend = function(e) {
  d = $('#send-report');
  if(d.hasClass("send-active")) { // Disable send report mode
    $('#send-report').addClass("send-inactive");
    $('.send-active').removeClass("send-active");
    $('.sendable').unbind("click", addItem);
    $('.send-on').removeClass("send-on");
    $('.report-errors').addClass("hide");
    $('body').removeClass('send-mode');
    console.log(d);
  } else { // enable send report mode
    $('#send-report').addClass("send-active")
    $('#send-report').removeClass("send-inactive");
    $('#send-overlay').addClass("send-active");
    $('.sendable').addClass("send-active");
    $('body').addClass('send-mode');
    $('.sendable').bind("click", addItem);
    refreshReminders();
    refreshTodos();
  }
  console.log(d);
  e.preventDefault();
  return false;
}

$('#report-cancel').click(toggleSend);

$('#report-submit').click(function(e){
  var error=false;
  if($('#sendTextArea').val().length<1) {
    $("#error-email").removeClass("hide");
    error=true;
  } else {
    $("#error-email").addClass("hide");
  }

  if ($(".send-on").length<1) {
    $("#error-select").removeClass("hide");
    error=true;
  } else {
    $("#error-select").addClass("hide");
  }

  if(!error) {
    $("#send-overlay-success").addClass("send-success");
    toggleSend(e);
    setTimeout( function(){$("#send-overlay-success").removeClass("send-success");}, 1500 );   
  }
  return false;
});
/*
$(this).removeClass("send-active");
    $(this).addClass("send-inactive");
    */
$('#send-report.send-inactive').click(function(e){
  d = $('#send-report');
  if(d.hasClass("send-active")) {
    // do nothing
  } else {
    toggleSend(e);
  }
}); 

//$('#send-report').click();

$("#reminders .report-opt").click(function(){
  activatePopup({id:"reminders"});
});

$("#todos .report-opt").click(function(){
  activatePopup({id:"todos"});
});

$("#calories + .report-opt").click(function(){
  console.log("yay");
  activatePopup($("#calories")[0]);
});

$("#thoughts + .report-opt").click(function(){
  activatePopup($("#thoughts")[0]);
});

$("#weight + .report-opt").click(function(){
  activatePopup($("#weight")[0]);
});

/*
$('.datepicker').datepicker({
  minDate:new Date(2016,3,28), 
  maxDate:new Date(),
  beforeShow:function(){
    console.log('derp');
   $('#ui-datepicker-div').css('top',$(this).offset().top); 
  }
  });
$('.datepicker.start').datepicker('setDate', new Date(2016,3,28));
$('.datepicker.end').datepicker('setDate', new Date());
$('.datepicker').click(function(){
  
  $('#ui-datepicker-div').css('top',$(this).offset().top);
});*/
var minDate = new Date(2016,3,28);
var maxDate = new Date();

formatDate = function(d){
  return (d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();
}
$('.datepicker.start').val(formatDate(minDate));
$('.datepicker.end').val(formatDate(maxDate));

$('.send-options .submit button').click(function(){
  $('.active').toggleClass('active');
})
$('#reminder-select').multiSelect({ 
  keepOrder: true,
  selectableHeader:"Unselected",
  selectionHeader:"Selected"
});
$('#todo-select').multiSelect({ 
  keepOrder: true,
  selectableHeader:"Unselected",
  selectionHeader:"Selected"
});



var refreshReminders = function(){
  $('#reminder-select').empty();
  var elements = "";
  susan.reminders.forEach(function(e,n){
    elements+="<option value='reminder_"+n+"'>"+e+"</option>";
  });
  console.log(elements);
  $('#reminder-select').html(elements);
  $('#reminder-select').multiSelect('select_all');  
  $('#reminder-select').multiSelect('refresh');  
}
var refreshTodos = function(){
  $('#todo-select').empty();
  var elements = "";
  susan.todos.forEach(function(e,n){
    var complete = e.complete==true?" [Done]":"";
    elements+="<option value='todo_"+n+"'>"+e.text+complete+"</option>";
  });
  console.log(elements);
  $('#todo-select').html(elements);
  $('#todo-select').multiSelect('select_all');  
  $('#todo-select').multiSelect('refresh');  
}

$('.send-options input').keypress(function(e){
  if (e.which == 13) {
    $(this).parent().parent().siblings('.submit').find('button').click();
    return false;    //<---- Add this line
  }
})