"use strict";

// app.js에 있어야 될 app.get()을 라우터화해서 routes 폴더의 index.js가 라우팅을 총괄

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

router.get('/', function (req, res) {
    if(req.session.user){
        console.log("로그인세션 " + req.session.user.id);
        db.connect(function(err) {
            db.query('SELECT money FROM users WHERE id=?', [req.session.user.id] ,function (err2, result2) {
                if(err2) throw err2;
                console.log("돈: " + result2[0].money);
                db.query('SELECT game_id, sports, t1.league, league_name, match_date, home, home_name, away, away_name, home_rate, draw_rate, away_rate FROM (SELECT game_id, sports, league, match_date, home, home_name, away, team_name AS away_name, home_rate, draw_rate, away_rate FROM (SELECT game_id, sports, league, match_date, home, team_name AS home_name, away, home_rate, draw_rate, away_rate FROM games LEFT JOIN teams ON games.home = teams.team) AS t1 LEFT JOIN teams AS t2 ON t1.away = t2.team) AS t1 LEFT JOIN leagues AS t2 ON t1.league = t2.league WHERE match_date > now()',
                    function(err, result) {
                    if(err) throw err;
                    res.render("index", {'session' : req.session.user.id, 'money' : result2[0].money, 'result' : result});
                });
                
            });
        });
    } else {
        res.redirect("/login");
    }
});

router.get('/login', function (req, res) { 
    res.render("login");
});

router.get('/register', function (req, res) { 
    res.render("register");
});

router.post('/login', function(req,res){
    console.log("입력된 아이디 : ", req.body.id);
    console.log("입력된 비밀번호 : ", req.body.pw);

    const id = req.body.id;
    const pw = req.body.pw;

    db.connect(function(err) {
        db.query('SELECT id, user_id FROM users WHERE id=?', [id] ,function (err, result) {
            if (err) throw err; 
            if (result.length){
                console.log(result[0].id);
                const id_pass = result[0].id;
                const user_code = result[0].user_id;
                db.query('SELECT pw FROM users WHERE id=?', [id_pass] ,function (err2, result2) {
                    if (err2) throw err2; 
                    if (pw == result2[0].pw) {
                        req.session.user = {
                            code: user_code,
                            id: id_pass,
                            authorized: true
                        };
                        console.log(req.session.user);
                        res.json({'result':'yes'});
                    } else {
                        res.json({'result':'no_2'});
                    }
                });
            } else {
                res.json({'result':'no_1'});
            }
        });
    });
});

router.get('/logout', function(req, res) {
    if(req.session.user){
        console.log("로그아웃됨");
        req.session.destroy(function(err) {
            if(err) throw err;
            res.redirect('/login');
        });
    } else {
        console.log('로그인 상태 아님');
        res.redirect('/login');
    }
});

router.post('/register', function(req,res){
    console.log("입력된 아이디 : ", req.body.id);
    console.log("입력된 비밀번호 : ", req.body.pw);

    const id = req.body.id;
    const sql = [req.body.id, req.body.pw];

    db.connect(function(err) {
        db.query('SELECT id FROM users WHERE id=?', [id] ,function (err, result) {
            if (err) throw err; 
            if (result.length){
                console.log("중복된 아이디가 있습니다");
                res.json({'success':'no'});
            } else {
                db.query('INSERT into users (id, pw) VALUES(?, ?)', sql, function (err, result) {
                    if (err) throw err;
                    console.log("회원가입 완료");
                    res.json({'success':'yes'});
                });
            }
            console.log(result);
        });
    });
});

/* 관리자페이지 메인 (1페이지) URL만 따로 /admin으로 접근 가능하도록 설정 */
router.get('/admin', function (req, res) { 
    const pagination = 10;
    db.connect(function(err) {
        db.query('SELECT game_id, sports, t1.league, league_name, match_date, home_name, away_name, home_score, away_score, result, result_handy, result_unover, final_result FROM (SELECT game_id, sports, league, match_date, home_name, team_name AS away_name, home_score, away_score, result, result_handy, result_unover, final_result FROM (SELECT game_id, sports, league, match_date, team_name AS home_name, away, home_score, away_score, result, result_handy, result_unover, final_result FROM games LEFT JOIN teams ON games.home = teams.team) AS t1 LEFT JOIN teams AS t2 ON t1.away = t2.team) AS t1 LEFT JOIN leagues AS t2 ON t1.league = t2.league ORDER BY match_date DESC LIMIT 0,?', pagination, function (err, result) {
            db.query('SELECT game_id FROM games', function (err2, result2) {
                if (err2) throw err2;
                if (err) throw err;
                res.render("admin/menu/admin_game", { 'result' : result, 'length' : result2.length, 'page' : 1 });
            });
        });
    });
});

router.get('/admin/game/:page', function (req, res) {
    const pagination = 10;
    const page = req.params.page;
    db.connect(function(err) {
        db.query('SELECT game_id FROM games', function (err, result2) {
            if (err) throw err;
            const total_page = result2.length / pagination;
            const remain = result2.length % pagination;
            if(page == total_page + 1){  // 끝 페이지
                const sql = [total_page*pagination, remain];
                db.query('SELECT game_id, sports, t1.league, league_name, match_date, home_name, away_name, home_score, away_score, result, result_handy, result_unover, final_result FROM (SELECT game_id, sports, league, match_date, home_name, team_name AS away_name, home_score, away_score, result, result_handy, result_unover, final_result FROM (SELECT game_id, sports, league, match_date, team_name AS home_name, away, home_score, away_score, result, result_handy, result_unover, final_result FROM games LEFT JOIN teams ON games.home = teams.team) AS t1 LEFT JOIN teams AS t2 ON t1.away = t2.team) AS t1 LEFT JOIN leagues AS t2 ON t1.league = t2.league ORDER BY match_date DESC LIMIT ?,?', sql, function (err, result) {
                    if (err) throw err;
                    res.render("admin/menu/admin_game", { 'result' : result, 'length' : result2.length, 'page' : page });
                });
            } else if(page < total_page + 1) {
                const sql = [(page-1)*pagination, pagination];
                db.query('SELECT game_id, sports, t1.league, league_name, match_date, home_name, away_name, home_score, away_score, result, result_handy, result_unover, final_result FROM (SELECT game_id, sports, league, match_date, home_name, team_name AS away_name, home_score, away_score, result, result_handy, result_unover, final_result FROM (SELECT game_id, sports, league, match_date, team_name AS home_name, away, home_score, away_score, result, result_handy, result_unover, final_result FROM games LEFT JOIN teams ON games.home = teams.team) AS t1 LEFT JOIN teams AS t2 ON t1.away = t2.team) AS t1 LEFT JOIN leagues AS t2 ON t1.league = t2.league ORDER BY match_date DESC LIMIT ?,?', sql, function (err, result) {
                    if (err) throw err;
                    res.render("admin/menu/admin_game", { 'result' : result, 'length' : result2.length, 'page' : page });
                });
            } else {
                console.log("페이지 이동 오류");
                res.redirect('/admin');
            }
        });
    });
});

router.get('/admin/insert', function(req, res){
    res.render('admin/menu/admin_game_insert');
})

router.post('/admin_game_insert', function(req, res){
    const sql = [req.body.sports, req.body.myList, req.body.date, req.body.mySelect1, req.body.mySelect2,
                req.body.homeRate, req.body.drawRate, req.body.awayRate, req.body.myStandard_handy, req.body.myStandard_unover,
                req.body.homeRate_handy, req.body.drawRate_handy, req.body.awayRate_handy, req.body.homeRate_unover, req.body.awayRate_unover, null, null];

    db.connect(function(err) {
        db.query('INSERT INTO games (sports, league, match_date, home, away, home_rate, draw_rate, away_rate, standard_handy, standard_unover, home_rate_handy, draw_rate_handy, away_rate_handy, home_rate_unover, away_rate_unover, home_score, away_score) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', sql, function (err, result) {
            if (err) throw err;
            console.log("경기삽입 완료");
            res.redirect('/admin');
        });
    });    
});

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
    db.connect(function(err) {
        db.query('UPDATE games SET sports = ?, league = ?, match_date = ?, home = ?, away = ?, home_rate = ?, draw_rate = ?, away_rate = ?, standard_handy = ?, standard_unover = ?, home_rate_handy = ?, draw_rate_handy = ?, away_rate_handy = ?, home_rate_unover = ?, away_rate_unover = ? WHERE game_id = ?', sql, function (err, result) {
            if (err) throw err;
            console.log("경기수정 완료");
            res.redirect('/admin');
        });
    });
});

router.get('/admin_game_invalid/:game_id', function(req, res){
    db.connect(function(err) {
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
});

router.get('/admin_game_delete/:game_id', function(req, res){
    db.connect(function(err) {
        db.query('DELETE FROM games WHERE game_id = ?', req.params.game_id, function (err, result) {
            if (err) throw err;
            console.log(req.params.game_id + "번 경기삭제 완료");
            res.redirect('/admin');
        });
    });
});

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
    console.log("홈팀점수: " + home);
    console.log("원정팀점수: " + away);
    console.log("결과비교값: " + (home>away));
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
        db.connect(function(err) {
            db.query('UPDATE games SET home_score = ?, away_score = ?, result = ?, result_handy = ?, result_unover = ? WHERE game_id = ?', sql, function (err, result) {
                if (err) throw err;
                console.log("점수등록 완료");
                res.redirect('/admin');
            });
        });
    });
});

router.get('/admin_game_result/:game_id', function(req, res){
    db.connect(function(err) {
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
});

router.get('/admin/bet', function (req, res) { 
    db.connect(function(err) {
        db.query('SELECT bet_id, t1.user_id, bet_date, t2.id, final_money, t1.money, t2.money AS user_money, state FROM bets AS t1 LEFT JOIN users AS t2 ON t1.user_id = t2.user_id ORDER BY bet_date DESC', function (err, result) {
            if (err) throw err;
            res.render('admin/menu/admin_bet', {'result' : result});
        });
    });
});

router.post('/admin_bet_refund/:bet_id', function (req, res) { 
    var datetime = new Date();
    var query = '';
    query += 'UPDATE bets SET state = "환급완료" WHERE bet_id = ' + req.params.bet_id + ';'
    db.connect(function(err) {
        db.query('SELECT user_id FROM bets WHERE bet_id = ' + req.params.bet_id, function (err, result) {
            if (err) throw err;
            query += 'UPDATE users SET money = money + ' + req.body.final_money + ' WHERE user_id = ' + result[0].user_id + ';'
            query += 'INSERT INTO points (user_id, points, before_point, after_point, variation, record_date, contents) VALUES (' + result[0].user_id + ', ' + req.body.final_money + ', ' + req.body.before_money + ', ' + (parseInt(req.body.before_money) + parseInt(req.body.final_money)) + ', "증가", ' + datetime + ', "당첨환급");'
            db.query(query, function (err) {
                if (err) throw err;
                console.log("환급완료!");
                res.redirect('/admin/bet');
            });
        });
    });
});

router.get('/admin/charge', function (req, res) { 
    db.connect(function(err) {
        db.query('SELECT charge_id, t1.user_id, id, t1.money, charge_point, apply_date, charge_date, state FROM charges AS t1 LEFT JOIN users AS t2 ON t1.user_id = t2.user_id', function (err, result) {
            if (err) throw err;
            res.render('admin/menu/admin_charge', {'result' : result});
        });
    });
});

router.post('/admin_charge_check/:charge_id', function (req, res) { 
    db.connect(function(err) {
        var query = "";
        query = 'UPDATE charges SET charge_date = now(), state = ' + true + ' WHERE charge_id = ' + req.params.charge_id + ';'
        query += 'UPDATE users SET money = money + ' + req.body.point + ' WHERE user_id = ' + req.body.user_id + ';'
        db.query(query, function (err, result2) {
            if (err) throw err;
            console.log("충전완료");
            res.redirect('/admin_charge');
        });
    });
});

router.get('/admin/point', function (req, res) { 
    db.connect(function(err) {
        db.query('SELECT t1.user_id, id, points, before_point, after_point, variation, record_date, contents FROM points AS t1 LEFT JOIN users AS t2 ON t1.user_id = t2.user_id', function (err, result) {
            if (err) throw err;
            res.render('admin/menu/admin_point', {'result' : result});
        });
    });
});

router.get('/admin/user', function (req, res) { 
    db.connect(function(err) {
        db.query('SELECT user_id, id, in_date, money FROM users', function (err, result) {
            if (err) throw err;
            res.render('admin/menu/admin_user', {'result' : result});
        });
    });
});

router.get('/betting', function(req, res){
    if(req.session.user){
        db.connect(function(err) {
            db.query('SELECT money FROM users WHERE id=?', [req.session.user.id] ,function (err2, result2) {
                if(err2) throw err2;
                db.query('SELECT game_id, sports, t1.league, league_name, match_date, home, home_name, away, away_name, home_rate, draw_rate, away_rate, standard_handy, standard_unover, home_rate_handy, draw_rate_handy, away_rate_handy, home_rate_unover, away_rate_unover FROM (SELECT game_id, sports, league, match_date, home, home_name, away, team_name AS away_name, home_rate, draw_rate, away_rate, standard_handy, standard_unover, home_rate_handy, draw_rate_handy, away_rate_handy, home_rate_unover, away_rate_unover FROM (SELECT game_id, sports, league, match_date, home, team_name AS home_name, away, home_rate, draw_rate, away_rate, standard_handy, standard_unover, home_rate_handy, draw_rate_handy, away_rate_handy, home_rate_unover, away_rate_unover FROM games LEFT JOIN teams ON games.home = teams.team) AS t1 LEFT JOIN teams AS t2 ON t1.away = t2.team) AS t1 LEFT JOIN leagues AS t2 ON t1.league = t2.league WHERE match_date > now()',
                    function(err, result) {
                    if(err) throw err;
                    res.render("betting", {'session' : req.session.user.id, 'money' : result2[0].money, 'result' : result});
                });
                
            });
        });
    } else {
        res.redirect("/login");
    }
});

router.post('/paying', function(req, res){
    if(req.session.user){
        const result = req.body;
        res.render("paying", {'result' : result});
    } else {
        res.redirect("/login");
    }
});

router.post('/betting_game_insert', function(req, res){
    var datetime = new Date();
    const sql = [req.session.user.code, req.body.total_num, req.body.total_rate, req.body.money, req.body.final_money, datetime, '경기대기',
    req.body.id[0], req.body.id[1], req.body.id[2], req.body.id[3], req.body.id[4], req.body.id[5], req.body.id[6], req.body.id[7], req.body.id[8], req.body.id[9],
    req.body.type[0], req.body.type[1], req.body.type[2], req.body.type[3], req.body.type[4], req.body.type[5], req.body.type[6], req.body.type[7], req.body.type[8], req.body.type[9],
    req.body.rate[0], req.body.rate[1], req.body.rate[2], req.body.rate[3], req.body.rate[4], req.body.rate[5], req.body.rate[6], req.body.rate[7], req.body.rate[8], req.body.rate[9],
    req.body.pick[0], req.body.pick[1], req.body.pick[2], req.body.pick[3], req.body.pick[4], req.body.pick[5], req.body.pick[6], req.body.pick[7], req.body.pick[8], req.body.pick[9]];
    db.connect(function(err) {
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
});

module.exports = router;