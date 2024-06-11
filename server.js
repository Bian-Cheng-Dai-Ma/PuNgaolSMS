var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var logger = require('morgan');
const app = express();

var indexRouter = require('./routes/index')
var homeRouter = require('./routes/home')
var jobRouter = require('./routes/job')
var confirmRouter = require('./routes/confirm')
var weatherRouter = require('./routes/weather')
var villagerRouter = require('./routes/villager')


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.get('/', (req, res) => {
    res.render("index")
})


//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexRouter)
app.use('/home', homeRouter)
app.use('/job', jobRouter)
app.use('/confirm', confirmRouter)
app.use('/weather', weatherRouter)
app.use('/villager', villagerRouter)

app.use(function(req, res, next) {
    next(createError(404));
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

app.post('/weather', async (req, res) => {
  try{
    const sendSMS = require('../utils/sendSMS');
    let message = req.body.message;
    sendSMS('Phone number', message);
  } catch (error) {
    console.error("error submiting message")
  }
})

//connect to MongoDB
mongoose.connect();

app.listen(3000);

module.exports = app;


// cron job to run program daily
const cron = require('node-cron');
const matchAndNotify = require('./utils/matching');

cron.schedule('0 0 * * *', () => {
  console.log('Running daily job matching');
  matchAndNotify();
  // weatherAlert
});