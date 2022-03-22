"use strict";

const express = require('express');
const app = express();

const bodyParser = require('body-parser');                                                                     
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// 라우팅
const home = require("./routes");                                       // 로그인&회원가입
const game = require("./routes/game");                                  // 경기목록
const schedule = require("./routes/schedule");                          // 경기일정
const betting = require("./routes/betting");                            // 베팅 페이지
const betting_pay = require("./routes/betting/paying");                 // 베팅결제 페이지
const betting_game_insert = require("./routes/betting/create");         // 베팅등록 (POST)
const profile = require("./routes/profile");                            // 프로필 페이지
const profile_menu_bet = require("./routes/profile/bet");               // 사용자 베팅조회 페이지 (메뉴)
const profile_bet_detail = require("./routes/profile/bet_detail");      // 사용자 베팅상세조회 페이지
const profile_menu_charge = require("./routes/profile/charge");         // 사용자 충전조회 페이지 (메뉴)
const profile_menu_point = require("./routes/profile/point");           // 사용자 포인트조회 페이지 (메뉴)
const charge = require("./routes/charge");                              // 충전페이지
const charge_apply = require("./routes/charge/apply");                  // 충전신청 (POST)
const admin_main = require("./routes/admin");                           // 관리자 메인페이지
const admin_menu_game = require("./routes/admin/menu/game");            // 경기관리 페이지 (메뉴)
const admin_menu_insert = require("./routes/admin/menu/insert");        // 경기등록 페이지 (메뉴)
const admin_game_insert = require("./routes/admin/menu/insert/create"); // 경기등록 (POST)
const admin_game_update = require("./routes/admin/menu/game/update");   // 경기수정 페이지 & 경기수정 (POST)
const admin_game_invalid = require("./routes/admin/menu/game/invalid"); // 경기무효 (GET)
const admin_game_delete = require("./routes/admin/menu/game/delete");   // 경기삭제 (GET)
const admin_game_score = require("./routes/admin/menu/game/score");     // 경기점수등록 (POST)
const admin_game_result = require("./routes/admin/menu/game/result");   // 경기결과처리 (POST)
const admin_menu_bet = require("./routes/admin/menu/bet");              // 베팅관리 페이지 (메뉴)
const admin_bet_refund = require("./routes/admin/menu/bet/refund");     // 베팅환급 (POST)
const admin_menu_charge = require("./routes/admin/menu/charge");        // 충전관리 페이지 (메뉴)
const admin_charge_check = require("./routes/admin/menu/charge/check"); // 충전확인 (POST)
const admin_menu_point = require("./routes/admin/menu/point");          // 포인트관리 페이지 (메뉴)
const admin_menu_user = require("./routes/admin/menu/user");            // 유저관리 페이지 (메뉴)

// views와 ejs
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));

// 미들웨어 등록
app.use("/", home);

// 경기목록 미들웨어 등록
app.use("/game", game);

// 베팅페이지 미들웨어 등록
app.use("/betting", betting);
// 베팅결제 페이지 미들웨어 등록
app.use("/paying", betting_pay);
// 베팅등록 (POST) 미들웨어 등록
app.use("/", betting_game_insert);

// 경기일정 미들웨어 등록
app.use("/schedule", schedule);

// 프로필 페이지 미들웨어 등록
app.use("/profile", profile);
// 사용자 베팅조회 페이지 (메뉴) 미들웨어 등록
app.use("/profile", profile_menu_bet);
// 사용자 베팅상세조회 페이지 미들웨어 등록
app.use("/profile", profile_bet_detail);
// 사용자 충전조회 페이지 (메뉴) 미들웨어 등록
app.use("/profile", profile_menu_charge);
// 사용자 포인트조회 페이지 (메뉴) 미들웨어 등록
app.use("/profile", profile_menu_point);

// 충전 페이지 미들웨어 등록
app.use("/charge", charge);
// 충전 페이지 미들웨어 등록
app.use("/charge", charge_apply);

// 관리자 페이지 미들웨어 등록
app.use("/admin", admin_main);

// 경기등록 페이지 미들웨어 등록
app.use("/admin", admin_menu_insert);
// 경기등록 (POST) 미들웨어 등록
app.use("/", admin_game_insert);

// 경기관리 페이지 미들웨어 등록
app.use("/admin", admin_menu_game);
// 경기수정 페이지 & 경기수정 (POST) 미들웨어 등록
app.use("/", admin_game_update);
// 경기무효 (GET) 미들웨어 등록
app.use("/", admin_game_invalid);
// 경기삭제 (GET) 미들웨어 등록
app.use("/", admin_game_delete);
// 경기점수등록 (POST) 미들웨어 등록
app.use("/", admin_game_score);
// 경기결과처리 (POST) 미들웨어 등록
app.use("/", admin_game_result);

// 베팅관리 페이지 미들웨어 등록
app.use("/admin", admin_menu_bet);
// 베팅관리 페이지 미들웨어 등록
app.use("/", admin_bet_refund);

// 충전관리 페이지 미들웨어 등록
app.use("/admin", admin_menu_charge);
// 충전확인 (POST) 미들웨어 등록
app.use("/", admin_charge_check);

// 충전관리 페이지 미들웨어 등록
app.use("/admin", admin_menu_point);

// 유저관리 페이지 미들웨어 등록
app.use("/admin", admin_menu_user);



module.exports = app;
