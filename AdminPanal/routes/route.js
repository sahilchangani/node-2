const express = require("express");
const route = express.Router();
const clt = require("../controllers/clt");
const multer = require("../middleware/multer");

route.get("/",clt.loginData);
route.post("/userlogin",clt.userlogin);
route.get("/logout",clt.Logout);
route.get("/dashboard",clt.dashboard)
route.get("/addAdmin",clt.addAdmin)
route.get("/viewAdmin",clt.viewAdmin)
route.post("/addAdmin",multer,clt.addAdminData)
route.get("/deleteAdmin",clt.deleteAdmin)
route.get("/dataFill",clt.dataFill)
route.get("/updateAdminPage",clt.updateAdminPage)
route.post("/updateAdmin",multer,clt.updateAdmin)

module.exports = route;