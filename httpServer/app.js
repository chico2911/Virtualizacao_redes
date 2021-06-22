var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var url = 'http://localhost:4000/'
var authenticationUrl = 'http://auth:5000/'
var authentication = 'http://localhost:5000'
var indexRouter = require('./routes/index');
var jwt = require('jsonwebtoken')
var axios = require('axios');

var app = express();
app.use(cookieParser())


app.use(function (req, res, next) {
  if (req.cookies.token == null) {
      switch (req.url) {
          case "/users/signup": 
              res.redirect(authentication+'/signup');
              break;
          case "/users/login":
              res.cookie('url',url);
              res.redirect(authentication+'/login')
              break;
          case "/favicon.ico": next();
              break;
          default: 
              res.cookie('url',url+req.url);
              res.redirect(authentication+'/login')
              break;
      }
  } else { // authentication
      axios.post(authenticationUrl+'verifyToken',{token:req.cookies.token})
        .then(response=>{
            if(response.status == 200){
                req.user={level:response.data.level}
                next()
            }
            else{ res.redirect(authentication +'/login')}
      })
  }
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
  res.redirect('http://localhost:4000/')
  res.render('error'); 
});

module.exports = app;
