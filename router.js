const AuthenticationController = require("./controllers/authentication"),
  ApiController = require("./controllers/api"),
  express = require("express"),
  passportService = require("./config/passport"),
  passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  const apiRoutes = express.Router(),
    authRoutes = express.Router();

  apiRoutes.use("/auth", authRoutes);
  authRoutes.post("/register", AuthenticationController.register);
  authRoutes.post("/login", requireLogin, AuthenticationController.login);

  app.use("/api", apiRoutes);
  apiRoutes.get("/polls", ApiController.getPolls);
  apiRoutes.post("/polls", ApiController.createAPoll);
  apiRoutes.get("/polls/:id", ApiController.getAPoll);
  apiRoutes.put("/polls/:id", ApiController.updateAPoll);
  apiRoutes.delete("/polls/:id", ApiController.deleteAPoll);
};