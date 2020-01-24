var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var generalUserDetails = new Schema({
    dob : {
        type: Date,
        required: [true, "Please provide your date of birth" ]
    },
    photo: String,
    blood_group: {
        type: String,
        enum: ["A+","A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required: [true , "Please provide your blood group"]
    },
    last_donated_date:{
        type: Date,
    },
})

module.exports = mongoose.model("General_User_Details", generalUserDetails);
