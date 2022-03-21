"use strict";
function Activity(money, point){
    this.money = money;
    this.point = point;
}
var points = new Array();
points[0] = new Activity(5000, 5500);
points[1] = new Activity(10000, 11000);
points[2] = new Activity(30000, 33000);
points[3] = new Activity(50000, 55000);
points[4] = new Activity(100000, 110000);
points[5] = new Activity(500000, 550000);
points[6] = new Activity(1000000, 1100000);

function updatePoint(num){
    for (var i = 0; i < points.length; i++){
        if (num == points[i].money) {
            document.getElementById("point").value = points[i].point;
        } 
        if (num == ""){
            document.getElementById("point").value = "자동설정";
        }
    }
}