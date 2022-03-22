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

router.get('/admin_game_invalid/:game_id', function(req, res){
    var query = "";
    for (var i = 0; i < 10; i++) {
        var column = 'game' + (i+1);
        query += 'UPDATE bets SET ' + column + ' = ' + null + ' WHERE ' + column + ' = ' + req.params.game_id + ';'
    }
    db.query(query, function(err, result) {
        if (err) throw err;
        var query2 = "";
        for (var j = 0; j < 10; j++) {
            var column2 = 'game' + (j+1);
            query2 += 'SELECT bet_id FROM bets WHERE ' + column2 + ' IS NULL;'
        }
        db.query(query2, function(err, result) {
            if (err) throw err;
            if (result != ""){
                var query3 = "";
                for (var k = 0; k < result.length; k++) {
                    var column3 = 'rate' + (k+1);
                    for (var l = 0; l < result[k].length; l++) {
                        query3 += 'UPDATE bets SET ' + column3 + ' = null WHERE bet_id = ' + result[k][l].bet_id + ';'
                    }
                }
                db.query(query3, function(err, result2) {
                    if (err) throw err;
                    db.query('SELECT bet_id, a1*a2*a3*a4*a5*a6*a7*a8*a9*a10 AS multi FROM (select bet_id, CASE WHEN rate1 is null THEN 1 ELSE rate1 END AS a1, CASE WHEN rate2 is null THEN 1 ELSE rate2 END AS a2, CASE WHEN rate3 is null THEN 1 ELSE rate3 END AS a3, CASE WHEN rate4 is null THEN 1 ELSE rate4 END AS a4, CASE WHEN rate5 is null THEN 1 ELSE rate5 END AS a5, CASE WHEN rate6 is null THEN 1 ELSE rate6 END AS a6, CASE WHEN rate7 is null THEN 1 ELSE rate7 END AS a7, CASE WHEN rate8 is null THEN 1 ELSE rate8 END AS a8, CASE WHEN rate9 is null THEN 1 ELSE rate9 END AS a9, CASE WHEN rate10 is null THEN 1 ELSE rate10 END AS a10 FROM bets) AS t1;', function(err, result3) {
                        if (err) throw err;
                        var query4 = "";
                        for(var i = 0; i < result3.length; i++) {
                            query4 += 'UPDATE bets SET total_rate = ' + result3[i].multi + ' WHERE bet_id = ' + result3[i].bet_id + ';' 
                        }
                        db.query(query4, function(err, result) {
                            if (err) throw err;
                            db.query('SELECT bet_id, CEIL(total_rate*money/100)*100 AS howmuch FROM bets;', function(err, result4){
                                if (err) throw err;
                                var query5 = "";
                                for(var i = 0; i < result4.length; i++) {
                                    query5 += 'UPDATE bets SET final_money = ' + result4[i].howmuch + ' WHERE bet_id = ' + result4[i].bet_id + ';' 
                                }
                                query5 += 'UPDATE games SET result = "무효" WHERE game_id = ' + req.params.game_id + ';'
                                db.query(query5, function(err, result) {
                                    if (err) throw err;
                                    console.log("경기 무효화 완료");
                                    res.redirect('/admin');
                                });
                            });
                        });
                    });
                });
            }
        });
    });
});

module.exports = router;