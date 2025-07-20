if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}


const express = require('express');
const mongoose= require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require('./utils/ExpressError.js');

const session = require('express-session');
const MongoStore = require('connect-mongo');

const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const {isLoggedIn} = require('./middleware.js');

// Importing Models 
const User = require('./models/user.js');
const Beneficiary = require('./models/beneficiary.js');
const Log = require('./models/log.js');

// Import Routes for same base urls 
const homeRouter = require('./routes/beneficiary.js');
const userRouter= require('./routes/user.js');

// Import Joi Validation Schema from schema.js
const { beneficiarySchema, logSchema} = require('./schema.js');

const path = require('path');
const DB_URL = process.env.ATLASDB_URL;


const app = express();
const port = 8080;

// Engine SetUp 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true}))
app.engine('ejs', ejsMate);
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, '/public')))

const store = MongoStore.create({
    mongoUrl: DB_URL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600
})

store.on('error', (error) => {
    console.log("Errors is mongo Session Store", error)
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:  7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}


app.use(session(sessionOptions))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.success = req.flash('success'); 
    res.locals.error = req.flash('error');
    res.locals.currProfile = req.user;
    next(); 
})

// Mongoose Setup 
main()
    .then(() => console.log('Connected to MongoDB.'))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(DB_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Validate Beneficiary Via Joi
const validatebeneficiary = (req, res, next) => {
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

// Validate Transaction Via Joi 
const validateLog = (req, res, next) => {
    if(req.body) {

        let {error} = logSchema.validate(req.body);
        
        if(error) {
            let errorMsg = error.details.map((el) => el.message).join(',')
            console.log(error.details)
            throw new ExpressError(400, errorMsg);
        } else{
            next();
        }
    }   else {
        throw new ExpressError(400, 'Log Details Required!!');
    }
}

//Use Express Router
app.use('/home', homeRouter);
app.use('/', userRouter)

// Add Transaction btn
app.get('/home/:id/log/new',
    isLoggedIn,
    (req, res) => {
    const {id} = req.params;
    res.render('forms/log.ejs', {id})
})

// Add Transaction Form Page
app.post('/:id/log/new', 
    isLoggedIn,
    validateLog, 
    wrapAsync(async(req, res, next) => {
        const {id} = req.params;

        let beneficiary = await Beneficiary.findById(id);
        
        const newLog = new Log(req.body.log);
        console.log(newLog)
        
        beneficiary.logs.push(newLog);

        await newLog.save();
        await beneficiary.save();
    
        req.flash('success', "New Transaction created.")
        res.redirect(`/home`)
    })
)

app.all('{*splat}', (req, res, next) => {
    next(new ExpressError(404, 'Page not Found!'))
})

app.use((err, req, res, next) => {
    let {statusCode=500, message="Something Went Wrong!"} = err;
    res.render('error.ejs', {message});
    // res.send("Something went wrong!!!")
})


// Server Listening
app.listen(port, () => {
    console.log("server started at 8080.");
})