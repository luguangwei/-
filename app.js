var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials=require('express-partials');
var mongoose=require('mongoose');

var routes = require('./routes/index');
var admin = require('./routes/admin');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/baoming');
// mongoose.connection.on("error", function (error) {  console.log("数据库连接失败：" + error); }); 
// mongoose.connection.on("open", function () {  console.log("———数据库连接成功！———"); });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname)));
app.use(express.static('bower_components'));
app.use(express.static('public'));

app.use(partials());
app.use('/', routes);
app.use('/admin', admin);


app.listen(3000);

module.exports = app;
