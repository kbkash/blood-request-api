var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var AppError = require('../utils/appError');

var bloodStatus = new Schema({
    status: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    },
    blood_bank: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    donor: {
        type: ObjectId,
        ref: "User", 
        required: true
    },
})

module.exports = mongoose.model("Blood_Status", bloodStatus);