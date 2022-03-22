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

router.post('/admin_bet_refund/:bet_id', function (req, res) { 
    var datetime = new Date();
    var query = '';
    query += 'UPDATE bets SET state = "환급완료" WHERE bet_id = ' + req.params.bet_id + ';'
    db.query('SELECT user_id FROM bets WHERE bet_id = ' + req.params.bet_id, function (err, result) {
        if (err) throw err;
        query += 'UPDATE users SET money = money + ' + req.body.final_money + ' WHERE user_id = ' + result[0].user_id + ';'
        query += 'INSERT INTO points (user_id, points, before_point, after_point, variation, record_date, contents) VALUES (' + result[0].user_id + ', ' + req.body.final_money + ', ' + req.body.before_money + ', ' + (parseInt(req.body.before_money) + parseInt(req.body.final_money)) + ', "증가", ' + datetime + ', "당첨환급");'
        db.query(query, function (err) {
            if (err) throw err;
            console.log("환급완료!");
            res.redirect('/admin/bet');
        });
    });
});

module.exports = router;