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
  if(d.hasClass("send-active")) {
    $('#send-report').addClass("send-inactive");
    $('.send-active').removeClass("send-active");
    $('.sendable').unbind("click", addItem);
    $('.send-on').removeClass("send-on")
    console.log(d);
  } else {
    $('#send-report').addClass("send-active")
    $('#send-report').removeClass("send-inactive");
    $('#send-overlay').addClass("send-active");
    $('.sendable').addClass("send-active");

    $('.sendable').bind("click", addItem);
  }
  console.log(d);
  e.preventDefault();
  return false;
}

$('#report-cancel').click(toggleSend);

$('#report-submit').click(function(e){
  if($('#sendTextArea').val().length<1 || $(".send-on").length<1) return;
  $("#send-overlay-success").addClass("send-success");
  toggleSend(e);
  setTimeout( function(){$("#send-overlay-success").removeClass("send-success");}, 1500 );
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

$('#send-report').click();