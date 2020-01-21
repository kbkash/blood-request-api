const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const event = new Schema({
     location: {
          type: String,
          required: true
     },
     time_stamp: {
          type: Date,
          required: true
     },
     remarks: {
          type: String
     },
     intrested_donors: [{
          type: ObjectId,
          ref: "User"
     }],
     organizer: {
          type: ObjectId,
          ref: "User",
          required:true
     },
})

module.exports = mongoose.model("Event", event);