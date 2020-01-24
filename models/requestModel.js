const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const request = new Schema({
    patient_name: {
        type: String,
        required: [true, "Please provide the patient name."]
    },
    time_stamp: {
        type: Date,
        required: [true, "Please provide a deadline."]
    },
    hospital: {
        type: String,
        requried: [true, "Please provide the name of the hospital."]
    },
    blood_group: {
        type: String,
        uppercase: true,
        enum:["A+","A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required: [true, "Please provide a status."],
    },
    amount_of_blood: {
        type: Number,
        required: [true, "Please provide the amount of blood."]
    },
    contact_no: {
        type: Number,
        require: [true, "Please provide a contact no."],
    },
    case_of_treatment: {
        type: String,
        enum: ["Surgery", "Delivery", "Accident", "Others"],
        requried: [true, "Please provide the case of treatment."]
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