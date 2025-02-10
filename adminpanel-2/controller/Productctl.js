const schemaCat = require('../Model/catSchema');
const subschema = require('../Model/subschema');
const productschema = require('../Model/productschema');
const fs = require('fs');
const path = require('path');

module.exports.addProduct = async (req,res) => {
    const record = await subschema.find({}).populate('categoryId');
    res.render("addProduct", {record});
}

module.exports.addProductCategory = async (req,res) => {
    await productschema.create(req.body).then((data) => {
        res.redirect("/viewProduct");
      });
    };


module.exports.viewProduct = async (req,res) => {
     await productschema.find({})
     .populate({
         path : 'SubcategoryId',
         populate : {
            path : 'categoryId'
        }
     })
     .then((data) => {
        res.render("viewProduct", { data });
        
      });
}


module.exports.deleteProduct = async (req,res) => {
    await productschema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/viewProduct");
    });
}

