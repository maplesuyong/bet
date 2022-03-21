"use strict";
function displayLeague(str) {
    if (str == "축구") {
        document.getElementById("football").style.display = "";
        document.getElementById("baseball").style.display = "none";
        document.getElementById("lol").style.display = "none";
        document.getElementById("league1_soccer").checked = false;
        document.getElementById("league2_soccer").checked = false;
        document.getElementById("league3_soccer").checked = false;
        document.getElementById("league4_soccer").checked = false;
        document.getElementById("league1_baseball").checked = false;
        document.getElementById("league2_baseball").checked = false;
        document.getElementById("league3_baseball").checked = false;
        document.getElementById("league4_baseball").checked = false;
        document.getElementById("league1_lol").checked = false;
        document.getElementById("league2_lol").checked = false;
        document.getElementById("league3_lol").checked = false;
    } else if (str == "야구") {
        document.getElementById("football").style.display = "none";
        document.getElementById("baseball").style.display = "";
        document.getElementById("lol").style.display = "none";
        document.getElementById("league1_soccer").checked = false;
        document.getElementById("league2_soccer").checked = false;
        document.getElementById("league3_soccer").checked = false;
        document.getElementById("league4_soccer").checked = false;
        document.getElementById("league1_baseball").checked = false;
        document.getElementById("league2_baseball").checked = false;
        document.getElementById("league3_baseball").checked = false;
        document.getElementById("league4_baseball").checked = false;
        document.getElementById("league1_lol").checked = false;
        document.getElementById("league2_lol").checked = false;
        document.getElementById("league3_lol").checked = false;
    } else if (str == "롤") {
        document.getElementById("football").style.display = "none";
        document.getElementById("baseball").style.display = "none";
        document.getElementById("lol").style.display = "";
        document.getElementById("league1_soccer").checked = false;
        document.getElementById("league2_soccer").checked = false;
        document.getElementById("league3_soccer").checked = false;
        document.getElementById("league4_soccer").checked = false;
        document.getElementById("league1_baseball").checked = false;
        document.getElementById("league2_baseball").checked = false;
        document.getElementById("league3_baseball").checked = false;
        document.getElementById("league4_baseball").checked = false;
        document.getElementById("league1_lol").checked = false;
        document.getElementById("league2_lol").checked = false;
        document.getElementById("league3_lol").checked = false;
    } else {
        document.getElementById("football").style.display = "none";
        document.getElementById("baseball").style.display = "none";
        document.getElementById("lol").style.display = "none";
        document.getElementById("league1_soccer").checked = false;
        document.getElementById("league2_soccer").checked = false;
        document.getElementById("league3_soccer").checked = false;
        document.getElementById("league4_soccer").checked = false;
        document.getElementById("league1_baseball").checked = false;
        document.getElementById("league2_baseball").checked = false;
        document.getElementById("league3_baseball").checked = false;
        document.getElementById("league4_baseball").checked = false;
        document.getElementById("league1_lol").checked = false;
        document.getElementById("league2_lol").checked = false;
        document.getElementById("league3_lol").checked = false;
    }
}