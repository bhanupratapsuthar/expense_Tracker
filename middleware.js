const {userSchema, beneficiarySchema} = require('./schema.js')
const {ExpressError} = require('./utils/ExpressError.js')




module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash("error", "You must be logged in to add beneficiary!");
        return res.redirect('/home');
    }
    next();
}

// ValidateUser Middleware
module.exports.validateUser = (req, res, next) => {
    if(req.body){
        let {error} = userSchema.validate(req.body);
        if(error) {
            let errorMsg = error.details.map((el) => el.message).join(',')
            console.log(error.details)
            throw new ExpressError(400, errorMsg);
        } else{
            next();
        }
    } else {
        throw new ExpressError(400, 'User Details are required!');
    }
}

// Validate Beneficiary Via Joi
module.exports.validatebeneficiary = (req, res, next) => {
    if(req.body) {
        let { error } = beneficiarySchema.validate(req.body);
        
        if(error) {
            let errorMsg = error.details.map((el) => el.message).join(',')
            console.log(error.details)
            throw new ExpressError(400, errorMsg);
        }   else {
            next();
        }
    }   else {
        throw new ExpressError(400, 'Beneficiary Details Required!!')
    }
}