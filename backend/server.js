const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const session = require("express-session");
const pgSession = require('connect-pg-simple')(session)
const sessionPool = require('pg').Pool
const flash = require("express-flash");
const { initRoutes } = require("./routes/web");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(flash())
// session config
const sessionDBaccess = new sessionPool({
  user: "postgres",
  password: "hhhhhh123",
  host: "localhost",
  port: "5432",
  database: "cemk_meals"
})
const sessionConfig = {
  store: new pgSession({
    pool: sessionDBaccess,
    tableName: 'session'
  }),
  name: 'SID',
  secret: "thisisverysecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 15,
    aameSite: true,
    secure: false // ENABLE ONLY ON HTTPS
  }
}
app.use(session(sessionConfig))

// Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
})
// set assets folder
app.use(express.static("public"));
app.use(express.json())
// set template engine
app.use(expressLayouts);
app.set('views', path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
initRoutes(app);


app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`)
})
