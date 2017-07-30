const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const port = process.env.PORT || 3001;

const mongoDB = process.env.MONGOLAB_URI || config.mongoUrl;
mongoose.connect(mongoDB, {useMongoClient: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const authRouter = require('./routes/auth');
const pollsRouter = require('./routes/polls');

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/auth', authRouter);
app.use('/polls', pollsRouter);

app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
