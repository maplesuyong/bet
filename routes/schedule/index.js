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

router.get('/', function(req, res) {
    if(req.session.user){
        var today = new Date();
        var yesterday = new Date(today.setDate(today.getDate() - 1));
        var tomorrow = new Date(today.setDate(today.getDate() + 2));
        today.setDate(today.getDate() - 1);
        console.log(Date(today));
        var yesterday_date = yesterday.getDate();
        var tomorrow_date = tomorrow.getDate();
        db.query("SELECT game_id, sports, t1.league, league_name, match_date, home, home_name, away, away_name, home_rate, away_rate FROM (SELECT game_id, sports, league, match_date, home, home_name, away, team_name AS away_name, home_rate, away_rate FROM (SELECT game_id, sports, league, match_date, home, team_name AS home_name, away, home_rate, away_rate FROM games LEFT JOIN teams ON games.home = teams.team) AS t1 LEFT JOIN teams AS t2 ON t1.away = t2.team) AS t1 LEFT JOIN leagues AS t2 ON t1.league = t2.league WHERE DATE_FORMAT(match_date,'%Y-%m-%d') = DATE_FORMAT('" + new Date(+new Date() + 3240 * 10000).toISOString().replace('T', ' ').replace(/\..*/, '') + "','%Y-%m-%d') ORDER BY match_date DESC;", function(err,result){
            if (err) throw err;
            res.render("schedule", {'result' : result, 'yesterday' : yesterday, 'tomorrow' : tomorrow, 'today' : Date(today), 'yesterday_date' : yesterday_date, 'tomorrow_date' : tomorrow_date});
        });
    } else {
        res.redirect("/login");
    }
});

router.post('/', function(req, res) {
    if(req.session.user){
        var sql = "";
        if (req.body.sports) {
            var sports = req.body.sports;
        }
        if (req.body.leagues) {
            var leagues = req.body.leagues;
        }
        
        if(sports && sports == "전체" && !leagues) {
            sql = '';
        } else if (sports && sports != "전체" && leagues && leagues == "전체") {
            sql = 'AND sports = "' + sports + '"';
        } else if (sports && leagues) {
            sql = 'AND sports = "' + sports + '" AND league_name = "' + leagues + '"';
        } else {
            sql = '';
        }

        if (req.body.choice) {
            var choice = req.body.choice;
            var today = new Date(choice);
        } else {
            var today = new Date();
        }

        var yesterday = new Date(today.setDate(today.getDate() - 1));
        var tomorrow = new Date(today.setDate(today.getDate() + 2));
        today.setDate(today.getDate() - 1);
        var yesterday_date = yesterday.getDate();
        var tomorrow_date = tomorrow.getDate();
        db.query("SELECT game_id, sports, t1.league, league_name, match_date, home, home_name, away, away_name, home_rate, away_rate FROM (SELECT game_id, sports, league, match_date, home, home_name, away, team_name AS away_name, home_rate, away_rate FROM (SELECT game_id, sports, league, match_date, home, team_name AS home_name, away, home_rate, away_rate FROM games LEFT JOIN teams ON games.home = teams.team) AS t1 LEFT JOIN teams AS t2 ON t1.away = t2.team) AS t1 LEFT JOIN leagues AS t2 ON t1.league = t2.league WHERE DATE_FORMAT(match_date,'%Y-%m-%d') = DATE_FORMAT('" + new Date(+today + 3240 * 10000).toISOString().replace('T', ' ').replace(/\..*/, '') + "','%Y-%m-%d') " + sql + " ORDER BY match_date DESC", function(err, result) {
            if (err) throw err;
            res.render("schedule", {'result' : result, 'yesterday' : yesterday, 'tomorrow' : tomorrow, 'today' : today, 'yesterday_date' : yesterday_date, 'tomorrow_date' : tomorrow_date});
        });
    } else {
        res.redirect("/login");
    }
});

module.exports = router;