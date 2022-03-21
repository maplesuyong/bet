"use strict";
const hometeam = document.querySelector("#home");
const awayteam = document.querySelector("#away");
function qqsubmit(){
    if(hometeam.value == awayteam.value) {
        alert("홈팀과 원정팀이 같습니다!");
        return false;
    }
}


