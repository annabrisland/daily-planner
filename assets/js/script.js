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
    for (var i = 9; i <= 17; i++) {
        if (i > 12) {
            var convertedTime = i - 12 + "PM";
        } else {
            var convertedTime = i + "AM";
        };

        var timeBlockEl = $("<div>");
        var timeslot = $("<div>").text(convertedTime).addClass("hour");
        var timeBlock = $("<input>").addClass("time-block").attr("type", "text");
        timeBlock.attr("index", i - 9);
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
    var inputText = $(this).siblings("input").val();
    var newEntry = {
        placement: inputBlock,
        textInput: inputText
    };
    plans.push(newEntry);
    localStorage.setItem("allPlans", JSON.stringify(plans));
}

// Event handler for saved text
scheduleEl.on("click", ".saveBtn", saveInput)