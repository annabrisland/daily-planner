var currentTimeEL = $("#time-display");
var currentDayEl = $("#date-display");

// FUnction to get current time & date
function displayTime() {
    var nowTime = dayjs().format("HH:mm:ss");
    var nowDate = dayjs().format("DD MMM YYYY");
    currentTimeEL.text(nowTime);
    currentDayEl.text(nowDate);
}
// Call and refresh time every second
setInterval(displayTime, 1000);