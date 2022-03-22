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

// 세션
const session = require('express-session');
router.use(session({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

router.post('/betting_game_insert', function(req, res){
    var datetime = new Date();
    const sql = [req.session.user.code, req.body.total_num, req.body.total_rate, req.body.money, req.body.final_money, datetime, '경기대기',
    req.body.id[0], req.body.id[1], req.body.id[2], req.body.id[3], req.body.id[4], req.body.id[5], req.body.id[6], req.body.id[7], req.body.id[8], req.body.id[9],
    req.body.type[0], req.body.type[1], req.body.type[2], req.body.type[3], req.body.type[4], req.body.type[5], req.body.type[6], req.body.type[7], req.body.type[8], req.body.type[9],
    req.body.rate[0], req.body.rate[1], req.body.rate[2], req.body.rate[3], req.body.rate[4], req.body.rate[5], req.body.rate[6], req.body.rate[7], req.body.rate[8], req.body.rate[9],
    req.body.pick[0], req.body.pick[1], req.body.pick[2], req.body.pick[3], req.body.pick[4], req.body.pick[5], req.body.pick[6], req.body.pick[7], req.body.pick[8], req.body.pick[9]];
    db.query('INSERT INTO bets (user_id, total_num, total_rate, money, final_money, bet_date, state, game1, game2, game3, game4, game5, game6, game7, game8, game9, game10, type1, type2, type3, type4, type5, type6, type7, type8, type9, type10, rate1, rate2, rate3, rate4, rate5, rate6, rate7, rate8, rate9, rate10, pick1, pick2, pick3, pick4, pick5, pick6, pick7, pick8, pick9, pick10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', sql ,function (err, result) {
        if (err) throw err;
        db.query('SELECT money FROM users WHERE user_id = ?', req.session.user.code, function (err2, result2) {
            if (err2) throw err2;
            const sql2 = [req.session.user.code, req.body.money, result2[0].money, result2[0].money - req.body.money, '감소', datetime, '베팅'];
            db.query('INSERT INTO points (user_id, points, before_point, after_point, variation, record_date, contents) VALUES (?, ?, ?, ?, ?, ?, ?)', sql2, function (err3) {
                if (err3) throw err3;
                const sql3 = [req.body.money, req.session.user.code];
                db.query('UPDATE users SET money = money - ? WHERE user_id = ?', sql3 , function (err4){
                    if (err4) throw err4;
                    console.log("삽입완료");
                    res.redirect('/betting');
                });
            });
        });
    });
});

module.exports = router;