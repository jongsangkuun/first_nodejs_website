var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var ejs = require('ejs');
var IndexRouter = require('./routes/index');
var LoginRouter = require('./routes/sign')
var bodyParser = require("body-parser");
var BoardRouter = require('./routes/board');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.use('/',IndexRouter);
app.use('/sign',LoginRouter);
app.use('/board',BoardRouter);





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/static',express.static(path.join(__dirname,'./public')));

var port = 3000;
http.createServer(app).listen(port,function(){
    console.log('3000번 포트 실행중');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
module.exports = app;


/*


Create table boardtb(
Num int not null auto_increment primary key,
Title varchar(20) not null,
Name varchar(20) not null,
Contents varchar(1000) not null,
Regdate datetime not null,
Passwd varchar(100) not null,
Hit int not null default 0);


Num name id password

Create table membertb(
Num int not null auto_increment primary key,
Name varchar(30) not null,
Id varchar(30) not null,
Password varchar(100) not null);




*/