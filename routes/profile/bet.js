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

router.get('/bet', function(req, res){
    if(req.session.user){
        db.query('SELECT * FROM bets WHERE user_id = ? ORDER BY bet_date DESC', [req.session.user.code], function(err,result){
            if (err) throw err;
            res.render("profile/menu/profile_bet", {'result' : result});
        });
    } else {
        res.redirect("/login");
    }
});

module.exports = router;