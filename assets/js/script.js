var currentTimeEL = $("#time-display");
var currentDayEl = $("#date-display");
var scheduleEl = $("#schedule-display");
var plans = [];

// Function to get current time & date
function displayTime() {
    var nowTime = dayjs().format("HH:mm:ss");
    var nowDate = dayjs().format("DD MMM YYYY");
    currentTimeEL.text(nowTime);
    currentDayEl.text(nowDate);
}
// Call and refresh time every second
setInterval(displayTime, 1000);

// Function to add schedule layout
function displaySchedule() {
    // convert to AM/PM
    for (var i = 9; i <= 17; i++) {
        if (i > 12) {
            var convertedTime = i - 12 + "PM";
        } else {
            var convertedTime = i + "AM";
        };

        // Colour code based on time
        var nowTime = dayjs().format("H");

        // Dynamically create schedule
        var timeBlockEl = $("<div>");
        var timeslot = $("<div>").text(convertedTime).addClass("hour");
        var timeBlock = $("<input>").addClass("time-block").attr("type", "text");
        timeBlock.attr("index", i - 9);
        // Add colour class
        if (i > nowTime) {
            timeBlock.addClass("future");
        } else if (i < nowTime) {
            timeBlock.addClass("past");
        } else {
            timeBlock.addClass("present");
        };
        
        var addButton = $("<button>").text("Add").addClass("saveBtn");
        timeBlockEl.append(timeslot, timeBlock, addButton);
        scheduleEl.addClass("schedule-block").append(timeBlockEl);
    }
   
}

// Create layout
displaySchedule();

// Function to save text to local storage
function saveInput(event) {
    event.preventDefault();
    var inputBlock = $(this).siblings("input").attr("index");
    var inputText = $(this).siblings("input").val().trim();
    var newEntry = {
        placement: inputBlock,
        textInput: inputText
    };
    plans.push(newEntry);
    localStorage.setItem("allPlans", JSON.stringify(plans));
}

// Function for retrieving from local storage & display inputs
function renderInput() {
    current = localStorage.getItem("allPlans");
    // check if allPlans exists
    if (current) {
        plans = JSON.parse(current);
    };
    // loop through all time blocks
    for (var i = 0; i < scheduleEl.children().length; i++) {
        // loop through array check if object placement = i
        for (var j = 0; j < plans.length; j++) {
            // if equal, add object inputText as text
            var checkPlacement = plans[j].placement;
            if (i == checkPlacement) {
                scheduleEl.children().eq(i).children("input").val(plans[j].textInput);
            }
        }
    }
}
renderInput();

// Event handler for saved text
scheduleEl.on("click", ".saveBtn", saveInput)