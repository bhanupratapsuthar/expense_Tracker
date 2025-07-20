const User = require('../models/user.js')

module.exports.renderSignupForm = async(req, res) => {
    res.render('forms/signup.ejs');
}

module.exports.signupForm = async(req, res) => {
        try{
            const {firstName, lastName, number, address, state, country, pin_code, email, password} = req.body.user;
            const username = email;

            const newUser = new User({firstName, lastName, number, address, state, country, pin_code, username, email})
            const registeredUser = await User.register(newUser, password);
            req.login(registeredUser, (err) => {
                    if(err) {
                        return next();
                    }
                    req.flash('success', "Registered Successfully.");
                    res.redirect('/home');
                }
            )
        } catch(e) {
            req.flash("error", e.message);
            res.redirect('/signup');
        }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('forms/login.ejs')
}

module.exports.loginForm = async(req, res) => {
        req.flash('success', "Welcome user");
        res.redirect('/home')
    }

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            next();
        }
        req.flash('success', "Logged Out Successfully.");
        res.redirect('/home');
    })
}