const mongoose = require("mongoose");
const Schema  = mongoose.Schema;
const Log = require('./log.js');


const beneficiarySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    pin_code: {
        type: String,
        required: true,
    },
    logs: [
        {
            type: Schema.Types.ObjectId,
            ref: "Log"
        }
    ],
    user: {
        type: String,
    }
})

beneficiarySchema.post('findOneAndDelete', async(beneficiary) =>  {
    if(beneficiary) {
        await Log.deleteMany({_id: {$in: beneficiary.logs}})
    }
})


const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema);

module.exports = Beneficiary;