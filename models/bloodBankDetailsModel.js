const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const bloodBankDetails = new Schema({
    registered: {
        type: Boolean,
        required: true,
    },
})

module.exports = mongoose.model('Blood_Bank_Details', bloodBankDetails);