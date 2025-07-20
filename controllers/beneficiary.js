const User = require('../models/user.js');
const Beneficiary = require('../models/beneficiary.js')



module.exports.homepage = async(req, res) => {
        if(req.user) {
            console.log(req.user)
            let id = req.user._id;
            let user = await User.findById(id).populate('beneficiaries');
            res.render('main/index.ejs', {user})
        } else{
            req.flash('error', "User not Definied!!");
            res.redirect('/login');
        }
    }

module.exports.showRoute = async (req, res) => {
            let { beneficiaryId} = req.params;
            let show = await Beneficiary.findById(beneficiaryId).populate('logs');
            if(!show) {
                req.flash("error", "Beneficiary does not exist.");
                res.redirect('/home');
            } else{
                res.render('main/show2.ejs', {show})
            }
        }

module.exports.destroyBeneficiary = async(req,res) => {
            let {id} = req.params;
            await Beneficiary.findByIdAndDelete(id);

            req.flash('success', 'Beneficiary Deleted')
            res.redirect('/home');  
        }

module.exports.renderBeneficiaryForm = async (req, res) => {
    res.render('forms/beneficiary');
}

module.exports.beneficiaryForm = async(req, res) => {
        const id = req.user._id;

        let user = await User.findById(id);
        const newData =  new Beneficiary(req.body.beneficiary)

        user.beneficiaries.push(newData);

        await newData.save();
        await user.save();
        
        req.flash('success', "Beneficiary Added.")
        res.redirect('/home');
    }