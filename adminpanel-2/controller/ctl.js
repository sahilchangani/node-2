const fs = require("fs");
const schema = require("../Model/adminSchema");
const path = require("path");
const mailer = require("../middleware/mailer");

module.exports.login = (req,res)=>{
    res.render("login");
};
module.exports.userlogin = async(req,res)=>{
  let admin = await schema.findOne({email:req.body.email});
  res.redirect("/dashboard");
};
module.exports.logout=async(req,res)=>{
  req.session.destroy();
res.redirect("/");
};
module.exports.index = (req, res) => {
   res.render("index");
};
module.exports.addAdmin = (req, res) => {
  res.render("addAdmin");
};

module.exports.addAdminData = async (req, res) => {
  req.body.image = req.file.path;
  await schema.create(req.body).then((data) => {
    res.redirect("/addAdmin");
    console.log(req.body);
  });
};
module.exports.viewAdmin = async (req, res) => {
  let data = await schema.find();
  res.render("viewAdmin", { data });
};
module.exports.deleteAdmin = async (req, res) => {
  let singleData = await schema.findById(req.query.id);
  fs.unlinkSync(singleData.image);
  let data = await schema.findByIdAndDelete(req.query.id).then((data) => {
    res.redirect("/addAdmin");
  });
};
module.exports.editAdmin = async (req, res) => {
  let singleData = await schema.findById(req.query.id);
  res.render("updateAdmin", { singleData });
};
module.exports.updateAdmin = async (req,res)=>{
    let img ="";
    console.log(req.body)
    let singleData = await schema.findById(req.body.id)
    console.log(singleData);
    (!req.file) ? img = singleData.image : img = req.file.path
    req.file && fs.unlinkSync(singleData.image)
    req.body.image = img ; 
    let data = await schema.findByIdAndUpdate(req.body.id , req.body)
    data && res.redirect("/viewAdmin")
}





module.exports.recoverPass = async (req, res) => {
  console.log("Recover Password Request for Email:", req.body.email); // Log the email being searched for
  let admin = await schema.findOne({ email: req.body.email });
  if (!admin) {
      console.log("Email not found in database"); // Log if email is not found
      req.flash("error", "Email not found");
      return res.redirect("/");
  }
  let otp = Math.floor(Math.random() * 100000 + 500000);
  console.log("Generated OTP:", otp);

  mailer.sendotp(req.body.email, otp);

  req.session.otp = otp;
  req.session.admin = admin;

  res.render("verifyotp"); // Ensure the view is rendered
};

module.exports.verifyPass = async (req, res) => {
  let otp = req.body.otp;
  let sessionOtp = req.session.otp;
  let admin = req.session.admin;

  if (otp == sessionOtp) {
      if (req.body.newPass == req.body.confirmPass) {
          let updatedAdmin = await schema.findByIdAndUpdate(admin._id, { password: req.body.newPass });
          updatedAdmin && res.redirect("/logout");
      } else {
          console.log("New Password and Confirm Password is Not Same");
          res.redirect("/verifyotp");
      }
  } else {
      console.log("Invalid OTP");
      res.redirect("/verifyotp");
  }
};