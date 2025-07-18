//get the date
var date = new Date();
console.log(date);

//extract the current date info
var currentMonth = date.getMonth();
var currentDay = date.getDay();
var currentDate = date.getDate();
var currentYear = date.getDate();

console.log(currentMonth); //current month -1
console.log(currentDay); //day of the week
console.log(currentDate); //current date/number
console.log(currentYear); //current year

//IMPORTANT DATE INFO
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
//set the correct month

var title = document.getElementById("title");
title.innerHTML = "🌸 " + months[currentMonth] + " 🌸 ";

//update the calender info
var habitTitle = document.getElementById("habitTitle");
habitTitle.onclick = function () {
  let habits = prompt("Whats your habit", habitTitle.innerHTML);
  if (habits.length == 0) {
    habitTitle.innerHTML = "Click to set your habit";
  } else {
    habitTitle.innerHTML = habits;
  }
};
//set total days
var daysInTheMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var daysInTheMonth = daysInTheMonthList[currentMonth];

var daysCompleted = 0;
var totalDays = document.getElementById("totalDays");
totalDays.innerHTML = "0/" + daysInTheMonth;
//setup the calender days

var dayCount = 0;
var rowCount = 0;
var days = document.getElementsByClassName("days");

for (var i = 0; i < days.length; i++) {
  var day = days[rowCount].getElementsByClassName("day");
  for (var j = 0; j < day.length; j++) {
    if (dayCount == currentDate - 1) {
      day[j].setAttribute("style", "color:rgb(234,1,144)");
      day[j].setAttribute("style", "border:2px solid black");
    }
    if (dayCount < daysInTheMonth) {
      day[j].innerHTML = dayCount + 1;
      day[j].setAttribute("id", "day" + (dayCount + 1));
      dayCount++;
    } else {
      day[j].innerHTML = "";
      day[j].setAttribute("style", "background-color:white");
    }
  }
  rowCount++;
}
/* INITIALIZE COMPLETED ARRAY */
var completed = new Array(31);
for (var i = 0; i < dayCount; i++) {
  var tempString = "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
  console.log("storing date: " + tempString);
  var tempDay = localStorage.getItem(tempString);
  console.log(tempDay);
  if (tempDay == null || tempDay == "false") {
    localStorage.setItem(tempString, "false");
  } else if (tempDay == "true") {
    daysCompleted++;
  }
  totalDays.innerHTML = daysCompleted + "/" + daysInTheMonth;
}

console.log("completed array: " + completed);
console.log("total days completed: " + daysCompleted);
/*CHECK STORAGE AND UPDATE COMPLETED ARRAY */

for (var i = 0; i < currentDate; i++) {
  var tempString = "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
  console.log(tempString);

  var chosenDay = localStorage.getItem(tempString);
  console.log(i + 1 + ": " + chosenDay);
  var chosenDayDiv = document.getElementById("day" + (i + 1));
  if (chosenDay === "true") {
    chosenDayDiv.style.backgroundColor = "pink";
  } else if (chosenDay === "false") {
    chosenDayDiv.style.backgroundColor = "white";
  }
}
//update completed on calender
var dayDivs = document.querySelectorAll(".day");
for (var i = 0; i < currentDate; i++) {
  dayDivs[i].onclick = function (e) {
    var num = e.target.innerText;
    var selectedDate = document.getElementById(e.target.id);
    var storageString = "" + (currentMonth + 1) + "-" + num + "-" + currentYear;

    if (localStorage.getItem(storageString) === "false") {
      selectedDate.style.backgroundColor = "pink";
      localStorage.setItem(storageString, true);
      daysCompleted++;
    } else if (localStorage.getItem(storageString) === "true") {
      selectedDate.style.backgroundColor = "white";
      localStorage.setItem(storageString, false);
      daysCompleted--;
    }
    totalDays.innerHTML = daysCompleted + "/" + dayCount;
    console.log(daysCompleted, currentDate);
    if (daysCompleted === currentDate) {
      alert("Great Progress!");
    }
  };
}
// RESET BUTTON
resetButton = document.getElementById("resetButton");
resetButton.onclick = function () {
  for (i = 0; i < dayCount; i++) {
    var tempStrings = currentMonth + 1 + "-" + (i + 1) + "-" + currentYear;
    localStorage.setItem(tempStrings, "false");
    var daySquare = document.getElementById("day" + (i + 1));
    daySquare.style.backgroundColor = "white";
  }
  daysCompleted = 0;
  totalDays.innerHTML = daysCompleted + "/" + daysInTheMonth;
};
