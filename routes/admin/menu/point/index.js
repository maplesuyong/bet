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

router.get('/point', function (req, res) { 
    db.query('SELECT t1.user_id, id, points, before_point, after_point, variation, record_date, contents FROM points AS t1 LEFT JOIN users AS t2 ON t1.user_id = t2.user_id', function (err, result) {
        if (err) throw err;
        res.render('admin/menu/admin_point', {'result' : result});
    });
});

module.exports = router;