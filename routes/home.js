// Import Express and Express.Router 
const express = require('express');
const router = express.Router();

// Import wrapAsync Function from Utils Folder 
const wrapAsync = require("../utils/wrapAsync.js");

// Import User and Beneficiary Models from models Folder 
const User = require('../models/user.js');
const Beneficiary = require('../models/beneficiary.js');

// Import isLoggedIn middlerware From middlerware File
const { isLoggedIn } = require('../middleware.js');

const beneficiaryRouter = require('./beneficiary.js')







module.exports = router;