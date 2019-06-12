var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/mydb' );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});

const formController = require('./controllers/formController')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/', function(req, res, next) {
  res.render('index',{title:"Game List"});
});

app.get('/forum', function(req, res, next) {
  res.render('forum',{title:"Forum"});
});

app.get('/game1', function(req, res, next) {
  res.render('game1',{title:"Game 1"});
});

app.get('/game2', function(req, res, next) {
  res.render('game2',{title:"Game 2"});
});

app.get('/game3', function(req, res, next) {
  res.render('game3',{title:"Game 3"});
});

function processFormData(req,res,next) {
  res.render('formdata',
    {title:"Form Data", name:req.body.name, coms:req.body.comments})
};

app.post('/processform', formController.saveForm);

app.get('/forum', formController.getAllForm);

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
