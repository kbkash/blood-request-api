const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const request = new Schema({
    patient_name: {
        type: String,
        required: true
    },
    time_stamp: {
        type: Date,
        required: true
    },
    hospital: {
        type: String,
        requried: true
    },
    blood_group: {
        type: String,
        uppercase: true,
        enum:["A+","A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required: true,
    },
    amount_of_blood: {
        type: Number,
        required: true
    },
    contact_no: {
        type: Number,
        require: true,
    },
    case_of_treatment: {
        type: String,
        enum: ["Surgery", "Delivery", "Accident", "Others"],
        requried: true
    },
    custom_case: {
        type: String
    },
    requester:{
        type: ObjectId,
        ref: "User"
    },
    relation_with_patient: {
        type: String,
    }, 
    acceptors:[{
        type: ObjectId,
        ref: "User"
    }]
})

module.exports = mongoose.model("Request", request);