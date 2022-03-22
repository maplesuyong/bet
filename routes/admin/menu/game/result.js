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

router.get('/admin_game_result/:game_id', function(req, res){
    var query = "";
    for (var i = 0; i < 10; i++) {
        var column = 'game' + (i+1);
        query += 'SELECT bet_id FROM bets WHERE ' + column + ' = ' + req.params.game_id + ';'
    }
    db.query(query, function (err, result) {
        if (err) throw err
        var query2 = "";
        for (var i = 0; i < result.length; i++){
            if(result[i] != "") {
                var column2 = 'type' + (i+1);
                var column3 = 'pick' + (i+1);
                for( var j = 0; j < result[i].length; j++) {
                    query2 += 'SELECT bet_id, ' + column2 + ', ' + column3 + ' FROM bets WHERE bet_id = ' + result[i][j].bet_id + ';'
                }
            }
        }
        db.query(query2, function(err, result2) {
            if (err) throw err
            var main = JSON.parse(JSON.stringify(result2));
            var query3 = "";
            for(var i = 0; i < main.length; i++) {
                if (Object.values(main[i][0])[1] == "오리지날") {
                    query3 += 'SELECT result FROM games WHERE game_id = ' + req.params.game_id + ';'
                } else if (Object.values(main[i][0])[1] == "핸디") {
                    query3 += 'SELECT result_handy FROM games WHERE game_id = ' + req.params.game_id + ';'
                } else {
                    query3 += 'SELECT result_unover FROM games WHERE game_id = ' + req.params.game_id + ';'
                }
            }
            db.query(query3, function(err, result3) {
                if (err) throw err
                var main2 = JSON.parse(JSON.stringify(result3));
                var query4 = "";
                var column4 = "";
                for (var i = 0; i < main2.length; i++) {
                    if (Object.keys(main[i][0])[1] == "type1") {
                        column4 = "result1";
                    } else if (Object.keys(main[i][0])[1] == "type2") {
                        column4 = "result2";
                    }  else if (Object.keys(main[i][0])[1] == "type3") {
                        column4 = "result3";
                    }  else if (Object.keys(main[i][0])[1] == "type4") {
                        column4 = "result4";
                    }  else if (Object.keys(main[i][0])[1] == "type5") {
                        column4 = "result5";
                    }  else if (Object.keys(main[i][0])[1] == "type6") {
                        column4 = "result6";
                    }  else if (Object.keys(main[i][0])[1] == "type7") {
                        column4 = "result7";
                    }  else if (Object.keys(main[i][0])[1] == "type8") {
                        column4 = "result8";
                    }  else if (Object.keys(main[i][0])[1] == "type9") {
                        column4 = "result9";
                    }  else {
                        column4 = "result10";
                    } 
                    if (Object.values(main2[i][0])[0] == Object.values(main[i][0])[2]) {
                        query4 += 'UPDATE bets SET ' + column4 + ' = TRUE WHERE bet_id = ' + Object.values(main[i][0])[0] + ';'
                    } else {
                        query4 += 'UPDATE bets SET ' + column4 + ' = FALSE WHERE bet_id = ' + Object.values(main[i][0])[0] + ';'
                    }
                }
                db.query(query4, function(err) {
                    if (err) throw err
                    var query5 = "";
                    for (var i = 0; i < main.length; i++) {
                        query5 += 'SELECT result1, result2, result3, result4, result5, result6, result7, result8, result9, result10 FROM bets WHERE bet_id = ' + Object.values(main[i][0])[0] + ';'
                    }
                    db.query(query5, function(err, result4) {
                        if (err) throw err
                        var main3 = JSON.parse(JSON.stringify(result4));
                        var query6 = "";
                        var array_num = [];
                        for (var i = 0; i < main3.length; i++) {
                            var num = 0;
                            for (var j = 0; j < 10; j++) {
                                if (Object.values(main3[i][0])[j] != null) {
                                    num++;
                                }
                            }
                            array_num.push(num);
                            query6 += 'SELECT game1, game2, game3, game4, game5, game6, game7, game8, game9, game10 FROM bets WHERE bet_id = ' + Object.values(main[i][0])[0] + ';'
                        }
                        db.query(query6, function(err, result5) {
                            if (err) throw err
                            var main4 = JSON.parse(JSON.stringify(result5));
                            var query7 = "";
                            var array_num2 = [];
                            for (var i = 0; i < main4.length; i++) {
                                var num2 = 0;
                                for (var j = 0; j < 10; j++) {
                                    if (Object.values(main4[i][0])[j] != null) {
                                        num2++;
                                    }
                                }
                                array_num2.push(num2);
                            }
                            for (var i = 0; i < main4.length; i++) {
                                if (array_num[i] == array_num2[i]) {
                                    query7 += 'SELECT bet_id, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10 FROM bets WHERE bet_id = ' + Object.values(main[i][0])[0] + ';'
                                }
                            }
                            db.query(query7, function(err, result6) {
                                if (err) throw err
                                var main5 = JSON.parse(JSON.stringify(result6));
                                var query8 = "";
                                for (var i = 0; i < main5.length; i++) {
                                    var state = 1;
                                    for (var j = 1; j < 11; j++) {
                                        if (Object.values(main5[i][0])[j] != null) {
                                            state *= Object.values(main5[i][0])[j];
                                        }
                                    }
                                    if (state) {
                                        state = "당첨";
                                    } else {
                                        state = "낙첨";
                                    }
                                    query8 += 'UPDATE bets SET state = "' + state + '" WHERE bet_id = ' + Object.values(main5[i][0])[0] + ';'
                                }
                                query8 += 'UPDATE games SET final_result = TRUE WHERE game_id = ' + req.params.game_id + ';'
                                db.query(query8, function(err){
                                    if (err) throw err
                                    console.log("베팅결과처리 완료!!");
                                    res.redirect('/admin');
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

module.exports = router;