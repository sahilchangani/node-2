const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
    },
    task:{
        type:String,
        required:true
    }, 
    user_id:{
        type:String,
        required:true
    }
})

const Admin = mongoose.model("user-schema",schema)

module.exports = Admin;