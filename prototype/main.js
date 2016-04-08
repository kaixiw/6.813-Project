$(document).ready(function(){
    var susan = new User();
    susan.loadData();
    $("#remindersInput").keypress(function(event){
        console.log(event.keyCode);
        if (event.keyCode == 13){
            susan.save(FIELD_REMINDERS, $("#remindersInput").val(), true);
        }
    });
    console.log("document loading complete");

});
