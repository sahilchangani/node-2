const express = require("express");
const route = express.Router();
const multer = require('../Middleware/multer');
const passport = require("../Middleware/password")
const subctl = require('../controller/subcatclt'); // Ensure this path is correct

route.get("/addSubcat", passport.checkAuthentication, subctl.addSubCat);
route.post("/addSubCat", multer, subctl.addSubCategory);
route.get("/viewSubCat", passport.checkAuthentication, subctl.viewSubCat);
route.get("/deleteSubCat", passport.checkAuthentication, subctl.deleteSubCat);

module.exports = route;
