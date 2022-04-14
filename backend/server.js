const express = require("express");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("home");
})

// set assets folder
app.use(express.static("public"))
// set template engine
app.use(expressLayouts);
app.set('views', path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`)
})
