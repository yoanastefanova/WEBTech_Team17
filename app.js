const express= require('express');
const expressLayouts = require('express-ejs-layouts'); //to work with ejs views
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// const app = require("./files");
const app = express();
// Static Files
app.use(express.static('public'));
app.use('styles', express.static(__dirname + 'public/styles'));
app.use('images', express.static(__dirname + 'public/images'));
app.use('scripts', express.static(__dirname + 'public/scripts'));


// Passport config
require('./config/passport')(passport);

// DB config
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true}) //put newUrl to avoid complains
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts); //always above the app.set
app.set('view engine', 'ejs');

// Express Body Parser middleware
app.use(express.urlencoded({ extended: true}));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
    //cookie: {secure: true}
}));

// Passport middleware (after Express Session middleware) initializing the strategy
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Variables - custom middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));