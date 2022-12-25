var chosen = document.getElementById("chosen_date");
var output = document.getElementById("countdown");
var date = "";

var texts = [
  "Text number 0",
  "Text number 1 ",
  "Text number 2",
  "Text number 3",
];
var dates = [
  "December 25, 2022 23:14:00",
  "May 10, 2023 11:00:00",
  "January 30, 2023 15:25:10",
  "2023",
];

//creating a minimum to the calendar
var today = new Date();
let toDay = today.getDate();
let toMonth = today.getMonth() + 1;
let toYear = today.getFullYear();
document.getElementById("calendar").min = toYear + "-" + toMonth + "-" + toDay;

//function that creates the countdown
var x;
function starting() {
  var all = document.getElementsByClassName("data");

  if (date == "") {
    for (var i = 0; i < all.length; i++) {
      date += all[i].value + " ";
      chosen.innerHTML += " " + all[i].value;

      all[i].value = "";
    }
  }

  console.log(date);
  var dayToCount = new Date(date).getTime();

  x = setInterval(function () {
    var now = new Date().getTime();
    var distance = dayToCount - now;

    output = document.getElementById("countdown");

    if (distance < 0) {
      output.innerHTML = "Countdown has come to an end";

      clearInterval(x);
      console.log(date, dates, dates.includes(date));
      if (dates.includes(date)) {
        document.getElementById("hide").style.display = "";
      } else {
        document.getElementById("bye").style.display = "";
      }
    } else {
      var og_seconds = distance / 1000;
      var days = Math.floor(og_seconds / 60 / 60 / 24);
      var hours = Math.floor(og_seconds / 60 / 60) - days * 24;
      var minutes = Math.floor(og_seconds / 60) - days * 24 * 60 - hours * 60;
      var seconds = Math.floor(
        og_seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60
      );

      output.innerHTML =
        days +
        " days " +
        hours +
        " hours " +
        minutes +
        " minutes " +
        seconds +
        " seconds ";
    }
  }, 1000);
}

//function that reacts to enter key

function submit(event) {
  if (event.keyCode === 13) {
    date += event.target.value + " ";
    event.target.value = "";

    //displaying the days
    chosen.innerHTML = "Chosen date and time:   " + date;
  }
}

//function that stops the countdown, deletes the chosen date

function reset() {
  date = "";
  chosen.innerHTML = "Chosen date and time:   " + date;
  clearInterval(x);
  output.innerHTML = "";
  document.getElementById("hide").style.display = "none";
  document.getElementById("bye").style.display = "none";
}

//function that is used for the second type of calendar
function getDateOwn() {
  var calendar = document.getElementById("calendar");
  var time = document.getElementById("time");
  date = calendar.value + " " + time.value;
  chosen.innerHTML = "Chosen date and time:   " + date;

  starting();
}

//function that sets the calendar to its original position
function deleter(event) {
  event.target.value = "";
}

//all automat autofill

function autofill() {
  //clearing everything left
  reset();

  var used = parseInt(document.getElementById("autofill_select").value);
  //setting the date
  date = dates[used];
  chosen.innerHTML = "Chosen date and time:   " + date;

  //start
  starting();

  //setting the pic
  document.getElementById("hidden_img").src = used + "_img.png";
  //setting the text
  document.getElementById("hidden_text").innerHTML = texts[used];
}
