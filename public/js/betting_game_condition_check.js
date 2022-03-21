"use strict";
function conditionCheck(){
    const counting = document.getElementById("length").value;
    const betting_money = document.getElementById("money").value;
    const user_money = document.getElementById("display_money").dataset.money;
    if(counting < 2){
        alert("최소 경기수는 2박스 입니다");
        return false;
    } else if(parseInt(user_money) < parseInt(betting_money)) {
        alert("포인트가 부족합니다");
        return false;
    } else if(parseInt(betting_money) < 100) {
        alert("최소 베팅금액은 100원입니다");
        return false;
    } else if(parseInt(betting_money) % 100 != 0) {
        alert("백원단위로 베팅하실수 있습니다");
        return false;
    } else if(parseInt(betting_money > 100000)) {
        alert("최대 베팅금액은 100,000원입니다");
        return false;
    }
}