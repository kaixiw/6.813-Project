$(document).ready(function(){
    var susan = new User();
    CURRENT_USER = susan;
    susan.loadData();
    susan.refresh();
    $("#remindersInput").keypress(function(event){
        if (event.keyCode == 13){
            susan.save(FIELD_REMINDERS, "remindersInput", true);
            $("#remindersInput").val("");
        }
    });
    $("#remindersInput").on('blur', function(){
        $(this).val("");
        $(this).attr('placeholder', "Enter reminder here");
    });
    $("#remindersInput").addClass("remindersInputBox");
    $("#todosInput").keypress(function(event){
        if (event.keyCode == 13){
            susan.save(FIELD_TODOS, "todosInput", true);
            $("#todosInput").val("");
        }
    });
    $("#todosInput").on('blur', function(){
        $(this).val("");
        $(this).attr('placeholder', "Enter Todo here");
    });
    $("#todosInput").addClass("todosInputBox");

    console.log("document loading complete");

});
