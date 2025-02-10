const mongoose = require("mongoose");
const schema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  SubcategoryId: {  
   type:mongoose.Schema.Types.ObjectId,
  ref:"SubCategorie",
        required: true,
  },
});

let subcatschema = mongoose.model('ExtraCategorie', schema);

module.exports = subcatschema;