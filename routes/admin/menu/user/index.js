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

router.get('/user', function (req, res) { 
    db.query('SELECT user_id, id, in_date, money FROM users', function (err, result) {
        if (err) throw err;
        res.render('admin/menu/admin_user', {'result' : result});
    });
});

module.exports = router;