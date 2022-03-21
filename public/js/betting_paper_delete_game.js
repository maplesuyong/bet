"use strict";
function deleteGame(id) {
    /* 경기 요소 삭제 */
    var parent = document.getElementById('paper');
    var child = document.getElementById('frame' + id);
    parent.removeChild(child);


    var rate = document.getElementById('rate');
    var temp = 1;

    // 경기를 삭제할 때마다 추가된 경기수를 저장한 hidden 타입의 input 요소에 1을 뺀다
    var lengthh = document.getElementById('length').value;
    document.getElementById('length').value = parseInt(lengthh-1);

     /* 남은 경기들 속성값 재정렬 및 총배당 재설정 */
    if(parent.children.length == 1){
        rate.value = 1;
        final_money.value = money.value;
    } else {
        for(var i = 0; i < parent.children.length-1; i++){
            parent.children[i+1].setAttribute('id', 'frame'+ (i+1));
            parent.children[i+1].children[0].setAttribute('value', i+1);
            parent.children[i+1].children[3].setAttribute('id', (i+1));
            parent.children[i+1].children[7].setAttribute('id', 'rate' + (i+1));
            temp *= parent.children[i+1].children[7].value;
            rate.value = temp.toFixed(2);

            /* 예상적중금액 재설정 */
            if(document.getElementById('money').value >= 100) {
                document.getElementById('final_money').value = Math.ceil(rate.value * document.getElementById('money').value / 100) * 100;
            }
        }
    }

}