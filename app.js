"use strict";

const express = require('express');
const app = express();

const bodyParser = require('body-parser');                                                                     
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// 라우팅
const home = require("./routes");               // 로그인&회원가입
const game = require("./routes/game");          // 경기목록
const schedule = require("./routes/schedule");  // 경기일정
const charge = require("./routes/charge");      // 충전페이지
const profile = require("./routes/profile");    // 프로필

// views와 ejs
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));

// 미들웨어 등록
app.use("/", home);
// 경기목록 미들웨어 등록
app.use("/game", game);
// 경기일정 미들웨어 등록
app.use("/schedule", schedule);
// 충전페이지 미들웨어 등록
app.use("/charge", charge);
// 프로필페이지 미들웨어 등록
app.use("/profile", profile);

module.exports = app;
