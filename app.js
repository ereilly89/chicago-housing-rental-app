var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var listingsRouter = require('./routes/listings');
var hostRouter = require('./routes/host');
var tenantRouter = require('./routes/tenant');
var aboutRouter = require('./routes/about');
const authRoutes = require('./routes/authRoutes');

const { requireAuth, checkUser } = require('./middleware/authMiddleware');

global.config = require('./config');

const MONGOURL = "mongodb+srv://reillyem11:12345@cluster0.nmzpa.gcp.mongodb.net/RentalDB?retryWrites=true&w=majority";

var app = express();

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());


mongoose.connect(MONGOURL)
.then(( )=> console.log("DB connected"))
.catch(error => console.log(error));

app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));


app.use('*', checkUser);

app.use('/', indexRouter);
app.use('/listings', listingsRouter);
app.use('/host', hostRouter);
app.use('/tenant', tenantRouter);
app.use('/about', aboutRouter);
app.use(authRoutes);

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
