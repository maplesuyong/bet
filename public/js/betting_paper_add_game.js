"use strict";
function addGame(id, league, date, game_id) {
    if(document.getElementById('hidden' + id)){
        alert("같은 경기가 이미 있습니다");
    } else {
        document.getElementsByName(id).forEach((node) => {
            if(node.checked) {
                var paper = document.getElementById('paper');

                var code = document.createElement('div');
                code.setAttribute('class', 'row my-2 border border-primary');
                code.setAttribute('style', 'text-align: center');
                code.setAttribute('id', 'frame' + paper.childElementCount);

                paper.appendChild(code);
            
                var child1 = document.createElement('input');
                child1.setAttribute('class', 'col-1');
                child1.setAttribute('style', 'text-align: center; padding:0; border: 1px solid rgba(0,0,0,.125); font-weight: bold;');
                child1.setAttribute('type', 'text');
                child1.setAttribute('name', 'count');
                child1.setAttribute('readonly', 'true');
                child1.setAttribute('value', (paper.childElementCount-1));
            
                var child2 = document.createElement('input');
                child2.setAttribute('class', 'col-5');
                child2.setAttribute('style', 'text-align: center; border: 1px solid rgba(0,0,0,.125);');
                child2.setAttribute('type', 'text');
                child2.setAttribute('name', 'home');
                child2.setAttribute('readonly', 'true');
                child2.setAttribute('value', node.dataset.home);
            
                var child3 = document.createElement('input');
                child3.setAttribute('class', 'col-5');
                child3.setAttribute('style', 'text-align: center; border: 1px solid rgba(0,0,0,.125);');
                child3.setAttribute('type', 'text');
                child3.setAttribute('name', 'away');
                child3.setAttribute('readonly', 'true');
                child3.setAttribute('value', node.dataset.away);
                
                var child4 = document.createElement('div');
                child4.setAttribute('class', 'col-1 btn-close');
                child4.setAttribute('id', (paper.childElementCount-1));
                child4.setAttribute('style', 'border: 1px solid rgba(0,0,0,.125);');
                child4.setAttribute('type', 'button');
                child4.setAttribute('aria-label', 'Close');
                child4.setAttribute('onclick', 'deleteGame(this.id)');

                var child5 = document.createElement('div');
                child5.setAttribute('class', 'col-3');
                child5.setAttribute('style', 'border: 1px solid rgba(0,0,0,.125);');
                child5.innerText = '베팅픽';
            
                var child6 = document.createElement('input');
                child6.setAttribute('class', 'col-3 text-danger');
                child6.setAttribute('style', 'text-align: center; border: 1px solid rgba(0,0,0,.125);');
                child6.setAttribute('type', 'text');
                child6.setAttribute('name', 'pick');
                child6.setAttribute('value', node.dataset.pick);
            
                var child7 = document.createElement('div');
                child7.setAttribute('class', 'col-3');
                child7.setAttribute('style', 'border: 1px solid rgba(0,0,0,.125);');
                child7.innerText = '배당';
            
                var child8 = document.createElement('input');
                child8.setAttribute('class', 'col-3 text-danger');
                child8.setAttribute('style', 'text-align: center; border: 1px solid rgba(0,0,0,.125);');
                child8.setAttribute('type', 'number');
                child8.setAttribute('name', 'rate');
                child8.setAttribute('id', 'rate' + (paper.childElementCount-1));
                child8.setAttribute('value', node.value);

                var child9 = document.createElement('input');
                child9.setAttribute('type', 'hidden');
                child9.setAttribute('name', 'league');
                child9.setAttribute('value', league);

                var child10 = document.createElement('input');
                child10.setAttribute('type', 'hidden');
                child10.setAttribute('name', 'date');
                child10.setAttribute('value', date);

                var child11 = document.createElement('input');
                child11.setAttribute('type', 'hidden');
                child11.setAttribute('name', 'type');
                child11.setAttribute('value', node.dataset.type);

                var child12 = document.createElement('input');
                child12.setAttribute('type', 'hidden');
                child12.setAttribute('name', 'id');
                child12.setAttribute('value', game_id);

                var frame = document.getElementById('frame' + (paper.childElementCount-1));
                frame.appendChild(child1);
                frame.appendChild(child2);
                frame.appendChild(child3);
                frame.appendChild(child4);
                frame.appendChild(child5);
                frame.appendChild(child6);
                frame.appendChild(child7);
                frame.appendChild(child8);
                frame.appendChild(child9);
                frame.appendChild(child10);
                frame.appendChild(child11);
                frame.appendChild(child12);

                // 픽이 추가될 때마다 최종예상결과의 배당이 바뀜
                var final_rate_node = document.getElementById('rate' + (paper.childElementCount-1));
                var final_rate = final_rate_node.value;
                
                var div_rate = document.getElementById('rate');
                var rate = div_rate.value * final_rate;
                div_rate.value = rate.toFixed(2);

                // 픽이 추가될 때마다 최종예상결과의 예상적중금액이 바뀜
                if(document.getElementById('money').value >= 100) {
                    document.getElementById('final_money').value = Math.ceil(document.getElementById('rate').value * document.getElementById('money').value / 100) * 100;
                }

                // 같은 경기추가 불가능하도록
                var hidden = document.createElement('input');
                hidden.setAttribute('type', 'hidden');
                hidden.setAttribute('id', 'hidden' + id);
                frame.appendChild(hidden);

                // 경기를 추가할 때마다 추가된 경기수를 저장한 hidden 타입의 input 요소에 1을 더한다
                var length = document.getElementById('length').value;
                document.getElementById('length').setAttribute('value', parseInt(length) + 1);
            }
        });
    }
}