const schemaCat = require('../Model/catSchema');
const upload = require('../Middleware/multer');
const fs = require("fs");

module.exports.addCat = (req, res) => {
    res.render("addCat");
}

module.exports.addCategory = async (req, res) => {
    if (req.file) {
        req.body.image = req.file.path;
    }
    await schemaCat.create(req.body).then(() => {
        res.redirect("/addCat");
    });
};

module.exports.viewCat = async (req, res) => {
    const data = await schemaCat.find(); // copilot //
    res.render("viewCat", { data });
};

module.exports.deleteCat = async (req, res) => {
    await schemaCat.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/viewCat");
    });
};

