"use strict";
const id = document.querySelector("#id");
const pw = document.querySelector("#pw");
const registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", login);

function login() {
    if(!id.value) return alert("아이디를 입력해주십시오.");
    if(!pw.value) return alert("비밀번호를 입력해주십시오.");

    const req = {
        id: id.value,
        pw: pw.value
    };

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())
    .then((res) => {
        if(res.result == "yes") {
            alert("로그인 완료");
            location.href = "/";
        } else {
            if (res.err) return alert(res.err);
            if(res.result == "no_1")
                alert("아이디가 없습니다");
            if(res.result == "no_2")
                alert("비밀번호가 틀렸습니다");
        }
    })
    .catch((err) => {
        console.log(err);
    });    
}