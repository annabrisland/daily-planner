var currentTimeEL = $("#time-display");
var currentDayEl = $("#date-display");
var scheduleEl = $("#schedule-display");

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
        var timeBlock = $("<input>").addClass("time-block");
        var addButton = $("<button>").text("Add").addClass("saveBtn");
        timeBlockEl.append(timeslot, timeBlock, addButton);
        scheduleEl.addClass("schedule-block").append(timeBlockEl);
    }
   
}

displaySchedule();