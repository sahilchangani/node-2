const express = require("express");
const route = express.Router();
const ctl = require('../controller/ctl');
const multer = require("../Middleware/Multer");
const passport = require("passport");

route.get("/", ctl.login);
route.post("/userlogin", passport.authenticate("local", { failureRedirect: "/" }), ctl.userlogin);
route.get("/dashboard",passport.checkAuthentication, ctl.index);
route.get("/logout", ctl.logout);
route.get("/addAdmin", passport.checkAuthentication, ctl.addAdmin);
route.get("/viewAdmin", passport.checkAuthentication, ctl.viewAdmin);
route.post("/addAdmin", multer, ctl.addAdminData);
route.get("/deleteAdmin", ctl.deleteAdmin);
route.get("/editAdmin", ctl.editAdmin);
route.post("/updateAdmin", multer, ctl.updateAdmin);
module.exports = route;