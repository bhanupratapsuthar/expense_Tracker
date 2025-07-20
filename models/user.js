const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new Schema({
    firstName: {
        type: String,
        requried: true,
    },
    lastName: {
        type: String,
        requried: true,
    },
    email: {
        type: String,
        requried: true,
    },
    number: {
        type: String,
        requried: true,
    },
    address: {
        type: String,
        requried: true,
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
        requried: true,
    },
        beneficiaries: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Beneficiary'
            }
        ]

})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;