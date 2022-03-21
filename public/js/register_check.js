"use strict";
const id = document.querySelector("#id");
const pw = document.querySelector("#pw");
const pw_check = document.querySelector("#pw_check");
const registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
    if(!id.value) return alert("아이디를 입력해주십시오.");
    if(pw.value !== pw_check.value)
        return alert("비밀번호가 일치하지 않습니다.");

    const req = {
        id: id.value,
        pw: pw.value
    };

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())
    .then((res) => {
        if(res.success == "yes") {
            alert("회원가입 완료");
            location.href = "/login";
        } else {
            if (res.err) return alert(res.err);
            alert("아이디가 중복입니다");
        }
    })
    .catch((err) => {
        console.log(err);
    });
}


console.log("test");