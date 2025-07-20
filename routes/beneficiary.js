// Import Express and Express.Router 
const express = require('express');
const router = express.Router();

const {isLoggedIn, validatebeneficiary} = require('../middleware.js');
const wrapAsync = require('../utils/wrapAsync.js')

const User = require('../models/user.js')
const Beneficiary = require('../models/beneficiary.js');
const { homepage, showRoute, destroyBeneficiary, renderBeneficiaryForm, beneficiaryForm } = require('../controllers/beneficiary.js');


// Home Page
router.get('/',
    wrapAsync(homepage)
)

// Show Route Page (consumer detail page)
router.get(
    '/:beneficiaryId', 
    wrapAsync(
        showRoute
    )
)


// Delete Beneficiary Id 
router.delete(
    '/:beneficiaryId/delete', 
    wrapAsync(
        destroyBeneficiary
    )
)

// Add Beneficiary btn
router.route('/beneficiary/new')
    .get( 
        isLoggedIn,
        wrapAsync(renderBeneficiaryForm)
    )
    .post(
        isLoggedIn,
        validatebeneficiary,
        wrapAsync(
            beneficiaryForm
        ))

module.exports = router;