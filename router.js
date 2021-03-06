const AuthenticationController = require("./controllers/authentication"),
  ApiController = require("./controllers/api"),
  express = require("express"),
  path = require("path"),
  passportService = require("./config/passport"),
  passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  const apiRoutes = express.Router(),
    authRoutes = express.Router();

  apiRoutes.use("/auth", authRoutes);
  authRoutes.post("/register", AuthenticationController.register);
  authRoutes.post("/forgot-password", AuthenticationController.forgotPassword);
  authRoutes.post(
    "/reset-password/:token",
    AuthenticationController.resetPassword
  );
  authRoutes.post("/login", requireLogin, AuthenticationController.login);

  app.use("/api", apiRoutes);
  apiRoutes.get("/polls", ApiController.getPolls);
  apiRoutes.get("/userpolls/:name", requireAuth, ApiController.getUserPolls);
  apiRoutes.post("/polls", requireAuth, ApiController.createAPoll);
  apiRoutes.get("/polls/:id", ApiController.getAPoll);
  apiRoutes.put("/polls/:id", ApiController.updateAPoll);
  apiRoutes.delete("/polls/:id", requireAuth, ApiController.deleteAPoll);

  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname + "/client/build/index.html"));
  });

  // errors from controller functions are received here.
  app.use((error, req, res, next) => {
    console.log("error: ", error);
  });
};
