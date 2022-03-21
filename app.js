"use strict";

const express = require('express');
const app = express();


const bodyParser = require('body-parser');                                                                     
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// 라우팅
const home = require("./routes");

// views와 ejs
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));

// 미들웨어 등록
app.use("/", home);

module.exports = app;
