const Joi = require('joi');

module.exports.beneficiarySchema = Joi.object({
    beneficiary: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        contact: Joi.string().required(),
        address: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        pin_code: Joi.string().required(),
    }).required()
}) 

module.exports.userSchema = Joi.object({
    user: Joi.object({
        email: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        number: Joi.string().required(),
        address: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        pin_code: Joi.string().required(),
        password: Joi.string().required(),
    }).required()

    // Left for leter

})

module.exports.logSchema = Joi.object({
    log: Joi.object({
        description: Joi.string().required(),
        amount: Joi.number().required().min(0),
        paymentType: Joi.string().required(),
        paymentDate: Joi.date(),
    }).required()
})