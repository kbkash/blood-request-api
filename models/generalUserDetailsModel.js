var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var generalUserDetails = new Schema({
    dob : {
        type: Date,
        required: true
    },
    photo: String,
    blood_group: {
        type: String,
        enum: ["A+","A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required: true
    },
    last_donated_date:{
        type: Date,
    },
    accepted_donation: {
        type: ObjectId,
    }
})

module.exports = mongoose.model("General_User_Details", generalUserDetails);
