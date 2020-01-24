const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const event = new Schema({
     location: {
          type: String,
          required: [true, "Please provide the location."]
     },
     time_stamp: {
          type: Date,
          required: [true, "Please provide date and time for the event."]
     },
     remarks: {
          type: String
     },
     intrested_donors: [{
          type: ObjectId,
          ref: "User"
     }],
     organizer_name:{
          type: String,
          required: true
     },
     organizer: {
          type: ObjectId,
          ref: "User",
          required:[true, "Please provide the organizer."]
     },
})

module.exports = mongoose.model("Event", event);