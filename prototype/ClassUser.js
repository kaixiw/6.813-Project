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
    
    //fields
    
    this.name; //name of user
    this.pregnancyWeek; //week of pregnancy
    this.reminders; //data structure containing reminders
    this.weightHistory; //data structure containg weight history
    this.caloriesTarget; //target number of calories
    this.caloriesToday; //number of calories consumed today
    this.thoughts; // data structure containing thoughts
    
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
        
    }
    
    this.save = function(fieldLabel, info, opts){
        switch(fieldLabel){
            case FIELD_REMINDERS:
                if (opts === true && typeof info === "string"){
                    this.reminders["incomplete"].push(info);
                }else if (opts === false && typeof info === "number"){
                    //this.reminders["complete"].push(this.reminders["incomplete"].splice(info, 1)[0]);
                    //TODO: determine whether to cross out and keep completed tasks on the list for a while
                    //      or to immediately remove. Current implementation is to immediately remove.
                    this.reminders["incomplete"].splice(info, 1);
                    
                } 
                this.refresh(FIELD_REMINDERS);
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
                for (var i = 0; i < this.reminders["incomplete"].length; i++){
                    var li = document.createElement("li");
                    li.innerHTML = this.reminders["incomplete"][i];
                    ul.insertBefore(li, liList[liList.length - 1]);
                }
                break;
            case FIELD_WEIGHT_HISTORY:
                break;
            case FIELD_THOUGHTS:
                break;
            default:
                this.refresh(FIELD_REMINDERS);
        }
    }
    
    this.getData = function(){ //gets data, set to be false until backend implemented. Supposed to return data in some sort of structure
        return false; 
    }
}

var DEFAULT_DATA = {
    "NAME": "Susan",
    "PREGNANCY_WEEK": 23,
    "REMINDERS": {
        "complete": ["avoid alcohol"],
        "incomplete": ["log weight", "log calories"]
    },
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
