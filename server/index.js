const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const {sequelize} = require('./models');
const passport = require('passport');
const passportConfig = require('./passport');
sequelize.sync({ force: false })
  .then(()=>{
    console.log('DB연결 성공')
  })
  .catch((err)=>{
    console.log("에러")
    console.error(err)
  })

const app = express();
passportConfig();

app.set('port',process.env.PORT || 8000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
  }
}))
app.use(passport.initialize());
app.use(passport.session());

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
  });