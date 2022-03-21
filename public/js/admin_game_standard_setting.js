"use strict";
// 종목에 따른 핸디 기준점 세팅
function Activity4(sport, standard, value){
    this.sport = sport;
    this.standard = standard;
    this.value = value;
}
var handys = new Array();
handys[0] = new Activity4('축구', ['기준점을 선택해주세요', '+1.0', '+2.0', '+3.0', '-1.0', '-2.0', '-3.0'], ['', 1, 2, 3, -1, -2, -3]);
handys[1] = new Activity4('야구', ['기준점을 선택해주세요', '+1.5', '+2.5', '+3.5', '-1.5', '-2.5', '-3.5'], ['', 1.5, 2.5, 3.5, -1.5, -2.5, -3.5]);
handys[2] = new Activity4('롤', ['기준점을 선택해주세요', '+1.5', '-1.5', '+2.5', '-2.5'], ['', 1.5, -1.5, 2.5, -2.5]);

function updateStandardHandy(str){
    var frm = document.gameForm;
    var oriLen = frm.myStandard_handy.length;
    var numHandys;

    for (var i = 0; i < handys.length; i++){
        if (str == handys[i].sport) {
            numHandys = handys[i].standard.length;
            for (var j = 0; j < numHandys; j++)
                frm.myStandard_handy.options[j] = new Option(handys[i].standard[j], handys[i].value[j]);
            for (var j = numHandys; j < oriLen; j++)
                frm.myStandard_handy.options[numHandys] = null;
        }
    }
}

// 종목에 따른 언오버 기준점 세팅
function Activity5(sport, standard, value){
    this.sport = sport;
    this.standard = standard;
    this.value = value;
}
var unovers = new Array();
unovers[0] = new Activity5('축구', ['기준점을 선택해주세요', '+1.5', '+2.5', '+3.5'], ['', 1.5, 2.5, 3.5]);
unovers[1] = new Activity5('야구', ['기준점을 선택해주세요', '+5.5', '+6.5', '+7.5', '+8.5', '+9.5', '+10.5', '+11.5', '+12.5'], ['', 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 11.5, 12.5]);
unovers[2] = new Activity5('롤', ['기준점을 선택해주세요', '14.5', '16.5', '18.5', '20.5', '22.5', '24.5', '26.5', '28.5', '30.5'], ['', 14.5, 16.5, 18.5, 20.5, 22.5, 24.5, 26.5, 28.5, 30.5]);

function updateStandardUnover(str){
    var frm = document.gameForm;
    var oriLen = frm.myStandard_unover.length;
    var numUnovers;

    for (var i = 0; i < unovers.length; i++){
        if (str == unovers[i].sport) {
            numUnovers = unovers[i].standard.length;
            for (var j = 0; j < numUnovers; j++)
                frm.myStandard_unover.options[j] = new Option(unovers[i].standard[j], unovers[i].value[j]);
            for (var j = numUnovers; j < oriLen; j++)
                frm.myStandard_unover.options[numUnovers] = null;
        }
    }
}