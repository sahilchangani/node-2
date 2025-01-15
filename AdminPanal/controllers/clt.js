const fs = require("fs");
const path = require("path");
const Admin = require("../model/schema");
const upload = require("../middleware/multer");

module.exports.loginData = (req,res)=>{
    res.render("login")
}
module.exports.userlogin = async(req,res)=>{
    let admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
      if (admin.password == req.body.password) {
        res.cookie("adminData", admin);
        res.redirect("/dashboard");
      } else {
        res.redirect("/");
      }
    } else {
      res.redirect("/");
    }
}
module.exports.Logout = (req,res)=>{
    res.clearCookie("adminData");
    res.redirect("/");
}
module.exports.dashboard = (req, res) => {
    res.render("index")
};
module.exports.addAdmin = (req, res) => {
    res.render("addAdmin")
};

module.exports.addAdminData = async (req, res) => {
    req.body.img = req.file.path;
    await Admin.create(req.body).then((data) => {
        res.redirect("/dashboard");
    });
};

module.exports.viewAdmin = async (req, res) => {
    const data = await Admin.find({})
    res.render("viewAdmin", { data })
};

module.exports.deleteAdmin = async (req, res) => {
    await Admin.findByIdAndDelete(req.query.id).then((data) => {
        res.redirect("/dashboard");
    });
}

module.exports.dataFill = async (req, res) => {
    await Admin.findById(req.query.id).then((data) => {
        res.render("updateAdmin");
    });
}

module.exports.updateAdminPage = async (req, res) => {
    const data = await Admin.findById(req.query.id);
    res.render("updateAdmin", { data });
};

module.exports.updateAdmin = async (req, res) => {
    let img = "";
    let singleData = await Admin.findById(req.body.id);
    req.file ? img = req.file.path : img = singleData.img;
    req.file && fs.unlinkSync(singleData.img);
    req.body.image = img;
    let data = await Admin.findByIdAndUpdate(req.body.id, req.body);
    data && res.redirect("/viewAdmin");
};