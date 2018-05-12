var express = require('express');
var consign = require('consign');
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views'); // inclusão lá no app (a partir do app)

//middleware
app.use(express.static('./app/public')) // onde fica arquivos estáticos
app.use(bodyParser.urlencoded({extended: true})); // extended -> implementar através de json
app.use(expressValidator());
app.use(cookieParser());
app.use(expressSession({
	secret: 'iuashddiugfhhskadnf'
}));
app.use(function(req, resp, next){
    console.log(req.url, req.url != '/');
    console.log(req.session.user);
    if(req.url != '/' && req.url != '/login'){
        if(!req.session.user || req.session.user == undefined){
            resp.redirect('/');
            return;
        }
    }
    next();
});

console.log("CWD = ", process.cwd());
//app se torna o contexto de cada módulo
consign({cwd: process.cwd()})
    .include("app/routes")
    .then("config/dbConnection.js") 
    .then("app/models")
    .then("app/controllers")
    .then("app/utils")
    .into(app); //jogo esses módulos dentro do app


module.exports = app;