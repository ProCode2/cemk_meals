const homeController = require("../app/http/controllers/homeController")
const authController = require("../app/http/controllers/authController")
const cartController = require("../app/http/controllers/customers/cartController")

// middlewares
// stop logged in users from accessing login, register routes
const guest = require("../app/http/middlewares/guest");

const initRoutes = (app) => {

  app.get("/", homeController().index);
  app.get("/login", guest, authController().login);
  app.post("/login", authController().postLogin);
  app.get("/register", guest, authController().register);
  app.post("/register", authController().postRegister);
  app.post("/logout", authController().logout);

  app.get("/cart", cartController().index);
  app.post("/cart/update", cartController().update);
}

module.exports = {
  initRoutes
}
