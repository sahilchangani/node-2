const schemaCat = require('../Model/catSchema');
const subschema = require('../Model/subschema');
const fs = require('fs');
const path = require('path');

module.exports.addSubCat = async (req, res) => {
    await schemaCat.find({}).then((data) => {
        res.render("addSubCat", { data }); // Ensure the correct view is rendered and data is passed
    });
};

module.exports.addSubCategory = async (req, res) => {
    if (req.file) {
        req.body.image = req.file.path;
    }
    await subschema.create(req.body).then(() => {
        res.redirect("/viewSubCat");
    });
};

module.exports.viewSubCat = async (req, res) => {
    const data = await subschema.find().populate('categoryId').then((data) => {
        res.render("viewSubCat", { data });
    });
};

module.exports.deleteSubCat = async (req, res) => {
    await subschema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/viewSubCat");
    });
};



