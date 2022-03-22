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

router.get('/admin_game_delete/:game_id', function(req, res){
    db.query('DELETE FROM games WHERE game_id = ?', req.params.game_id, function (err, result) {
        if (err) throw err;
        console.log(req.params.game_id + "번 경기삭제 완료");
        res.redirect('/admin');
    });
});

module.exports = router;