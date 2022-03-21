"use strict";
// 경기유형 오리지날, 야구&롤 배당자동설정
function Activity(homerate, awayrate){
    this.homerate = homerate;
    this.awayrate = awayrate;
}
var rates = new Array();
rates[0] = new Activity(1.01, 6.28);
rates[1] = new Activity(1.12, 4.56);
rates[2] = new Activity(1.25, 3.00);
rates[3] = new Activity(1.41, 2.10);
rates[4] = new Activity(1.78, 1.78);
rates[5] = new Activity(2.10, 1.41);
rates[6] = new Activity(3.00, 1.25);
rates[7] = new Activity(4.56, 1.12);
rates[8] = new Activity(6.28, 1.01);
function updateRate(num){
    for (var i = 0; i < rates.length; i++){
        if (num == rates[i].homerate) {
            document.getElementById("awayRate_original_nofootball").value = rates[i].awayrate;
        } 
        if (num == ""){
            document.getElementById("awayRate_original_nofootball").value = "자동설정";
        }
    }
}

// 경기유형 핸디캡, 야구&롤 배당자동설정
function Activity2(homerate, awayrate){
    this.homerate = homerate;
    this.awayrate = awayrate;
}
var rates_handy = new Array();
rates_handy[0] = new Activity2(1.41, 2.10);
rates_handy[1] = new Activity2(1.78, 1.78);
rates_handy[2] = new Activity2(2.10, 1.41);
function updateHandyRate(num){
    for (var i = 0; i < rates_handy.length; i++){
        if (num == rates_handy[i].homerate) {
            document.getElementById("awayRate_handy_nofootball").value = rates_handy[i].awayrate;
        } 
        if (num == ""){
            document.getElementById("awayRate_handy_nofootball").value = "자동설정";
        }
    }
}

// 경기유형 언오버, 배당자동설정
function Activity3(homerate, awayrate){
    this.homerate = homerate;
    this.awayrate = awayrate;
}
var rates_unover = new Array();
rates_unover[0] = new Activity3(1.41, 2.10);
rates_unover[1] = new Activity3(1.78, 1.78);
rates_unover[2] = new Activity3(2.10, 1.41);

function updateUnoverRate(num){
    for (var i = 0; i < rates_unover.length; i++){
        if (num == rates_unover[i].homerate) {
            document.getElementById("awayRate_unover").value = rates_unover[i].awayrate;
        } 
        if (num == ""){
            document.getElementById("awayRate_unover").value = "자동설정";
        }
    }
}