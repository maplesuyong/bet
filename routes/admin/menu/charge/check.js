"use strict";

const express = require('express');
const router = express.Router();

// DB 연결
const mysql = require('mysql');
const db = mysql.createConnection({
    host     : 'localhost',    // 호스트 주소
    user     : 'root',           // mysql user
    password : '111111',       // mysql password
    database : 'toto',         // mysql 데이터베이스
    multipleStatements : true
});
db.connect();

router.post('/admin_charge_check/:charge_id', function (req, res) { 
    var query = "";
    query = 'UPDATE charges SET charge_date = now(), state = ' + true + ' WHERE charge_id = ' + req.params.charge_id + ';'
    query += 'UPDATE users SET money = money + ' + req.body.point + ' WHERE user_id = ' + req.body.user_id + ';'
    db.query(query, function (err, result2) {
        if (err) throw err;
        console.log("충전완료");
        res.redirect('/admin_charge');
    });
});

module.exports = router;