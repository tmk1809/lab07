var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//4A. tạo router cho từng model
var mobileRouter = require ('./routes/mobile');
var laptopRouter = require ('./routes/laptop');
var studentRouter = require ('./routes/student');

var app = express();

//5. cấu hình dateFormat để format ngày tháng
var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat')); 


//1. cấu hình body-parser (lấy input data từ form)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));

//2. cấu hình mongoose (làm việc và tương tác với DB)thrthfhfgfgh
var mongoose = require('mongoose');
//note: cần khai báo db name trong uri. vd: "gch1103"
var db = "mongodb+srv://longndt:wxpY5GLB4We8hTDQ@cluster0.cc35aqx.mongodb.net/gch1103";
mongoose.connect(db)
.then(() => console.log('ok'))
.catch((error) => console.log('failed'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//4B. set url cho từng router
app.use('/mobile', mobileRouter);
app.use('/laptop', laptopRouter);
app.use('/student', studentRouter);

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

//3. cấu hình port cho web server để deploy lên Render
var port = process.env.PORT || 3001;
app.listen(port);

module.exports = app;
