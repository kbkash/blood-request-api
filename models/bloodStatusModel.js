var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var AppError = require('../utils/appError');

var bloodStatus = new Schema({
    status: {
        type: String,
        require: [true, "Please provide a status."],
        enum: ["stored", "donated", "discarted"]
    },
    remark: {
        type: String,
    },
    event:{
        type: ObjectId,
        ref: "Event",
        required: [true, "Please provide an event"]
    },
    blood_bank: {
        type: ObjectId,
        ref: "User",
        required: [true, "Please provide a status."]
    },
    donor_contact_no:{
        type: Number,
        required:[true, "Please provide a donor contact number."]
    },
})

module.exports = mongoose.model("Blood_Status", bloodStatus);
