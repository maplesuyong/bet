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

router.get('/', function(req, res){
    if(req.session.user){
        db.query('SELECT * FROM bets WHERE user_id = ?', [req.session.user.code], function(err,result){
            if (err) throw err;
            res.render("charge", {'result' : result});
        });
    } else {
        res.redirect("/login");
    }
});

router.post('/apply', function(req, res){
    var datetime = new Date();
    if(req.session.user){
        db.query('INSERT INTO charges (user_id, money, charge_point, apply_date) VALUES (?, ?, ?, ?)', [req.session.user.code, req.body.money, req.body.point, datetime], function(err,result){
            if (err) throw err;
            console.log("충전신청완료");
            res.redirect("/profile");
        });
    } else {
        res.redirect("/login");
    }
});

module.exports = router;