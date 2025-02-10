const express = require("express");
const route = express.Router();
const multer = require('../Middleware/multer');
const categoryctl = require('../controller/categoryctl');
const passport = require("../Middleware/password");

route.get("/addCat", passport.checkAuthentication, categoryctl.addCat);
route.post("/addCat", multer, categoryctl.addCategory);
route.get("/viewCat", passport.checkAuthentication, categoryctl.viewCat);
route.get("/deleteCat", passport.checkAuthentication, categoryctl.deleteCat);

module.exports = route;
