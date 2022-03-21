"use strict"
function submitCheck() {
    var radio_sports = document.getElementsByName("sports");
    var radio_leagues = document.getElementsByName("leagues");
    var value_sports = null;
    var value_leagues = null;

    for(var i = 0; i < radio_sports.length; i++) {
        if(radio_sports[i].checked == true) { 
            value_sports = radio_sports[i].value;
        }
    }

    for(var i = 0; i < radio_leagues.length; i++) {
        if(radio_leagues[i].checked == true) { 
            value_leagues = radio_leagues[i].value;
        }
    }

    if (value_sports == null) {
        alert("종목을 선택하세요"); 
        return false;
    } else if (value_sports == "전체" && value_leagues == null) { 
        return true;
    } else if (value_sports != "전체" && value_leagues == null) {
        alert("리그를 선택하세요"); 
        return false;
    } else {
        return true;
    }
}