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

/* 관리자페이지 경기목록 */
router.get('/game/:page', function (req, res) {
    const pagination = 10;
    const page = req.params.page;
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

module.exports = router;