const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const session = require("express-session");
const pgSession = require('connect-pg-simple')(session)
const sessionPool = require('pg').Pool;
const flash = require("express-flash");
const { initRoutes } = require("./routes/web");
require('dotenv').config();
const passport = require("passport");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(flash())
// session config
const sessionDBaccess = new sessionPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
})
const sessionConfig = {
  store: new pgSession({
    pool: sessionDBaccess,
    tableName: 'session'
  }),
  name: 'SID',
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    aameSite: true,
    secure: false // ENABLE ONLY ON HTTPS
  }
}
app.use(session(sessionConfig))
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
})
// set assets folder
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// set template engine
app.use(expressLayouts);
app.set('views', path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
initRoutes(app);


app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`)
})
