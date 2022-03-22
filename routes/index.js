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

module.exports = router;