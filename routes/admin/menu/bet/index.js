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

router.get('/bet', function (req, res) { 
    db.query('SELECT bet_id, t1.user_id, bet_date, t2.id, final_money, t1.money, t2.money AS user_money, state FROM bets AS t1 LEFT JOIN users AS t2 ON t1.user_id = t2.user_id ORDER BY bet_date DESC', function (err, result) {
        if (err) throw err;
        res.render('admin/menu/admin_bet', {'result' : result});
    });
});

module.exports = router;