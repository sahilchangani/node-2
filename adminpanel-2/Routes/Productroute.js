const express = require("express");
const route = express.Router();
const multer = require('../Middleware/multer');
const extractl = require('../controller/Productctl');
const passport = require("../Middleware/password");

route.get("/addProduct", passport.checkAuthentication, extractl.addProduct);
route.post("/addProduct", multer, extractl.addProductCategory);
route.get("/viewProduct", passport.checkAuthentication, extractl.viewProduct);
route.get("/deleteProduct", passport.checkAuthentication, extractl.deleteProduct);


module.exports = route;