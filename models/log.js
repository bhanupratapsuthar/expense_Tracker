const mongoose = require("mongoose");
const Schema  = mongoose.Schema

const logSchema = new Schema({
    description: {
        type: String, 
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentType: {
        type: String,
        enum:["Sent", "Received"],
        required: true,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
    beneficiary: {
        type: String
    }
})

const Log = mongoose.model('Log', logSchema);

module.exports = Log;