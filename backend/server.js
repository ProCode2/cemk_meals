const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// set assets folder
app.use(express.static("public"))
// set template engine
app.use(expressLayouts);
app.set('views', path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
})

app.get("/cart", (req, res) => {
  res.render("customers/cart");
})

app.get("/login", (req, res) => {
  res.render("auth/login");
})

app.get("/register", (req, res) => {
  res.render("auth/register");
})

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`)
})
