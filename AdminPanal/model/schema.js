const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password :{
        type : String,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hobby: {
        type: [String],
        required: true
    },
    img: {
        type: String,
        required: true
    },
});

const Admin = mongoose.model('AdminPanel', schema);

module.exports = Admin;