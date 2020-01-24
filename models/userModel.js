const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const bcrypt = require("bcryptjs");
var validator = require('validator');

const user = new Schema({
    role:{
        type: String,
        enum: ["general", "blood-bank"],
        required: [true, "Please provide a role for the user."]
    },
    password : {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select: false,
    },
    email: {
        type: String,
        required: [true, "Please provide an email."],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email.']
    },
    name: {
        type: String,
        required: [true, "Please provide a name."]
    },
    contact_no: {
        type: Number,
        required: [true, "Please provide a contact no."],
        unique: true
    },
    secondary_contact_no: Number,
    address: {
        type: String,
        required: [true, "Please provide an address."]
    },
    details_ref: {
        type: ObjectId,
        required: [true, "Please provide reference to the detail of the user."]
    }
})

user.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    return next();
})


module.exports = mongoose.model("User", user)