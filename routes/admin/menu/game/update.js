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

router.get('/admin_game_modify/:game_id', function(req, res){
    console.log(req.params.game_id);
    res.render("admin/crud/admin_game_modify", {'result' : req.params.game_id});
});

router.post('/admin_game_update/:game_id', function(req, res){
    console.log(req.body);
    console.log(req.params.game_id);
    const sql = [req.body.sports, req.body.myList, req.body.date, req.body.mySelect1, req.body.mySelect2,
        req.body.homeRate, req.body.drawRate, req.body.awayRate, req.body.myStandard_handy, req.body.myStandard_unover,
        req.body.homeRate_handy, req.body.drawRate_handy, req.body.awayRate_handy, req.body.homeRate_unover, req.body.awayRate_unover, req.params.game_id];
    db.query('UPDATE games SET sports = ?, league = ?, match_date = ?, home = ?, away = ?, home_rate = ?, draw_rate = ?, away_rate = ?, standard_handy = ?, standard_unover = ?, home_rate_handy = ?, draw_rate_handy = ?, away_rate_handy = ?, home_rate_unover = ?, away_rate_unover = ? WHERE game_id = ?', sql, function (err, result) {
        if (err) throw err;
        console.log("경기수정 완료");
        res.redirect('/admin');
    });
});

module.exports = router;