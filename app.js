var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var tests = require('./routes/tests');
var vues = require('./routes/vues');
var apis = require('./routes/apis');
var orms = require('./routes/orms');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use('/', routes);
app.use('/users', users);
app.use('/tests', tests);
app.use('/vue', vues);
app.use('/api',apis);
app.use('/orm',orms);

app.use(function(req,res,next){
  res.set("Access-Control-Allow-Origin","http://localhost:3000");
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//socket server

var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(8000);


io.on('connection', function (socket) {
  console.log('hi');
  socket.on('send-msg', function (data) {
    io.sockets.emit('news', { 'content' : data.content , 'username' : data.username ,'person1' : data.person1});
  });
  socket.on('typing', function (data) {
    socket.broadcast.emit('usertyping');
  });
  socket.on('endtyping', function (data) {
    socket.broadcast.emit('userendtyping');
  });
});


module.exports = app;
