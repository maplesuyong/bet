"use strict";

var test = document.getElementById('test').value;
var htmlDate = new Date(test);
console.log("오늘날짜1: " + htmlDate);
htmlDate.setMinutes(htmlDate.getMinutes() - htmlDate.getTimezoneOffset());
console.log("오늘날짜2: " + htmlDate);
document.getElementById('box').valueAsDate = htmlDate;