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

router.get('/', function(req, res){
    if(req.session.user){
        db.query('SELECT * FROM users WHERE id=?', [req.session.user.id], function(err,result){
            if (err) throw err;
            res.render("profile/menu/profile", {'result' : result});
        });
    } else {
        res.redirect("/login");
    }
});

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

router.get('/bet/:bet_id', function(req, res){
    if(req.session.user){
        db.query('SELECT * FROM bets WHERE user_id = ? AND bet_id = ?', [req.session.user.code, req.params.bet_id], function(err,result){
            if (err) throw err;
            const total_num = result[0].total_num;
            var query = "";
            for(var i = 0; i < total_num; i++){
                const id = 't1.game' + (i+1);
                query += "SELECT t2.league_name, t2.match_date, t2.home_name, t2.away_name FROM (SELECT * FROM bets WHERE user_id = " + req.session.user.code + " AND bet_id =  " + req.params.bet_id + " ) AS t1 LEFT JOIN (SELECT game_id, league_name, match_date, home_name, away_name FROM (SELECT game_id, league, match_date, home_name, team_name AS away_name FROM (SELECT game_id, league, match_date, team_name AS home_name, away FROM games LEFT JOIN teams ON games.home = teams.team) AS t1 LEFT JOIN teams AS t2 ON t1.away = t2.team) AS t1 LEFT JOIN leagues AS t2 ON t1.league = t2.league) AS t2 ON t2.game_id = " + id + ';'
            }
            db.query(query, function (err, result2) {
                if (err) throw err;
                res.render("profile/crud/profile_bet_detail", {'result' : result, 'result2' : result2});
            });
        });
    } else {
        res.redirect("/login");
    }
});

router.get('/charge', function(req, res){
    if(req.session.user){
        db.query('SELECT * FROM charges WHERE user_id = ? ORDER BY apply_date DESC', [req.session.user.code], function(err,result){
            if (err) throw err;
            res.render("profile/menu/profile_charge", {'result' : result});
        });
    } else {
        res.redirect("/login");
    }
});

router.get('/point', function(req, res){
    if(req.session.user){
        db.query('SELECT * FROM points WHERE user_id = ? ORDER BY record_date DESC', [req.session.user.code], function(err,result){
            if (err) throw err;
            res.render("profile/menu/profile_point", {'result' : result});
        });
    } else {
        res.redirect("/login");
    }
});

module.exports = router;