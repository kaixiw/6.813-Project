$(document).ready(function(){
    var susan = new User();
    susan.loadData();
    susan.refresh();
    $("#remindersInput").keypress(function(event){
        console.log(event.keyCode);
        if (event.keyCode == 13){
            susan.save(FIELD_REMINDERS, $("#remindersInput").val(), true);
            $("#remindersInput").val("");
        }
    });
    console.log("document loading complete");

});
