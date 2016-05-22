//this function represents the class user

function User(){
    //global static labels of fields
    
    FIELD_NAME = "NAME";
    FIELD_PREGNANCY_WEEK = "PREGNANCY_WEEK";
    FIELD_REMINDERS = "REMINDERS";
    FIELD_WEIGHT_HISTORY = "WEIGHT_HISTORY";
    FIELD_CALORIES_TARGET = "CALORIES_TARGET";
    FIELD_CALORIES_TODAY = "CALORIES_TODAY";
    FIELD_THOUGHTS = "THOUGHTS";
    FIELD_TODOS = "TODOS";
    
    //fields
    
    this.name; //name of user
    this.pregnancyWeek; //week of pregnancy
    this.reminders; //data structure containing reminders
    this.weightHistory; //data structure containg weight history
    this.caloriesTarget; //target number of calories
    this.caloriesToday; //number of calories consumed today
    this.thoughts; // data structure containing thoughts
    this.todos;
    
    //methods

    this.loadData = function(){// initial constructor method to load user data      
        if (this.getData()){
            //left blank until backend implemented
        }else{
            var data = DEFAULT_DATA;//default data stub
        }
        this.name = data[FIELD_NAME];
        this.pregnancyWeek = data[FIELD_PREGNANCY_WEEK];
        this.reminders = data[FIELD_REMINDERS];
        this.weightHistory = data[FIELD_WEIGHT_HISTORY];
        this.caloriesTarget = data[FIELD_CALORIES_TODAY];
        this.thoughts = data[FIELD_THOUGHTS];
        this.todos = data[FIELD_TODOS];
        
    }
    
    this.save = function(fieldLabel, info, opts){
        switch(fieldLabel){
            case FIELD_REMINDERS:
                if (opts === true && typeof info === "string"){//for adding
                    if (info == "remindersInput"){
                        var reminder = document.getElementById(info).value;
                        if (reminder == "") return;
                        this.reminders.push(reminder);        
                    }else{
                        var index = info.substring(info.indexOf("_") + 1, info.length);
                        var reminder = document.getElementById("editReminder_" + index).value;
                        if (reminder == "") return;
                        this.reminders[index] = reminder;
                    }
                }else if (opts === false && typeof info === "string"){//for removing
                    var index = info.substring(info.indexOf("_") + 1, info.length);
                    this.reminders.splice(index, 1);
                }
                this.refresh(FIELD_REMINDERS);
                break;
            case FIELD_TODOS:
                if (opts === true && typeof info === "string"){//for adding
                    if (info == "todosInput"){
                        var todoText = document.getElementById(info).value;
                        if (todoText == "") return;
                        var todo = {"text": todoText, "complete": false};
                        this.todos.push(todo);        
                    }else{
                        var index = info.substring(info.indexOf("_") + 1, info.length);
                        if (document.getElementById("editTodo_" + index)){
                            var todoText = document.getElementById("editTodo_" + index).value;
                        }else{
                            var todoText = this.todos[index]["text"];
                        }
                        if (todoText == "") return;
                        this.todos[index]["text"] = todoText;
                        this.todos[index]["complete"] = !this.todos[index]["complete"];//toggles to other boolean
                    }
                }else if (opts === false && typeof info === "string"){//for removing
                    var index = info.substring(info.indexOf("_") + 1, info.length);
                    this.todos.splice(index, 1);
                }
                this.refresh(FIELD_TODOS);
                break;
            case FIELD_WEIGHT_HISTORY:
                break;
            case FIELD_THOUGHTS:
                break;
            default:
                //maybe load everything
        }
    }
    
    this.refresh = function(fieldLabel){// for refreshing upon new data entry
        switch(fieldLabel){
            case FIELD_REMINDERS:
                $('#remindersList li').not('li:last').remove();
                var ul = document.getElementById("remindersList");
                var liList = ul.getElementsByTagName("li");
                for (var i = 0; i < this.reminders.length; i++){
                    var li = document.createElement("li");
                    var checkBox = document.createElement("input");
                    var label = document.createElement("label");
                    label.htmlFor = "reminderDelete_" + i;
                    checkBox.type = "checkbox";
                    checkBox.id = "reminderDelete_" + i;
                    checkBox.onchange = function(event){
                        if (event.target.checked == true){
                            CURRENT_USER.save(FIELD_REMINDERS, event.target.parentNode.id, false);
                        }
                    }
                    checkBox.className = "deleteCheckbox";
                    li.innerHTML = '<p>' + this.reminders[i] + '</p>';
                    li.id = "reminder_" + i;
                    li.appendChild(checkBox);
                    li.appendChild(label);
                    ul.insertBefore(li, liList[liList.length - 1]);
                }
                $('#remindersList li').not('li:last').dblclick(function(event){
                    var editID = this.id;
                    var editIndex = editID.substring(editID.indexOf("_") + 1, editID.length);
                    var reminder = CURRENT_USER.reminders[editIndex];
                    this.innerHTML = "";
                    var editInput = $("<input>").appendTo("#" + this.id);
                    editInput.attr('id', "editReminder_"+ editIndex);
                    editInput.addClass('remindersInputBox');
                    //$("#" + event.target.id).append(editInput);
                    editInput.val(reminder);
                    editInput.focus();
                    editInput.keypress(function(event){
                        if (event.keyCode == 13){
                            CURRENT_USER.save(FIELD_REMINDERS, editID, true);
                        }
                    });
                    editInput.on('blur', function(){
                        editInput.parent().html('<p>' + CURRENT_USER.reminders[editIndex] + '</p>');
                        var checkBox = document.createElement("input");
                        checkBox.type = "checkbox";
                        checkBox.className = "deleteCheckbox";
                        checkBox.id = "reminderDelete_" + editIndex;
                        var label = document.createElement("label");
                        label.htmlFor = "reminderDelete_" + editIndex;
                        checkBox.onchange = function(event){
                            if (event.target.checked == true){
                                CURRENT_USER.save(FIELD_REMINDERS, event.target.parentNode.id, false); 
                            }                        
                        }
                        document.getElementById(editID).appendChild(checkBox);
                        document.getElementById(editID).appendChild(label);
                    });
                });
                break;
            case FIELD_TODOS:
                $('#todosList li').not('li:last').remove();
                var ul = document.getElementById("todosList");
                var liList = ul.getElementsByTagName("li");
                for (var i = 0; i < this.todos.length; i++){
                    var li = document.createElement("li");
                    var checkBox = document.createElement("input");
                    checkBox.type = "checkbox";
                    if (this.todos[i]["complete"] == true){
                        checkBox.checked = true;
                        li.innerHTML = '<p>' + this.todos[i]["text"].strike() + '</p>';
                        li.className = "completed";
                    }else{
                        li.innerHTML = '<p>' + this.todos[i]["text"] + '</p>';
                    }
                    checkBox.onchange = function(event){
                        CURRENT_USER.save(FIELD_TODOS, event.target.parentNode.id, true);
                    }
                    checkBox.className = "todosCheck";
                    li.id = "todo_" + i;
                    var deleteCheckBox = document.createElement("input");
                    var label = document.createElement("label");
                    label.htmlFor = "todoDelete_" + i;
                    deleteCheckBox.type = "checkbox";
                    deleteCheckBox.id = "todoDelete_" + i;
                    deleteCheckBox.onchange = function(event){
                        CURRENT_USER.save(FIELD_TODOS, event.target.parentNode.id, false);
                    }
                    deleteCheckBox.className = "deleteCheckbox";
                    li.appendChild(checkBox);
                    li.appendChild(deleteCheckBox);
                    li.appendChild(label);
                    ul.insertBefore(li, liList[liList.length - 1]);
                }
                $('#todosList li').not('li:last').dblclick(function(event){
                    var editID = this.id;
                    var editIndex = editID.substring(editID.indexOf("_") + 1, editID.length);
                    var todo = CURRENT_USER.todos[editIndex];
                    if (todo["complete"] == true) return;
                    this.innerHTML = "";
                    var editInput = $("<input>").appendTo("#" + this.id);
                    editInput.attr('id', "editTodo_"+ editIndex);
                    editInput.addClass('todosInputBox');
                    //$("#" + event.target.id).append(editInput);
                    editInput.val(todo["text"]);
                    editInput.focus();
                    editInput.keypress(function(event){
                        if (event.keyCode == 13){
                            CURRENT_USER.save(FIELD_TODOS, editID, true);
                        }
                    });
                    editInput.on('blur', function(){
                        editInput.parent().html('<p>' + CURRENT_USER.todos[editIndex]["text"] + '</p>');
                        var checkBox = document.createElement("input");
                        checkBox.type = "checkbox";
                        checkBox.className = "todosCheck";
                        checkBox.onchange = function(event){
                            CURRENT_USER.save(FIELD_TODOS, event.target.parentNode.id, true); 
                        }
                        var deleteCheckBox = document.createElement("input");
                        var label = document.createElement("label");
                        label.htmlFor = "todoDelete_" + editIndex;
                        deleteCheckBox.type = "checkbox";
                        deleteCheckBox.id = "todoDelete_" + editIndex;
                        deleteCheckBox.onchange = function(event){
                            CURRENT_USER.save(FIELD_TODOS, event.target.parentNode.id, false);
                        }
                        deleteCheckBox.className = "deleteCheckbox";
                        document.getElementById(editID).appendChild(checkBox);
                        document.getElementById(editID).appendChild(deleteCheckBox);
                        document.getElementById(editID).appendChild(label);
                    });
                });
                break;
            case FIELD_WEIGHT_HISTORY:
                break;
            case FIELD_THOUGHTS:
                break;
            default:
                this.refresh(FIELD_REMINDERS);
                this.refresh(FIELD_TODOS);
        }
    }
    
    this.getData = function(){ //gets data, set to be false until backend implemented. Supposed to return data in some sort of structure
        return false; 
    }
}

var DEFAULT_DATA = {
    "NAME": "Susan",
    "PREGNANCY_WEEK": 23,
    "TODOS": [{"text": "exercise", "complete": true}, {"text": "watch new episode of GoT", "complete": "false"}],
    "REMINDERS": ["avoid alcohol"],
    "WEIGHT_HISTORY": {
        "201604022100": 120,
        "201604050800": 125,
        "201604070800": 127,    
    },
    "CALORIES_TARGET": 2500,
    "CALORIES_TODAY": 1250,
    "THOUGHTS": {
        "201604072100": "Pregnancy is hard"
    }
}
