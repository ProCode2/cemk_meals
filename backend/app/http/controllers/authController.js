const authController = () => {
  return {
    // render home page
    login(req, res) {
      res.render("auth/login");
    },
    register(req, res) {
      res.render("auth/register");
    }
  }
}

module.exports = authController;
