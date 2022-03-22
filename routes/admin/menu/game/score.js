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

router.post('/admin_game_score/:game_id', function(req, res){
    const id = req.params.game_id;
    const home = parseInt(req.body.home);
    const away = parseInt(req.body.away);
    var result = "";
    if (home > away) {
        result = "승";
    } else if (home == away) {
        result = "무";
    } else {
        result = "패";
    }
    db.query('SELECT standard_handy, standard_unover FROM games WHERE game_id = ' + id, function(err2, standard){
        if (err2) throw err2;
        const handy = standard[0].standard_handy;
        const unover = standard[0].standard_unover;
        var result_handy = "";
        var result_unover = "";

        if (home + handy > away) {
            result_handy = "핸승";
        } else if (home + handy == away) {
            result_handy = "핸무";
        } else {
            result_handy = "핸패";
        }
        
        if (home + away < unover) {
            result_unover = "언더";
        } else {
            result_unover = "오버";
        }

        const sql = [home, away, result, result_handy, result_unover, id];
        db.query('UPDATE games SET home_score = ?, away_score = ?, result = ?, result_handy = ?, result_unover = ? WHERE game_id = ?', sql, function (err, result) {
            if (err) throw err;
            console.log("점수등록 완료");
            res.redirect('/admin');
        });
    });
});

module.exports = router;