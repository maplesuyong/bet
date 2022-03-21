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

router.get('/:game_id', function(req, res) {
    if (req.session.user) {
        var id = req.params.game_id;
        db.query("SELECT game_id, sports, t1.league, league_name, match_date, home, home_name, away, away_name, home_rate, draw_rate, away_rate, standard_handy, standard_unover, home_rate_handy, draw_rate_handy, away_rate_handy, home_rate_unover, away_rate_unover, home_score, away_score, result, result_handy, result_unover FROM (SELECT game_id, sports, league, match_date, home, home_name, away, team_name AS away_name, home_rate, draw_rate, away_rate, standard_handy, standard_unover, home_rate_handy, draw_rate_handy, away_rate_handy, home_rate_unover, away_rate_unover, home_score, away_score, result, result_handy, result_unover FROM (SELECT game_id, sports, league, match_date, home, team_name AS home_name, away, home_rate, draw_rate, away_rate, standard_handy, standard_unover, home_rate_handy, draw_rate_handy, away_rate_handy, home_rate_unover, away_rate_unover, home_score, away_score, result, result_handy, result_unover FROM games LEFT JOIN teams ON games.home = teams.team) AS t1 LEFT JOIN teams AS t2 ON t1.away = t2.team) AS t1 LEFT JOIN leagues AS t2 ON t1.league = t2.league WHERE game_id = " + id, function(err, result){
            if (err) throw err;
            res.render("game", {'result' : result});
        });
    } else {
        res.redirect("/login");
    }
});

module.exports = router;